import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Middleware to verify token and protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (excluding the password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).send('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401).send('Not authorized, no token');
  }
};

// Middleware to check for admin users
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed
  } else {
    res.status(401).send('Not authorized as an admin');
  }
};

export { protect, admin }; // Export both functions