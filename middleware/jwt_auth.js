const jwt_token = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt_token.verify(token, process.env.DB_TOKEN);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
  // try {
  //   const token = req.headers.authorization.split("Bearer ")[1];
  //   const decoded = jwt_token.verify(token, process.env.DB_TOKEN);
  //   req.auth = decoded;
  //   return next();
  // } catch (error) {
  //   return res.status(401).json({ message: "Auth failed" });
  // }
};
