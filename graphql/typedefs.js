const {gql } = require('apollo-server')

module.exports = gql`
type User {
    username : String! ,
    email : String! ,
    createdAt : String!
    token : String!,
    id : ID!,
}

type Post {
     body : String! ,
     createdAt : String! ,
     email  : String! ,
     username : String!,
     id : ID! ,
     comments : [comment]!,
     likes : [likes]!
}

type comment {
    id : ID!,
    body : String! , 
    username : String! , 
    email : String! ,
    createdAt : String!,
}

type likes {
    id : ID!,
    username : String! , 
    email : String! ,
    createdAt : String!,
}




type Query {
    getUser : [User] ,
    getPosts : [Post] ,
    getPost(postId : ID!) : Post
    getUserPosts(email : String!) : [Post]
}

input RegisterInput {
username : String!,
password : String!,
confirmPassword : String!,
email : String!,

}

type Mutation{
    register(registerInput : RegisterInput) :  User! 
    login(email : String! ,password:String!) : User!
    createPost(body :  String!) : Post!
    deletePost(postId : ID!) : String!
    createComment(postId : ID! , body : String!) : Post!
    deleteComment(postId : ID! , commentId : ID!) : Post! 
    likePost(postId : ID!) : Post!
}
`

