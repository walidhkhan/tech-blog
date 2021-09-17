const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
        .then(userdata => res.json(userdata))
        .catch(err => res.status(500).json(err));
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
        .then(userdata => {
            if (!userdata) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userdata)
        })
        .catch(err => res.status(500).json(err));
});

// POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(userdata => res.json(userdata))
        .catch(err => res.status(500).json(err));
});

// login route for authentication
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(userdata => {
        if (!userdata) {
            res.status(400).json({ message: 'No user with that email address!'});
            return;
        }
        // Verify user
        const validPassword = userdata.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }

        res.json({ user: userdata, message: 'You are now logged in!'});
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(userdata => {
            if (!userdata[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userdata);
        })
        .catch(err => res.status(500).json(err));
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userdata => {
            if (!userdata[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userdata);
        })
        .catch(err => res.status(500).json(err));
})

module.exports = router;