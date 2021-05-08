
const Post = require('../../models/post')
const user = require('../../models/user')
const checkAuth = require('../../util/check-auth')



module.exports = {
    Query : {
        async getPosts() {
            try {
            const posts = await Post.find().sort({createdAt : "desc"})
            return posts
            } catch (error) {
                throw new Error(error)
            }
        },
        async getPost(_,{postId}) {
            try {
            const post = await Post.findById(postId)
            if(post){
                return post
            }else {
                throw new Error( 'Post not Found')
            }
            } catch (error) {
                throw new Error("Post Not Found")
            }
        },
        async getUserPosts(_,{email},context,info) {
            try {
            const user = await checkAuth(context)
            if(user.email===email){
                const post = await Post.find({email}).sort({createdAt : "desc"})
                if(post){
                    return post
                } 
            }else {
                    throw new Error( 'Post not Found')
                }
            } catch (error) {
                throw new Error("Post Not Found")
            }
        }
    },
    Mutation : {
        async createPost(_,{ body },context,info){
         const user = await checkAuth(context)
         const newPost = new Post({
             body ,
             user : user.id,
             username : user.username ,
             email : user.email ,
             createdAt : new Date().toISOString()
         })

         const post = await newPost.save()
         return post 
      } ,

      async deletePost(_,{ postId },context,info){
        const user = await checkAuth(context)
        try{
            const post = await Post.findById(postId)
            if(user.id==post.user){
             await post.delete()
             return "Post Deleted Succesfully with id " + postId
            }else{
                throw new Error("Action not Allowed")
            }

            
        }catch(err){

            throw new Error(err)
        }
     },
     
     async likePost(_,{ postId },context,info){
        const user = await checkAuth(context)

        try{
            const post = await Post.findById(postId)
            if(post) {
            if(post.likes.length===0){
                  const like = {
                  username : user.username,
                  email : user.email ,
                  createdAt : new Date().toISOString()
              }
              post.likes.unshift(like) 
              await post.save() 
              return post
            }

            const singlelikeIndex = (post.likes.findIndex(likes => likes.email === user.email))   
            const singlelike = post.likes[singlelikeIndex]

            if(singlelike){
                post.likes.splice(singlelikeIndex,1)
                await post.save()
                return post
            }else {
                const like = {
                    username : user.username,
                    email : user.email ,
                  createdAt : new Date().toISOString()

                }
                post.likes.unshift(like) 
                await post.save() 
                return post
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