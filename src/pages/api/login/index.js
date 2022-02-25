const bcrypt = require('bcryptjs');
import User from "models/User";
import { dbConnect } from "utils/mongoose";
import generateToken from "../../../utils/generateToken";

dbConnect();

export default async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
    } else {
        return res.status(401).json({
            email: "Invalid email or password",
            password: "Invalid email or password"
        });
    }
};