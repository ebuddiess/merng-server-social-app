const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')

const {jwtSceret} = require('../config/default')


module.exports = async (context) => {
   const authHeader =  context.req.headers.authorization
   console.log(context.req.headers)
   if(authHeader){
    const token = authHeader.split('Bearer')[1].trim()
    if(token){
        try {
        const user = await jwt.verify(token,jwtSceret)
        return user
        } catch (error) {
            throw new AuthenticationError("Expired Token Access Denied");
        }
    }
    
    throw new AuthenticationError("Token must be Bearer[token]");

   }

   throw new AuthenticationError("Authentication Header must be provided");

}
