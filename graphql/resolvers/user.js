const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const User = require('../../models/user')
const {jwtSceret} = require('../../config/default')
const {validateRegistrationInput , validateLoginInput} = require('../../util/validation')




module.exports =  {
    Query : {
        async getUser() {
            try {
            const users = await User.find()
            return users
            } catch (error) {
                throw new Error(error)
            }
        }
    },

    Mutation : {
        async register(_,{ registerInput : { username , password , confirmPassword , email }},context,info){
            // TODO validate user data 
             const {valid , errors } = validateRegistrationInput(username,email,password,confirmPassword)
             if(!valid){
                 return new UserInputError('Error',{
                     errors
                 })
             }

            // TODO Make sure user doesnt already exist 
            const user = await User.findOne({email:email})
            if(user){
                throw new UserInputError('This email is already taken',{
                    errors : {
                        emailError : ' This email is already registered with us'
                    }
                })
            }
            // TODO hash password and create auth token
            password = await bcryptjs.hash(password,10)
            const newUser = User({
                email ,
                password,
                username  ,
            })
            const res = await newUser.save()
            const token = jwt.sign({
                id : res.id ,
                email : res.email ,
                username : res.username
            },jwtSceret,{expiresIn :'1h'})
            return {
             ...res._doc,
             id : res._id,
             token
            }
            // TODO save user to database
        },

        async login(_,{ email , password },context,info){
            // TODO validate user data 
             const {valid , errors } = validateLoginInput(email,password)
             if(!valid){
                 return new UserInputError('Error',{
                     errors
                 })
             }

            // TODO Make sure user doesnt exit or not 
            const user = await User.findOne({email:email})
            if(!user){
                throw new UserInputError('User doesnt exist',{
                    errors : {
                        email : ' User doesnot exist with this email'
                    }
                })
            }

            // TODO hash password and create auth token
            ismatch = await bcryptjs.compare(password,user.password)

            if(!ismatch){
                throw new UserInputError('Incorrect password', {
                    errors : {
                        password : 'You Password is incorrect'
                    }
                })
            }

            const token = jwt.sign({
                id : user.id ,
                email : user.email ,
                username : user.username
            },jwtSceret,{expiresIn :'1h'})

            return {
             email :  user.email ,
             username : user.username,   
             createdAt : user.createdAt,
             id  : user.id,
             token
            }
            // TODO save user to database
        }
    }
}