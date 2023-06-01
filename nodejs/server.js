const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL database configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12M@rch1999',
    database: 'todo_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});
// Get all tasks
app.get('/getalltasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a single task
app.get('/getbyidtasks/:id', (req, res) => {
    const taskId = req.params.id;
    connection.query('SELECT * FROM tasks WHERE id = ?', taskId, (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).json({ message: `Task Do not exist ${taskId} ` });
        }
        res.json(results[0]);

    });
});

// Create a task
app.post('/createtasks', (req, res) => {
    const task = req.body;
    task.created_at = new Date();
    task.updated_at = new Date();
    task.completed = false;
    connection.query('INSERT INTO tasks SET ?', task, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

// Update a task
app.put('/updatetasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = req.body;
    task.updated_at = new Date();
    task.completed = true;

    connection.query('SELECT * FROM tasks WHERE id = ?', taskId, (err, results) => {
        if (err) throw err;
        // Check if task exists
        if (results.length === 0) {
            return res.status(404).json({ message: `Task Do not exist ${taskId}` });
        }
        // Update the task
        connection.query('UPDATE tasks SET ? WHERE id = ?', [task, taskId], (err) => {
            if (err) throw err;
            res.json({ message: 'Task updated successfully' });
        });
    });
});

// Delete a task
app.delete('/deletetasks/:id', (req, res) => {
    const taskId = req.params.id;
    connection.query('SELECT * FROM tasks WHERE id = ?', taskId, (err, results) => {
        if (err) throw err;
        // Check if task exists
        if (results.length === 0) {
            return res.status(404).json({ message: `Task Do not exist ${taskId}` });
        }
        // Delete the task
        connection.query('DELETE FROM tasks WHERE id = ?', taskId, (err) => {
            if (err) throw err;
            res.json({ message: 'Task deleted successfully' });
        });
    });
});
// POST /api/register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Check if the username is already taken
    connection.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(409).json({ message:`Username : ${username} already taken` });
        }
        // Insert the new user into the database
        connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
            if (err) throw err;
            res.json({ message: `User : ${username} registered successfully` });
        });
    });
});
// POST /api/login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password is correct
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ message: `User : ${username} logged in successfully` });
    });
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});