const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {  // Check if user is logged in
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }
    next();  // Allow access if user is authenticated
  };
  
  module.exports = { isAuthenticated };
  