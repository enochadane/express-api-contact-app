const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./user.model');

exports.user_signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User created'
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    });    
}

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then( user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    _id: user._id,
                    email: user[0].email,
                    password: user[0].password
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => console.log(err));
}

exports.user_delete = (req, res, next) => {
    User.remove({
        _id: req.params.userId
    }).exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.me = (req, res) => {
    res.status(200).json({
        data: req.user
    });
}

exports.updateMe = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true
        })
        .lean()
        .exec();

        res.status(200).json({
            data: user
        });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

