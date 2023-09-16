import jwt from "jsonwebtoken";


export const auth = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authentication denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    req.user = decoded;
    req.role = decoded.role;
   

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export const restrict = (userRole) => async (req, res, next) => {
  const user = req.user;
  console.log(user.role)

  if (userRole !== user.role) {
    return res
      .status(401)
      .json("Your Role is not allowed to make this resquest");
  }

  next();
};
