const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Register a new admin user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = new User({ name, email, role: 'user' });
    user.setPassword(password); // hashes and sets salt/hash
    await user.save();

    const token = user.generateJwt(); // create JWT after save
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(400).json({ message: "Registration failed", error: err });
  }
};

// Login an existing admin user
const login = async (req, res) => {
  console.log('Login request body:', req.body); // Debug line

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      const token = user.generateJwt();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};
``
