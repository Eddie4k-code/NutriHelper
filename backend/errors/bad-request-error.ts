import { CustomError } from "./custom-error";


//Error for when a request goes bad.

export class BadRequestError extends CustomError {
   
    readonly statusCode = 400;


    public message: string;

    constructor(message: string) {
        super(message);
        this.message = message;
    }


    serializeError(): { message: string; } {
        return {message: this.message}
    }

}

