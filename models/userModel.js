import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
// import JWT from "JsonWebTokenError"
import JWT from "jsonwebtoken";

//schema 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is Required'] // this validation will take place when saving data to the database
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Email is Required'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'enter a password'],
        minLength:[6 , 'password length should be greater than 6 character'],
        select:true
    },
    location:{
        type:String,
        default:"India"
    }
},{timestamps:true}
);

//hashing through bcrypt
userSchema.pre('save',async function(){
    if(!this.isModified) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
//compare password
userSchema.methods.comparePassword= async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

//json webtoken
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

export default mongoose.model('user',userSchema);