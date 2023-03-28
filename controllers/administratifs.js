import Administratifs from "../models/administratifs.js";
//create admini

export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    await Administratifs.findById(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const update = (req, res) => {
  router.put("/:id", async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    Administratifs.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Administratif with id=${id}. Maybe Administratif was not found!`,
          });
        } else res.send({ message: "Administratif was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Administratif with id=" + id,
        });
      });
  });
};
export const updateAdmin = async (req, res) => {
  try {
    const id = req.query.id;
    const _id = id;

    const admin = req.body;

    const updateAdmin = await Administratifs.findByIdAndUpdate(
      _id,
      { ...admin, _id },
      { new: true }
    );
    res.json(updateAdmin);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const deleteAdmin = (req, res) => {
  const id = req.params.id;

  Administratifs.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Administratif with id=${id}. Maybe Administratif was not found!`,
        });
      } else {
        res.send({
          message: "Administratif was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Administratif with id=" + id,
      });
    });
};
