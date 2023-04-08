import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import cvRoute from "./routes/cv.js"
import Enseignantroutes from "./routes/enseignant.js";
import Formationroutes from "./routes/formation.js";
import EtudiantRoute from "./routes/etudiant.js";
import Pferoutes from "./routes/pfe.js";
import Pfaroutes from "./routes/pfa.js";
import demandesRoute from "./routes/demandes.js";
//import administratifsRoute from "./routes/administratif.js";
import EvenementParticipationRoute from "./routes/evenement_participation.js";
import EvenementRoute from "./routes/evenements.js";
import adminRoute from "./routes/administratifsRoute.js";
import OffreRoute from "./routes/offre.routes.js";
import directeursRoute from "./routes/directeurs.js";
import alumnisRoute from "./routes/alumni.js";
import stageEteRoute from "./routes/stage.routes.js";
import usersRoute from "./routes/users.js";
import passwordResetRoute from "./routes/passwordReset.routes.js";

var app = express();

app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));
app.use(cors());

app.use("/enseignant", Enseignantroutes);
app.use("/formation", Formationroutes);
app.use("/pfe", Pferoutes);
app.use("/pfa", Pfaroutes);
//app.use("/administratifs", administratifsRoute);
app.use("/directeurs", directeursRoute);
app.use("/etudiants", EtudiantRoute);
app.use("/alumnis", alumnisRoute);
app.use("/demandes", demandesRoute);
app.use("/administratif", adminRoute);
app.use("/evenementParticipation", EvenementParticipationRoute);
app.use("/evenements", EvenementRoute);
app.use("/offre", OffreRoute);
app.use("/stage", stageEteRoute);
app.use("/users", usersRoute);
app.use("/cv", cvRoute);
app.use("/reset", passwordResetRoute);

const CONNECTION_URL =
  "mongodb+srv://2ingweb:2ingweb@cluster0.l4xvlhw.mongodb.net";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server runnig on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("strictQuery", false);
