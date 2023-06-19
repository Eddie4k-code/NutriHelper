

const { Field, ObjectType, ID } = require("type-graphql");




/* User Schema */
@ObjectType()

    /* User Schema */
export class User {

    @Field(() => ID)
    id!: string

    @Field()
    email!: string

    @Field()
    password!: string

    @Field(() => [ID])
    recipes!: string[]
}