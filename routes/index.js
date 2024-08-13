// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import model from './models/Task.js';

const Task = model;

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect('mongodb://127.0.0.1:27017/todoapp')
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/tasks', async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log incoming task data
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask); // Respond with the created task
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ message: 'Failed to add task' });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));