const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { sign } = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  // Database call
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const error = createHttpError(
        400,
        "User already exists with this email."
      );

      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, "Error while getting user"));
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser;

  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating user."));
  }

  try {
    // Generate JWT
    const token = sign(
      { sub: newUser._id },
      jwtSecret,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    res.status(201).json({
      accessToken: token,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while signing jwt token"));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }
  console.log("Login Email:", email);
  const user = await userModel.findOne({ email });
  console.log("User Found:", user);

  if (!user) {
    return next(createHttpError(404, "User not found."));
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return next(
      createHttpError(
        400,
        "Username or password incorrect!"
      )
    );
  }

  const token = sign(
    { sub: user._id },
    jwtSecret,
    {
      expiresIn: "7d",
      algorithm: "HS256",
    }
  );

  res.json({
    accessToken: token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = {
  createUser,
  loginUser,
};