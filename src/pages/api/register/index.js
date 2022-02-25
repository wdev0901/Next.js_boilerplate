const bcrypt = require('bcryptjs');
import User from "models/User";
import { dbConnect } from "utils/mongoose";

dbConnect();

export default async (req, res) => {
    const { name, email, password } = req.body;
    const body = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    const user = await User.findOne({email});

    if(!user) {
        const newUser = new User(body);
        const savedUser = await newUser.save();
    } else {
        return res.status(401).json({msg: "Invalid email or password"});
    }
};