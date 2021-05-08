const {UserInputError, AuthenticationError} = require('apollo-server')
const checkAuth = require('../../util/check-auth')
const Post = require('../../models/post')


module.exports = {
    Mutation : {
         //  CREATE COMMENT 
     async createComment(_,{ postId , body },context,info){
        const user = await checkAuth(context)
        if(body.trim()===''){
            throw new UserInputError("Empty Comment now Allowed",{
                errors : {
                    body : "Comment body must be filled"
                }
            })
        }
        try{
            const post = await Post.findById(postId)
            if(post){
              const comment = {
                  body ,
                  username : user.username,
                  email : user.email ,
                  createdAt : new Date().toISOString()

              }
              post.comments.unshift(comment) 
              await post.save() 
              return post
            }
            else {
                throw new Error("Post Doesnt Exist")
            }

            
        }catch(err){
            throw new Error(err)
        }
     },
    
     // DELETE COMMENT
     async deleteComment(_,{ postId , commentId },context,info){
        const user = await checkAuth(context)

        try{
            const post = await Post.findById(postId)

            if(post){
             const CommentIndex = (post.comments.findIndex(c => c.id === commentId))   
             const singlecomment = post.comments[CommentIndex]

             if(!singlecomment){
                 throw new Error("Comment not exist")
             }
             
             if(singlecomment.email === user.email){
                 post.comments.splice(CommentIndex,1)
                 await post.save()
                 return post 
             }else{
                 return new AuthenticationError("Action not allowed")
             }
            }
            else {
                throw new Error("Post Doesnt Exist")
            }

        }catch(err){
            throw new Error(err)
        }
     }
    }
}