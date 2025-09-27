import express from 'express';
const router = express.Router();
import { 
  getProducts, 
  createProduct, 
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public route to get all products & private admin route to create one
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

// Public route to get a single product by ID
// And private admin routes to update and delete a product
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;