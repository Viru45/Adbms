import express from 'express';
const router = express.Router();
import { addOrderItems, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Note: Both routes are protected
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

export default router;