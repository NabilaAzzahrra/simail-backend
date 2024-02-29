var express = require('express');
var router = express.Router();
const { User } = require('../models');

const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json({
        status:'success',
        data:users
    });
});

router.get('/:id', async (req, res) => {
    const users = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.status(200).json({
        status:'success',
        data:users
    });
});

router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    }
    let user = await User.create(data);
    return res.json({
        message: 'Berhasil disimpan',
        data: user
    });

});

router.patch('/:id', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    }
    await User.update(data, {
        where: {
            id: req.params.id
        }
    });
    return res.status(200).json({
        status:'success',
        message:'Berhasil Mengubah Data'
    });
});

router.delete('/:id', async (req, res) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    });
    return res.status(200).json({
        status:'sucsess',
        message: 'BERHASIL DIHAPUS'
    });
});

module.exports = router;
