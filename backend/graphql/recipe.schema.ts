import { ObjectType, ID, Field} from "type-graphql";

/* Recipe Schema */

@ObjectType()
export class Recipe {
    @Field(() => ID)
    recipeId!: string
}