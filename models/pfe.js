import mongoose from 'mongoose';
const pfeSchema = mongoose.Schema({
    Description: { type: String, required: false },
    societe: { type: String, required: false },
    sujet: { type: String, required: false },

    type: {
        type: String,
        required: false,
    },
    duree: {
        type: Number,
        required: false,
    },

    date_debut: {
        type: Date,
        required: false,
    },

    id_enseignant: { type: mongoose.Schema.ObjectId, ref: 'Enseignant' },

    id_etudiant: [{ type: mongoose.Schema.ObjectId, ref: 'Etudiant' }],




})
const pfe = mongoose.model('listepfe', pfeSchema);
export default pfe;