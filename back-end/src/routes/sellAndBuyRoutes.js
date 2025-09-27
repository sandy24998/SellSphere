const express = require('express');
const SellBuy = require('../models/SellBuy');
const router = express.Router();

//GET Request
router.get('/sellProduct', async (req, res) => {
    try {
        console.log('Request received at /api/sellProduct');
        console.log('req.query:', req.query);

        const query = {};
        const sort = {};

        if (req.query.productName) {
            query.productName = req.query.productName;
            console.log('Query:', query);
        }

        if (req.query.sortBy) {
            console.log('SortBy:', req.query.sortBy);
            switch (req.query.sortBy) {
                case "lowerCostPrice":
                    sort.costPrice = 1;
                    break;
                case "higherCostPrice":
                    sort.costPrice = -1;
                    break;
                case "lowerSoldPrice":
                    sort.soldPrice = 1;
                    break;
                case "higherSoldPrice":
                    sort.soldPrice = -1; 
                    break;
                default:
                    return res.status(400).json({ error: "Invalid sorting option" });
            }
            console.log('Sort:', sort);
        }
        console.log('MongoDB Query:', query); 
        const products = await SellBuy.find(query).sort(sort);
        console.log('Products:', products);

        res.status(200).json({ message: "Data fetched successfully", products });
    } catch (error) {
        console.error('Error in /sellProduct:', error);
        res.status(500).json({ error: "Internal Server Error", details: error.message }); 
    }
});

//POST Request
router.post('/sellProduct', async (req, res)=> {
    try{
        const {productName, costPrice, soldPrice} = req.body;
        if(!productName || productName.length <4 ){
            return res.status(400).json({ error: "Product name should have a minimum of four characters" });
        }
        if(!costPrice || costPrice <=0 ){
            return res.status(400).json({ error: "Cost price value cannot be zero or negative value" });
        }

        if(!soldPrice || soldPrice <=0 ){
            return res.status(400).json({ error: "Sold price value cannot be zero or negative value" });
        }

        const newProduct = new SellBuy({productName, costPrice, soldPrice});
        await newProduct.save();
        res.status(201).json({message:"Product Added succesfully"})
    }
    catch(error){
        res.status(400).json({ message: "Error adding product", error: error.message });
    }
})

//PATCH Request
router.patch("/sellProduct/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { soldPrice } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "Invalid ID" });
      }
  
      if (soldPrice <= 0) {
        return res.status(400).json({ message: "Sold price value cannot be zero or negative value" });
      }
  
      const updatedProduct = await SellBuy.findByIdAndUpdate(id, { soldPrice }, { new: true });
  
      if (!updatedProduct) {
        return res.status(400).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error updating product", error: error.message });
    }
  });

//DELETE Request
router.delete("/sellProduct/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const deletedProduct = await SellBuy.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(400).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting product", error: error.message });
    }
  });


module.exports = router;
