require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyToken = require('../middlewares/verifyToken');

const { JWT_SECRET, JWT_SECRET_REFRESH_TOKEN, JWT_ACCESS_TOKEN_EXPIRED, JWT_REFRESH_TOKEN_EXPIRED } = process.env;

const { User, RefreshToken } = require('../models');
const bcrypt = require('bcrypt');
const { json } = require('sequelize');

router.get('/', (req, res) => {
    res.send('Authentication');
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        }
        await User.create(data);
        return res.status(200).json({
            message: 'Berhasil mendaftar!'
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "Email tidak ditemukan."
            });
        }

        const token = jwt.sign({ data: user }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
        const refreshToken = jwt.sign({ data: user }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

        await RefreshToken.create({
            user_id: user.id,
            token: refreshToken
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
        });

        return res.status(200).json({
            status: 'success',
            data: {
                token,
                refresh_token: refreshToken
            }
        });

    } catch (error) {
        console.log(error);
    }
});

router.get('/token', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({
                status: 'error',
                message: 'invalid token'
            });
        }

        const refresh = await RefreshToken.findOne({
            where: {
                token: refreshToken
            }
        });

        if (!refresh) {
            return res.status(400).json({
                status: 'error'
            });
        }

        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                res.clearCookie('refreshToken');
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                });
            }

            const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
            return res.status(200).json({
                status: 'success',
                data: {
                    token,
                }
            });
        })

    } catch (error) {
        console.log('error');
    }
});

router.delete('/logout', verifyToken, async (req, res) => {
    await RefreshToken.destroy({
        where: {
            user_id: req.user.data.id
        }
    })
    res.clearCookie('refreshToken');
    return res.status(200).json({
        status: 'success',
        message: 'Berhasil keluar'
    });
})

module.exports = router;