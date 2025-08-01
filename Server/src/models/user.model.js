import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({

    username:{
      type:String,
      required : true,
      unique : true,
      lowercase : true,
      trim : true,
      index:true
    },
    email:{
      type:String,
      required : true,
      unique : true,
      lowercase : true,
      trim : true,
    },
    fullName:{
      type:String,
      required : true,
      trim : true,
      index : true
    },
    password:{
      type: String,
      required: [true, 'Password is required']
    },
    // avatar: {
    //   type: String, // cloudinary url
    // },
   clickedMovies: [{ type: String }], // store TMDB movie IDs
   searchHistory: [{ type: String }],
   
    refreshToken: {
      type: String
    }

},{timestamps:true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPassWordCorrect = async function (password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)