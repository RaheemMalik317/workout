const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const {LogModel} = require('../models')

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!')
});

router.get('/about', (req, res) => {
    res.send("This is it!");
});

/* 
======================
    Workout Logs
======================
*/
router.post('/create', validateJWT, async (req, res) => {
    const {description, definition, result} = req.body.log
})

module.exports = router;