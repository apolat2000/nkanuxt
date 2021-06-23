const mongoose = require('mongoose');
const User = mongoose.model('Users');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


exports.login = async (req, res) => {
    User.findOne({ email: req.body.email },
        (err, user) => {
            if (err) res.send(err.message);
            else if (user) {
                hashedPasswordInput = bcrypt.hashSync(req.body.password, user.salt);
                const userDTO = {
                    userID: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    img_path: user.img_path
                };
                if (hashedPasswordInput === user.password) {
                    res.json({
                        message: "User logged in!",
                        jwt_token: jwt.sign(userDTO, process.env.TOKEN_SECRET, { expiresIn: '1800s' }),
                        userID: userDTO.userID,
                        img_path: userDTO.img_path,
                        first_name: userDTO.first_name
                    });
                } else {
                    res.status(401).send({ message: "Invalid Login" });
                }
            }
            else {
                res.status(401).send({ message: "No such user exists" });
            }
        }
    );
}

exports.verifyRefreshToken = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(401).send({ status: 'Logged Out' });
        }
        else {
            const userDTO = {
                userID: user.userID,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            };
            res.status(200).send({ status: 'Logged In', jwt_token: jwt.sign(userDTO, process.env.TOKEN_SECRET, { expiresIn: '1800s' }), userID: userDTO.userID })
        }
    });
}

exports.verifyTokenSalt = (req, res) => {
    if (req.user.email && req.user.salt) {
        User.findOne({ email: req.user.email }, (err, user) => {
            if (err || user == null) {
                res.status(401).send({ status: 'Account not found' });
                return;
            }
            else if (user.salt != req.user.salt) {
                res.status(401).send({ status: 'Invalid token' });
                return;
            }
            else {
                res.status(200).send({ status: 'Token salt valid' })
                return;
            }
        })
    }
    else {
        res.status(401).send({ status: 'Token has no salt or email' });
        return;
    }
}

exports.updatePassowrd = (req, res) => {
    let hashedPassword = '';
    let userSalt = '';
    userSalt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(req.body.password, userSalt);
    let email = req.user.email
    User.findOne({ email }, (err, user) => {
        if (err || user == null) {
            res.status(401).send({ status: 'Account not found' });
            return;
        }
        if (user.salt != req.user.salt) {
            res.status(401).send({ status: 'Invalid token' });
            return;
        }
        User.findOneAndUpdate(
            { email },
            {
                password: hashedPassword,
                salt: userSalt
            },
            { new: true },
            (err) => {
                if (err) {
                    res.status(401).send({ status: 'Access denied' });
                    return;
                }
                else {
                    res.status(200).send({ status: 'Passowrd changed successfully' })
                    return;
                }
            }
        );
    })
};

exports.generatePassToken = (req, res) => {
    const email = req.body.email;
    if (email == null) {// nothing to do
        res.sendStatus(400)
        return
    }
    else {
        User.findOne({ email }, (err, user) => {
            if (err) {
                res.status(400).send({ error: err })
                return;
            }
            else if (user == null) {
                res.status(401).send({ message: 'No account found with this E-Mail.' })
                return;
            }
            else {
                let userDTO = {
                    email,
                    salt: user.salt
                }
                let jwt_token = jwt.sign(userDTO, process.env.TOKEN_SECRET, { expiresIn: '900s' })
                sendForgotMail(jwt_token, email, user.first_name, res)
            }

        })
    }

}

function sendForgotMail(jwt_token, user_email, name, res) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nkamailclient@gmail.com',
            pass: process.env.EMAIL_PASS
        }
    });
    let html = `Hello, ${name}! <br> You requested to reset your password on Nachhilfe-Kleinanzeigen. Please follow this link to reset it: <a target="_blank" href="http://localhost:8080/reset/${jwt_token}">click here</a> <br> Please note that this link is only valid for the next 15 minutes. <br> Cheers, <br> Nachhilfe-Kleinanzeigen Team`
    let mailOptions = {
        from: 'nkamailclient@gmail.com',
        to: user_email,
        subject: 'Nachhilfe-Kleinanzeigen: You forgot your password',
        html
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            res.status(401).send({ message: 'Reset E-Mail could not be sent' })
            return
        } else {
            res.status(200).send({ message: 'Reset E-Mail successfully sent!' })
            return
        }
    });
}
