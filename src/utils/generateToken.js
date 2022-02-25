const Jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return Jwt.sign({id}, "TheHeartCoder@2022", {
        expiresIn: '7d',
    });
};

export default generateToken;