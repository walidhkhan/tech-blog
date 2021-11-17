const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote, Comment } = require('../../models');
// const withAuth = require('../../utils/auth')


// get all users
router.get('/', (req, res) => {
    console.log('======================');
    // console.log(req);
    Post.findAll({
        // Query configuration
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postdata => res.json(postdata))
        .catch(err => res.status(500).json(err));
});

router.get('/id:', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postdata => {
            if (!postdata) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postdata);
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    console.log('test');
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(postdata => res.json(postdata))
        .catch(err => res.status(500).json(err));
});

// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
    // custom static method created in models/Post.js
    Post.upvote({...req.body, user_id: req.session.user_id}, { Vote, Comment, User })
        .then(updatedpostdata => res.json(updatedpostdata))
        .catch(err => res.json(err));
});

router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postdata => {
            if (!postdata) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postdata);
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postdata => {
            if (!postdata) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postdata);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;