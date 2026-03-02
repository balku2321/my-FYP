const jwt = require('jsonwebtoken');

// Middleware for role-based access control
const authMiddleware = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];  // Allow roles to be passed as a string or array

  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Token required.' });
    }

    try {
      // Decode the JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Role-based validation
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden. Access denied.' });
      }

      req.user = decoded; // Attach user data (including role) to request object
      next();
    } catch (err) {
      console.error('Error in authMiddleware:', err.message);
      res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
};

module.exports = authMiddleware;

