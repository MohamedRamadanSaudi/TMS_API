const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String },
    amount: { type: Number, required: true, default: 0 },
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

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
