var express = require('express');
var router = express.Router();
const { RefreshToken } = require('../models');

router.get('/', async (req, res) => {
    let refreshtokens = await RefreshToken.findAll();
    return res.json(refreshtokens);
});

router.get('/:id', async (req, res) => {
    let refreshtokens = await RefreshToken.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.json(refreshtokens);
});

router.post('/', async (req, res) => {
    let data = {
        token: req.body.token,
        user_id: req.body.user_id,
    }
    let refreshtoken = await RefreshToken.create(data);
    return res.json({
        message: 'Berhasil disimpan',
        data: refreshtoken
    });

});

router.patch('/:id', async (req, res) => {
    let data = {
        token: req.body.token,
        user_id: req.body.user_id,
    }
    await RefreshToken.update(data, {
        where: {
            id: req.params.id
        }
    });
    let refreshtoken = await RefreshToken.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'Berhasil diubah',
        data: refreshtoken
    });
});

router.delete('/:id', async (req, res) => {
    await RefreshToken.destroy({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'BERHASIL DIHAPUS'
    });
});

module.exports = router;
