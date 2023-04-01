import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    //all
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: [ "enseignant", "alumni", "etudiant", "administratif"],
    }
,
    
    firstname: {
        type: String,
        required: true
      },

    lastname: {
        type: String,
        required: true,
    },
  //alumni
    idEtudiant: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Etudiant' ,
        required: false,
    },
       
    email: {
        type: String,
        required: true,
      },
   pays: {
      type: String,
      required: false,
      },
    societe: {
        type: String,
        required: false,
      },
    promotion: {
        type: Date,
        required: false,
      },

    date_diplome: {
        type: Date,
        required: false,
    },
    date_embauche: {
        type: Date,
        required: false,
    },


    //etudiant
    Birth_date: {
        type: Date,
        required: false,
      },
      Cv: {
        type: String,
        required: false,
      },
    
      depot: {
        type: String,
        required: false,
      },
    
      niveau:{
        type: String,
        required: false,
        enum: [ "licence", "master", "cycle ingénieur", ],
    },
      
      classe:{
        type: String,
        required: false,
      },
      etat:{
        type: String,
        required: false,
        enum: [ "alumni", "actuel"],
      },
      status:{
        type: String,
        required: true,
        enum: [ "enseignant", "responsable formation"],
      }
})

const  Users= mongoose.model('users', UserSchema);
export default Users; 