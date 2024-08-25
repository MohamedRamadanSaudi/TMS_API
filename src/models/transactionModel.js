const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    type: { type: String, required: true }, // 'credit' or 'debit'
    amount: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
