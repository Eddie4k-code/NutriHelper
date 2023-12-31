import 'reflect-metadata';
import { graphqlHTTP } from "express-graphql";
import { buildSchema, MiddlewareFn } from 'type-graphql';
import { UserResolver } from "./graphql/resolvers/user.resolver";
import { User } from "./graphql/user.schema";
import cookieSession = require('cookie-session');
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import cookieParser = require('cookie-parser');
import { RecipeResolver } from './graphql/resolvers/recipe.resolver';
const express = require("express");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");


//Represents the context object passed to the resolvers 
interface ApiContext {
    req: Request
    res: Response
    currentUser: {id: string, email: string}
}



//Builds Schema, connects to express app, and db.

async function main() {

    //Build Schemas from GraphQL
    const schema = await buildSchema({
        resolvers: [UserResolver, RecipeResolver],
        globalMiddlewares: []
    });

    const app = express();
    const router = express.Router();

   

    //Express App
    app.listen(4000, () => {
        console.log('Connected on port 4000, backend');
    });

    //Connect to Mongoose Database
    mongoose
        .connect(process.env.MONGO_URI!)
        .then(() => console.log('DB CONNECTED'))
        .catch((error) => console.error('DB CONNECTION ERROR:', error));

    //Middleware

    app.use(cookieParser());
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true, // Allow credentials (cookies)
      }));

    // GraphQL
    app.use('/graphql', graphqlHTTP((req, res) => ({
        schema,
        graphiql: true,
        credentials: true,
        context: {req, res}
    })));


    


}

main();




