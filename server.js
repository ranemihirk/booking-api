const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express()
const port = 5000

const generateRandomPassword = ('./helpers/generateRandomPassword')

const User = require('./models/userModel')
const Booking = require('./models/bookingModel')
const Property = require('./models/propertyModel')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// User

app.get('/login', async (req, res) => {
    try {
        console.log('login req: ', req.body);
        const { email, password } = req.body;
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "user doesn't exist" });
        }
        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.post('/register', async (req, res) => {
    try {
        console.log('register req: ', req.body);
        const { email, password } = req.body;
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // Create a new user
        user = new User(req.body);
        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // Save user to database
        await user.save();
        res.json({ msg: 'User registered successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.get('/create-user', async (req, res) => {
    try {
        console.log('create-user req: ', req.body);
        const { email } = req.body;
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // Generate a random password
        const password = generateRandomPassword(10); // Change the password length as needed
        // Create a new user
        user = new User(req.body);
        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // Save user to database
        await user.save();
        res.json({ msg: 'User registered successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.get('/update-user', async (req, res) => {
    try {
        console.log('create-user req: ', req.body);
        const { id } = req.params;
        const user = await User.findById(id, req.body);
        // we cannot find any user in database
        if (!user) {
            return res.status(404).json({ message: `cannot find any user with ID ${id}` })
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.get('/update-password', async (req, res) => {
    try {
        console.log('update-password req: ', req.body);
        const { email, newPassword } = req.params;
        const user = await User.updateOne({ email: email }, { $set: { password: newPassword } });

        res.status(200).json({ message: 'password updated successfully.' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// Property

app.get('/properties', async (req, res) => {
    try {
        console.log('properties req: ', req.body);
        const properties = await Property.find({});
        res.status(200).json(properties);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.get('/property/:id', async (req, res) => {
    try {
        console.log('property req: ', req.body);
        const { id } = req.params;
        const property = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any property in database
        if (!property) {
            return res.status(404).json({ message: `cannot find any property with ID ${id}` })
        }
        const updatedProperty = await Property.findById(id);
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.post('/add-property', async (req, res) => {
    try {
        console.log('add-property req: ', req.body);
        const property = await Property.create(req.body)
        res.status(200).json(property);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.post('/update-property', async (req, res) => {
    try {
        console.log('update-property req: ', req.body);
        const { id } = req.params;
        const property = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any property in database
        if (!property) {
            return res.status(404).json({ message: `cannot find any property with ID ${id}` })
        }
        const updatedProperty = await Property.findById(id);
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:1234567890@bookingapi.rexw8le.mongodb.net/node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected!')
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }).catch((error) => {
        console.log(error);
    })