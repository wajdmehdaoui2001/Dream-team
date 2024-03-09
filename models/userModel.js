const mongoose = require("mongoose");
const userSchema=mongoose.Schema({
    name : {
        type: String,
        required: [true,"veuillez saisir votre nom"]
    },
    email: {
        type: String,
        required: [true, "Veuillez saisir votre adresse mail"],
        unique: [true, "adresse mail existe déjà"]
    },
    password: {
        type: String,
        required: [true, "Veuillez saisir votre mot de passe"]
    },
   
   

    },
    {
        timestamps:true,
    }


);
module.exports=mongoose.model("User", userSchema);