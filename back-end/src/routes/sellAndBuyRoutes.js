const express = require('express');
const SellBuy = require('../models/SellBuy');
const router = express.Router();

// GET /api/sellProduct
router.get('/sellProduct', async (req, res) => {
    try {
        console.log('Request received at /api/sellProduct', req.query);

        const query = {};
        const sort = {};

        if (req.query.productName) query.productName = req.query.productName;
        if (req.query.sortBy) {
            switch (req.query.sortBy) {
                case "lowerCostPrice": sort.costPrice = 1; break;
                case "higherCostPrice": sort.costPrice = -1; break;
                case "lowerSoldPrice": sort.soldPrice = 1; break;
                case "higherSoldPrice": sort.soldPrice = -1; break;
                default: return res.status(400).json({ error: "Invalid sorting option" });
            }
        }

        const products = await SellBuy.find(query).sort(sort);
        res.status(200).json({ message: "Data fetched successfully", products });
    } catch (error) {
        console.error('Error in GET /sellProduct:', error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// POST /api/sellProduct
router.post('/sellProduct', async (req, res) => {
    try {
        const { productName, costPrice, soldPrice } = req.body;

        if (!productName || productName.length < 4)
            return res.status(400).json({ error: "Product name must be at least 4 characters" });
        if (!costPrice || costPrice <= 0)
            return res.status(400).json({ error: "Cost price must be greater than 0" });
        if (!soldPrice || soldPrice <= 0)
            return res.status(400).json({ error: "Sold price must be greater than 0" });

        const newProduct = new SellBuy({ productName, costPrice, soldPrice });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error('Error in POST /sellProduct:', error);
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
});

// PATCH /api/sellProduct/:id
router.patch('/sellProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { soldPrice } = req.body;

        if (!id) return res.status(400).json({ message: "Invalid ID" });
        if (!soldPrice || soldPrice <= 0)
            return res.status(400).json({ message: "Sold price must be greater than 0" });

        const updatedProduct = await SellBuy.findByIdAndUpdate(id, { soldPrice }, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Updated successfully", product: updatedProduct });
    } catch (error) {
        console.error('Error in PATCH /sellProduct/:id:', error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

// DELETE /api/sellProduct/:id
router.delete('/sellProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Invalid ID" });

        const deletedProduct = await SellBuy.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error('Error in DELETE /sellProduct/:id:', error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});

module.exports = router;
