const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

router.post("/register", async (req, res) =>{
    let { email, password } = req.body.user;
    try {
 const User =  await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
        });
        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    res.status(201).json({ 
        msg: "User successfully registered",
        user: User,
        sessionToken: token
    });
} catch (err) {
    if(err instanceof UniqueConstraintError) {
        res.status(409).json({
            msg: "Email already in use",
        });
    }else {
    res.status(500).json({
        msg: "Failed to register user",
    });
    }
}
})
router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;

    try {
      let loginUser =  await UserModel.findOne({
        where: {
            email: email,
        },
    });
    if (loginUser) {
        let passwordComparison = await bcrypt.compare(password, loginUser.password);
        if (passwordComparison) {
        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60* 24});
    res.status(200).json({
        user: loginUser,
        msg: "User successfully logged in!",
        sessionToken: token
    });
} else {
    res.status(401).json({
        msg: 'Incorrect email or password'
    });
  }

    } else {
        res.status(401).json({
            msg: "Incorrect email or password"
        })
    }
} catch (err) {
    res.status(500).json({
        msg: "Failed to log user in"
    })
}
})




module.exports = router;