const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    amount: { type: Number, required: true },
    status: { type: String, required: true }, // 'paid', 'unpaid', 'returned'
  },
  { timestamps: true },
);

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
