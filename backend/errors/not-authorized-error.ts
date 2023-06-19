import { CustomError } from "./custom-error";


//Error for when a request is not authorized.

export class NotAuthorizedError extends CustomError {

    constructor() {
        super('User is not Authorized')
    }


    readonly statusCode = 401;




    serializeError(): { message: string; } {
        return {message: "User is not Authorized"}
    }

}