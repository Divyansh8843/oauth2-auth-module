import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    email: string;
    name: string;
    picture: string;
    roles: string[];
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    roles: { type: [String], default: ['user'] },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
