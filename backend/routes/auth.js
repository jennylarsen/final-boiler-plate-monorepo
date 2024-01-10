
// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // JSON Web Token for user authentication
const User = require('../models/user.js'); // Importing the User model
const Challenge = require('../models/challenge.js');
const router = express.Router(); // Creating an instance of an Express router
import { verify } from 'jsonwebtoken';
import challenges from './data/challenges.json';



const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Authentication token is missing');
  }

  verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send('Authentication token has expired');
      }
      return res.status(403).send('Invalid authentication token');
    }
    req.userId = decoded.userId;
    next();
  });
};




// Endpoint for user registration
router.post('/register', async (req, res) => {
  try {
    // Checking if the required fields are provided in the request body
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send('Username, email, and password are required');
    }

    // Checking if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existingUser) {
      return res.status(400).send('Username or email is already taken');
    }

    // Hashing the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Saving the user to the database
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// Endpoint for user sign-in
router.post('/signin', async (req, res) => {
  try {
    // Finding the user in the database based on the provided username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Comparing the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid username or password');
    }

    // Creating a JSON Web Token (JWT) for user authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Set the token as an HttpOnly cookie
    res.cookie('token', token, { httpOnly: true, secure: true });

    // Respond with the token in the JSON body (optional, depending on your frontend needs)
    res.status(200).json({ token, favorites: user.favorites });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// Endpoint to complete a challenge
router.post('/complete-challenge', authenticateToken, async (req, res) => {
  try {
    // Check if the challengeId is provided in the request body
    if (!req.body.challengeId) {
      return res.status(400).send('Challenge ID is required');
    }

    // Convert challengeId to a number
    const challengeId = parseInt(req.body.challengeId);

    // Use findOneAndUpdate to atomically add challengeId to completedChallenges array
    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      { $addToSet: { completedChallenges: challengeId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('Challenge completed successfully');
  } catch (error) {
    console.error(error); 
    res.status(500).send(`Failed to complete the challenge: ${error.message}`);
  }
});





// const seedChallenges = async () => {
//   try {
//     // Remove existing challenges in the database
//     await Challenge.deleteMany();

//     // Insert new challenges from the JSON file
//     await Challenge.insertMany(challengesData);

//     console.log('Data seeded successfully');
//   } catch (error) {
//     console.error('Error seeding data:', error);
//   } finally {
//     // Close the connection to the database
//     mongoose.connection.close();
//   }
// };

// seedChallenges();

// router.get('/challenges', authenticateToken, (req, res) => {
//   try {
//     res.json(challenges);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Failed to fetch challenges');
//   }
// });

// router.put('/update/:id', async (req, res) => {
//   try {
//     const token = req.header("Authorization");
    
//     // Find the user based on the access token
//     const user = await UserModel.findOne({ token: token });
    
//     // Find the challenges associated with the user and respond with them (if needed)
//     const userChallenges = await Challenge.find({ user: user }).sort("challengeId");
//     res.json(userChallenges);

//     // Update the specific challenge to mark it as completed
//     const { id } = req.params;
//     const updatedChallenge = await Challenge.findByIdAndUpdate(id, { completed: true }, { new: true });
    
//     // Respond with the updated challenge
//     res.json(updatedChallenge);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update challenge' });
//   }
// });







module.exports = router; // Exporting the router for use in other parts of the application
