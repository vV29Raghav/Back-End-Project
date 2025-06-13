const express = require('express');
const router = express.Router();
const Expense = require('../models/expenseModel');

// Get all expenses
router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find().lean(); // Fetch all expenses
        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0); // Sum all amounts
        res.render('expenses', { expenses, totalAmount }); // Pass total amount to Handlebars
        // res.send(expenses);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving expenses' });
    }
});

// // Get a single expense
router.get('/expenses/details/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id).lean();
        if (expense) {
            res.render('expenseDetail', { expense });
        } else {
            res.status(404).send({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving expense details' });
    }
});

// router.get('/expenses/name/:name', async (req, res) => {
//     try {
//         const expenseName = req.params.name;
//         const expenses = await Expense.find({ name: expenseName }).lean(); // Search by name

//         if (expenses.length > 0) {
//             res.json(expenses); // Return matching expenses
//         } else {
//             res.status(404).send({ message: 'No expense found with this name' });
//         }
//     } catch (error) {
//         res.status(500).send({ message: 'Error retrieving expense details' });
//     }
// });

// Add an expense
router.post('/add_expense', async (req, res) => {
    try {
        const { name, amount, date, category, description } = req.body;
        
        const newExpense = new Expense({
            name,
            amount,
            date,
            category,
            description
        });

        await newExpense.save(); // Saves data in MongoDB
        // res.send(newExpense);
        res.redirect('/expenses'); // Redirect to expenses page after adding
    } catch (error) {
        res.status(500).send({ message: 'Error adding expense' });
    }
});

// Update an expense
router.post('/update_expense/:id', async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedExpense) {
            res.redirect('/expenses');
        } else {
            res.status(404).send({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating expense' });
    }
});

// Delete an expense
router.post('/delete_expense/:id', async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (deletedExpense) {
            res.redirect('/expenses');
        } else {
            res.status(404).send({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error deleting expense' });
    }
});

module.exports = router;