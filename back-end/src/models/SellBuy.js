const mongoose = require("mongoose");

const sellBuySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: [4, "Product name should have a minimum of four characters"],
  },
  costPrice: {
    type: Number,
    required: true,
    min: [1, "Cost price value cannot be zero or negative"],
  },
  soldPrice: {
    type: Number,
    min: [1, "Sold price value cannot be zero or negative"],
    default: null,
  },
});

const SellBuy = mongoose.model("SellBuy", sellBuySchema);
module.exports = SellBuy;
