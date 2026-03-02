const express = require('express');
const router = express.Router();

let cart = [];

// Add product to cart
router.post('/add', (req, res) => {
    const { productId, quantity } = req.body;
    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    res.status(200).json({ message: 'Product added to cart', cart });
});

// Remove item from cart
router.delete('/remove/:productId', (req, res) => {
    const { productId } = req.params;
    cart = cart.filter(item => item.productId !== productId);
    res.status(200).json({ message: 'Item removed from cart', cart });
});

// Update item quantity
router.put('/update/:productId', (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity = quantity;
        res.status(200).json({ message: 'Quantity updated', cart });
    } else {
        res.status(404).json({ message: 'Product not found in cart' });
    }
});

// View cart contents
router.get('/view', (req, res) => {
    res.status(200).json({ cart });
});

// Clear entire cart
router.delete('/clear', (req, res) => {
    cart = [];
    res.status(200).json({ message: 'Cart cleared' });
});

// Calculate total price
router.get('/total', (req, res) => {
    const totalPrice = cart.reduce((total, item) => {
        // Assuming getProductPrice is a function that retrieves the product price
        const productPrice = getProductPrice(item.productId); // This function needs to be defined
        return total + (productPrice * item.quantity);
    }, 0);

    res.status(200).json({ totalPrice });
});

module.exports = router;