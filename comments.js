// Create web server

// Import Express
const express = require('express');
const router = express.Router();

// Import MongoDB
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

// Import database
const db = require('../db');

// CREATE
router.post('/', async (req, res) => {
    const { comment } = req.body;

    // Insert to database
    const newComment = await db.get().collection('comments').insertOne({
        comment,
        createdAt: new Date()
    });

    res.json({
        message: 'Comment created',
        comment: newComment.ops[0]
    });
});

// READ
router.get('/', async (req, res) => {
    // Get all comments from database
    const comments = await db.get().collection('comments').find({}).toArray();

    res.json({
        message: 'Success',
        comments
    });
});

// UPDATE
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    // Update comment
    await db.get().collection('comments').updateOne({
        _id: ObjectId(id)
    }, {
        $set: {
            comment
        }
    });

    res.json({
        message: 'Comment updated'
    });
});

// DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Delete comment
    await db.get().collection('comments').deleteOne({
        _id: ObjectId(id)
    });

    res.json({
        message: 'Comment deleted'
    });
});

module.exports = router;