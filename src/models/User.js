import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            trim: true,
        } ,
        password: {
            type: String,
            required: [true, "password is required"],
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default models.User || model("User", UserSchema);