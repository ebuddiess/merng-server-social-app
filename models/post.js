const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    body :  String , 
    username : String ,
    email : String ,
    createdAt : String,
    comments : [
        {
            body : String , 
            username : String , 
            email : String ,
            createdAt : String
        }
    ] ,
    likes : [
        {
            username : String , 
            email : String ,
            createdAt : String
        }
    ] ,
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'users' 
    }
})

module.exports = mongoose.model('post',PostSchema)