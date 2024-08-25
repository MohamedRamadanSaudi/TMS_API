const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String },
    salary: { type: Number, required: true, default: 0 },
    transactionHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
    bills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
      },
    ],
  },
  { timestamps: true },
);

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
