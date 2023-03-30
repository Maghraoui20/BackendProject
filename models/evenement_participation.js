import mongoose from 'mongoose' ;

const Evenement_participationSchema = mongoose.Schema(
  {
    idAlumni: {
         type: mongoose.Schema.ObjectId, 
         ref: 'Alumni' 
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    confirmation: {
        type: Boolean,
        required: true,
        default: false,
    },
    isInvitation: {
        type: Boolean,
        required: true,
        default: false,
    },
    location: {
        type: String,
        required: true,
        default: "ISAMM",
    },

   

})

const  Evenement_participation= mongoose.model('Evenement_participation', Evenement_participationSchema);
export default Evenement_participation;