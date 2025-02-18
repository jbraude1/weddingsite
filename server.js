require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { password } = req.body;
    
    if (password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});

// Get content
app.get('/api/content', async (req, res) => {
    try {
        const content = await fs.readFile('content.json', 'utf8');
        res.json(JSON.parse(content));
    } catch (error) {
        res.status(500).json({ message: 'Error reading content' });
    }
});

// Update content (protected)
app.post('/api/content', authenticateToken, async (req, res) => {
    try {
        const newContent = req.body;
        await fs.writeFile('content.json', JSON.stringify(newContent, null, 4));
        res.json({ message: 'Content updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating content' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 