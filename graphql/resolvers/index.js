const postresolvers = require('./post')
const userresolvers = require('./user')
const commentresolvers = require('./comment')


module.exports = {
    Query : {
        ...postresolvers.Query ,
         ...userresolvers.Query,
    } ,
    Mutation : {
        ...userresolvers.Mutation,
        ...postresolvers.Mutation,
        ...commentresolvers.Mutation
    }
}


