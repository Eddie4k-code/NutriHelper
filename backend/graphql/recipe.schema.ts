import { ObjectType, ID, Field, UseMiddleware} from "type-graphql";

/* Recipe Schema */

@ObjectType()
export class Recipe {
    @Field(() => ID)
    recipeId!: string
}