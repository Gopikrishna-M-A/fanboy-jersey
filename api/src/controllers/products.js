import Product from '../models/products.js'
import Inventory from '../models/inventory.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('team');
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}   




export const getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}   




export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    await newProduct.save();

    // const newInventoryItem = new Inventory({
    //   product: newProduct._id, // Reference to the newly created product
    //   stockQuantity: 0, // You can set the initial stock quantity as needed
    //   reservedQuantity: 0, // Initially, no reservations
    // });

    // await newInventoryItem.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Bad request' });
  }
}   




export const updateProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      console.log("reqbody",req.body.data);
      console.log("productId",productId);
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body.data, {
        new: true,
      });
      console.log("updatedProduct",updatedProduct);
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product by ID:', error);
      res.status(400).json({ error: 'Bad request' });
    }
}   




export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}   


export const bulkAdd = async (req, res) => {
  try {
    const productsData = req.body; // Assuming req.body is an array of product objects

    // Use the create method to insert multiple products into the database
    const insertedProducts = await Product.create(productsData);

    res.status(201).json({ success: true, data: insertedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}



export const testRoute = async (req, res) => {
  try {
    // Find all products
    const products = await Product.find();

    // Update stockQuantity and reorderPoint for each product
    const updatedProducts = await Promise.all(products.map(async (product) => {
      // Update stockQuantity to 30 and reorderPoint to 10
      product.stockQuantity = 30;
      product.reorderPoint = 10;
      
      // Save the updated product
      await product.save();
      
      return product;
    }));

    res.json(updatedProducts);
  } catch (error) {
    console.error('Error updating products:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}




