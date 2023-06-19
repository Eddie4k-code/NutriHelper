import mongoose, { Schema, Document, Types } from 'mongoose';

//Defines the structure of a user document.
export interface UserDocument extends Document {
    id: string;
    email: string;
    password: string;
    recipes: string[];
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    recipes: [{ type: String, default: []}]
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;