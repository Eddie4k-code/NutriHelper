//Blue Print for all Custom Errors


export abstract class CustomError extends Error {
    abstract statusCode: number;


    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }


    abstract serializeError(): { message: string };


}