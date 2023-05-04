import Users from "../models/users.js";

import { generatejwt } from "../middlewares/generatejwt.js";
import { refreshtoken } from "../middlewares/refreshtoken.js";
import bcrypt from "bcrypt";



//checked
/*
export const Login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    //--------------------------------------------------------------------------
    // Verify user by mail
    console.log("phone :", phone);
    console.log("password :", password);
    let user = await Users.findOne({ phone });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        Message: "Please verify your username and password",
        Success: false,
      });
    }
    //--------------------------------------------------------------------------
    // Verify user password
    const passMatch = await bcrypt.compare(password, user?.password);
    if (!passMatch) {
      console.log("diff password");
      return res.status(400).json({
        Message: "Please verify your username and password",
        Success: false,
      });
    }
    console.log("same password");
    sendTokenResponse(token, 200, res)
   // const refreshToken = refreshtoken({ _id: user._id }, "3000h");
    // await new refreshTokenModel({ refreshToken: refreshToken }).save();

    
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
*/
// checked


export const Login = async (req, res, next) => {
  const { phone, password } = req.body

  // Validate emil & password
  if (!phone || !password) {
    res.status(400).json({
      success: false,
      errors: { other: "Please provide an phone and password" },
    })
  }

  // Check for user
  const user = await Users.findOne({ phone }).select("+password")

  if (!user) {
    res.status(400).json({
      success: false,
      errors: { other: "Invalid credentials" },
    })
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    res.status(400).json({
      success: false,
      errors: { other: "Invalid credentials" },
    })
  }

  sendTokenResponse(user, 200, res)
}

export const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + 346000
    ),
    httpOnly: true,
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  })
}


export const GetUserByToken = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      Message: `Welcome ${user.firstname} ${user.lastname}.`,
      data: user,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};


//checked
export const create = async (req, res) => {
  try {
    const { phone, email, firstName, lastName } = req.body;
    const existUser = await Users.findOne({
      $or: [ { phone }],
    });
    if (existUser)
      return res.status(409).json({
        Message: "user already exists with that phoneNumber or email",
        Success: false,
      });

    const salt = 10;
    const cryptedMdp = await bcrypt.hash(phone.toString(), salt);

    const newUser = new Users({
      ...req.body,
      password: cryptedMdp,
      userName: phone,
    });
    const createdUser = await newUser.save();

    return res.status(200).json({
      Message: "user created suucessfully",
      Success: true,
      data: createdUser,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};


export const getUserbyId = async (req, res) => {
  const user = await Users.findById(req.user.id)

  res.status(200).json({
    success: true,
    model: user,
  })
}

export const findAllEnseignant = async (req, res) => {
  //checked
  try {
    await Users.find({role: "enseignant"}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

  

