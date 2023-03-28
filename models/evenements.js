import mongoose from 'mongoose' ;

const EvenementSchema = mongoose.Schema(
  {
    idAlumni: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Alumni' 
    },
    idDirecteur: {
         type: mongoose.Schema.ObjectId, 
         ref: 'Directeur' 
    },
    status: {
        type: Boolean,
        required: true,
    },
    vacation: {
        type: Boolean,
        required: true,
    },
  
    expert: {
        type: Boolean,
        required: true,
    },
    date_premier_embauche: {
        type: String,
        required: true,
    },
   

})

const  Evenement= mongoose.model('Evenement', EvenementSchema);
export default Evenement;