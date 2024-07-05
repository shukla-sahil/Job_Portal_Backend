import userModel from "../models/userModel.js"

export const registerController = async (req,res, next)=>{

        const {name,email,password} = req.body
        //validate. here the validation is happening while taking the input
        // this acheives validation before even attemoting to save data in the database .
        //reduces unnecessary dabase calls  
        if(!name){
           next('name is required')
        }
        if(!email){
            next('email is required')
        }
        if(!password){
            next('password is required and greater than 6 character')
        }
        const exisitingUser = await userModel.findOne({email})
        if (exisitingUser){
            next('eEmail Already Register Please Login')
        }
        const user = await userModel.create({name,email,password})
        //token
        const token = user.createJWT()
        res.status(201).send({
            success:true,
            message:"User Created Successfully",
            user:{
                name:user.name,
                lastName:user.lastName,   
                email:user.email,
                location:user.location
            },
            token

        })
}

export const loginController = async (req,res,next) =>{
    const{email ,password} =req.body

    if(!email|| !password){
         next('please provide all Fields')
    }
    //find user by email
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return next("Invalid Username or Password")
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
         return next("Invalid Username or Password")
    }
    user.password = undefined;
    const token = user.createJWT()
    res.status(200).json({
        success:true,
        message:"Login Successfully",
        user,
        token
    })
}