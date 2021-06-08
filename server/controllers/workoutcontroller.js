//const Express = require('express');
const router = require('express').Router();
const middleware = require("../middleware");
const {LogModel} = require('../models')

router.get('/all', async (req,res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    }catch (err) {
        res.status(500).json({error: err})
    }
})
router.post('/', middleware.validateSession, async (req, res) => {
    const {description,definition,result} = req.body;
    const {id} =req.user
    const logEntry = {
        definition,
        description,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create( logEntry)

        res.status(200).json({msg: `Workout complete!`, newLog})
    } catch (err) {
        res.status(500).json({msg: `Failed workoutsheet: ${err}`});
    }
   // LogModel.create(logEntry)
});
router.put('/:id', middleware.validateSession, async(req, res) => {
    const {description, definition, result} = req.body
    try{
        const logUpdated = await LogModel.update(
            {description,definition,result},
            {where: {id: req.params.id}}
        )
        res.staus(200).json({
            msg: `Workout complete!`,
            logUpdated
        })
    } catch (err) {
        res.status(500).json({
            msg: `Failed to update workout log: ${err}`
        })
    }
    
})
router.delete('/:id', middleware.validateSession, async (req, res) => {
    try {
        const locatedOne = await LogModel.destroy({
            where: {id: req.params.id}
        })
        .then(result => {
            res.status(200).json({
                msg: `Log destroyed!`,
                deletedLog: result
            })
        })
    } catch (err) {
        res.status(500).json({
            msg: `Unable to delete: ${err}`
        })
    }
})

module.exports = router;