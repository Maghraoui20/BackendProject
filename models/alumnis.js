import mongoose from 'mongoose' ;

const AlumnisSchema = mongoose.Schema(
 {
    idEtudiant: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Etudiant' },
    email: {
        type: String,
      },
   pays: {
      type: String,
      required: true,
      },
    societe: {
        type: String,
        required: true,
      },
    promotion: {
        type: Date,
        required: true
      },

    date_diplome: {
        type: Date,
        required: true,
    },
    date_embauche: {
        type: Date,
        required: true,
    }

})

const  Alumins= mongoose.model('Alumni', AlumnisSchema);
export default Alumins;