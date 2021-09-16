const router = require('express').Router();
const { Post, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        // Query configuration
        attributes: ['id', 'post_url', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
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
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
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
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(postdata => res.json(postdata))
    .catch(err => res.status(500).json(err));
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