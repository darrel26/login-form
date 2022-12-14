const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

// for testing purpose
router.get('/', async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    password: passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json({
    message: 'User created successfully!',
    result: savedUser,
  });
});

module.exports = router;
