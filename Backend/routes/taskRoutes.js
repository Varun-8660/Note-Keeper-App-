const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post("/tasks",async(req,res) => {
    const task = new Task({title:req.body.title});
    const savedTask = await task.save();
    res.json(savedTask);
});
router.get("/tasks",async(req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
});
router.put("/tasks/:id",async(req,res) => {
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {title:req.body.title,
         completed:req.body.completed},
        {returnDocument:"after"}
    );
    res.json(updatedTask);
});
router.delete("/tasks/:id",async(req,res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({message:"Task deleted"});
});
module.exports = router;