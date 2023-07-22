import { Recipe } from "../recipe.schema";
const { Resolver, Query, Arg, InputType, Field, UseMiddleware, Ctx, Mutation } = require("type-graphql");
import UserModel from "../../model/User";
import { BadRequestError } from '../../errors/bad-request-error';
import { verifyJwt } from "../middleware/verifyToken";
import { User } from "../user.schema";
import { UserResolver } from "./user.resolver";


//Represents the context object passed to the resolvers 
interface ApiContext {
    req: Request
    res: Response
    currentUser: { id: string, email: string }
}


@Resolver(Recipe)
export class RecipeResolver {

   

    /*
   *
   *
   * Save a recipe to a users collection of recipes.
   *
   */
    @Mutation(() => Recipe)
    @UseMiddleware(verifyJwt)
    async addRecipe(@Arg('userId') id: string, @Arg('recipeId') recipeId: number) {

        //Find the user to add the recipe too.
        const user = await UserModel.findById(id);

        if (!user) {
            throw new BadRequestError("User Does not Exist!");
        }

        //Find the index of the recipe
        const recipeIndex = user.recipes.indexOf(recipeId);


        //If it exists then we dont need to add it again :)
        if (recipeIndex !== -1) {
            throw new BadRequestError('User already has that recipe in favorites.');
        }


        user.recipes.push(recipeId);
        await user.save();

        return {
            recipeId
        }

    }


    /*
    *
    *
    * Delete a recipe from a users collection of recipes
    *
    */
    @Mutation(() => Recipe)
    @UseMiddleware(verifyJwt)
    async deleteRecipe(@Arg('userId') userId: string, @Arg('recipeId') recipeId: number, @Ctx() ctx: ApiContext) {
        //Find the user to delete the recipe from.
        const user = await UserModel.findById(userId);
        

        //Check if user exists
        if (!user) {
            throw new BadRequestError('User Does not Exist!');
        }

        //Check if user is the actual user.
        if (userId != ctx.currentUser.id) {
            throw new BadRequestError('You Cannot Do That!');

        }


        //Find the index of the recipe
        const recipeIndex = user.recipes.indexOf(recipeId);
        
        if (recipeIndex === -1) {
            throw new BadRequestError('Recipe not found in users collection!');
        } 

        //Delete the recipe from the collection
        user.recipes = user.recipes.filter((recipe) => recipe != recipeId);

        await user.save();

        return {
            recipeId
        }
        

    }


    @Query(() => Boolean)
    async isRecipeInFavorites(@Arg('userId') userId: string, @Arg('recipeId') recipeId: string) {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new BadRequestError('User Does not Exist');
        }


        return user.recipes.includes(parseInt(recipeId));

    }

}