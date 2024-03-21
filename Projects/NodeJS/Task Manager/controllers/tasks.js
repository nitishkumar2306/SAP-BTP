const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const data = await Task.find({})
        res.status(200).json({ data })
    } catch (error) {

    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No tasks with the id: ${taskID}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, 
            runValidators: true
        })
        if (task === null) {
            return res.status(404).json({ msg: `No tasks with the id: ${taskID}` })
        }
        res.status(200).json({ msg: task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: delete_ID } = req.params
        const task = await Task.findOneAndDelete({ _id: delete_ID })
        if (task === null) {
            return res.status(404).json({ msg: `No tasks with the id: ${delete_ID}` })
        }
        res.status(200).json({ msg: `Task with the Id: ${delete_ID} is deleted successfully` })

    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}