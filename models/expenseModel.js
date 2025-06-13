const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    description: { type: String }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;