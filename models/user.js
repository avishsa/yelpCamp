const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema ({
     email :{ 
         type: String,
         required: true,
         unique: true
        }
});
UserSchema.plugin(passportLocalMongoose); //add to our scheme: username, password
module.exports = mongoose.model('User',UserSchema);