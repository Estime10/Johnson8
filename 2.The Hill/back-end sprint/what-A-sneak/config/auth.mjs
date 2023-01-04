const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "PLEASE LOG IN FIRST");
    res.redirect("/login");
  };
  
export default authenticate
  