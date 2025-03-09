const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/expense_tracker', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const expenseSchema = new mongoose.Schema({
    id: Number,
    name: String,
    amount: Number,
    date: String,
    category: String,
    description: String
});

const Expense = mongoose.model('Expense', expenseSchema);
let expenses = [];
//routes

//get all expenses
app.get('/expenses', (req, res) => {
    res.sendFile(__dirname + '/expense.html');
})

//get a single expense 
app.get('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const expense = expenses.find(expense => expense.id === id);
    if (expense) {
        res.json(expense);
    } else {
        res.status(404).send({ message: 'Expense not found' });
    }
})

//add an expense
app.post('/add_expense', (req, res) => {
    let { id, name, amount, date, category, description } = req.body;
    let newuser = {
        id,
        name,
        amount,
        date,
        category,
        description
    }
    expenses.push(newuser);
    res.json(expenses);
});

//update an expense
app.post('/update_expense/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let { name, amount, date, category, description } = req.body;
    let expense = expenses.find(expense => expense.id === id);
    if (expense) {
        expense.name = name;
        expense.amount = amount;
        expense.date = date;
        expense.category = category;
        expense.description = description;
        res.json(expense);
    } else {
        res.status(404).send({ message: 'Expense not found' });
    }
});

//delete an expense
app.post('/delete_expense/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = expenses.length;
    expenses = expenses.filter(expense => expense.id !== id);

    if (expenses.length < initialLength) {
        res.send({ message: 'Expense deleted successfully', expenses });
    } else {
        res.status(404).send({ message: 'Expense not found' });
    }
});

// Start the server
app.listen(2568, () => {
    console.log(`Server running on port 2568`);
});
