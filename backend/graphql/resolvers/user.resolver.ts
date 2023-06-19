import 'reflect-metadata';
import { Ctx, ID, Mutation, UseMiddleware, MiddlewareFn } from "type-graphql";
import UserModel, {UserDocument} from "../../model/User";
import { User } from "../user.schema";
const { Resolver, Query, Arg, InputType, Field} = require("type-graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import { Request, Response, NextFunction } from 'express';
import { Recipe } from "../recipe.schema";
import { verifyJwt } from "../middleware/verifyToken";



// Resolvers for User Schema


//Represents the context object passed to the resolvers 
interface ApiContext {
    req: Request
    res: Response
    currentUser: { id: string, email: string }
}


//The structure of the payload for creating a user
@InputType()
class CreateUserInput {
    @Field()
    email!: string;
    password!: string;
}


@Resolver(User)
export class UserResolver {

    /*
   *
   *
   * Get all Users
   *
   */
    @Query(() => [User], {nullable: true})
    async users() {
        const Users = UserModel.find();

        return Users;
    }

    /*
    *
    *
    * Get a user by ID.
    *
    */
    @Query(() => User, { nullable: true })
    @UseMiddleware(verifyJwt)
    async user(@Arg('id') id: string, @Ctx() ctx: ApiContext) {
        const user = await UserModel.findById(id);

        return user;
    }


    /* 
     * 
     * 
     * Create a new User
     * 
     */
    
    @Mutation(() => User)
    async createUser(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() ctx: ApiContext
    ) {

        //Get Request and Response from context.
        const { req, res } = ctx;

        // Generate Salt
        const salt: Promise<string> = await bcrypt.genSalt(10);

        // Hash the password
        const hashedPassword: Promise<string> = await bcrypt.hash(password, salt);

        // Save new user to db
        const newUser = await UserModel.create({ email, password: hashedPassword });
        newUser.save();

        // Generate JSON WebToken
        const userJwt = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {expiresIn: '1d'});

        //Assign JWT to Cookie
        res.cookie('jwt', userJwt, { secure: true });
        

        return newUser;
    }


    /*
   *
   *
   * Save a recipe to a users collection of recipes.
   *
   */
    @Mutation(() => User)
    async addRecipe(@Arg('userId') id: string, @Arg('recipeId') recipeId: string) {

        const user = await UserModel.findById(id);

        if (user) {
            user.recipes.push(recipeId);
            await user.save();
        }

       

        return user;

     
    }
   
}
