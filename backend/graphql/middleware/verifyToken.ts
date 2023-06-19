import { NextFunction, Request, Response } from 'express';
import { buildSchema, MiddlewareFn } from 'type-graphql';
const jwt = require("jsonwebtoken");


//Represents the context object passed to the resolvers 
interface ApiContext {
    req: Request
    res: Response
    currentUser: { id: string, email: string }
}

//Middleware for verifying Users JWT.
export const verifyJwt: MiddlewareFn<ApiContext> = async ({ context }, next: NextFunction) => {

    //Pull token from cookies.
    const token = context.req.cookies.jwt;

  
    //Verify token exists
    if (!token) {
        throw new Error('JWT Token is Missing');
    }


    try {


        //Verify the Token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        //Set the current user to the data from the decoded JWT.
        context.currentUser = { id: decoded.id, email: decoded.email }

        console.log(context.currentUser);

    } catch (err: any) {
        throw new Error('Invalid JWT');
    }









    await next();

};
