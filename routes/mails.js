var express = require('express');
var router = express.Router();
const { Mail } = require('../models');

router.get('/', async (req, res) => {
    let mails = await Mail.findAll();
    return res.json(mails);
});

router.get('/:id', async (req, res) => {
    let mails = await Mail.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.json(mails);
});

router.post('/', async (req, res) => {
    let data = {
        id_criteria: req.body.id_criteria,
        location: req.body.location,
        mail: req.body.mail,
        activity_photo: req.body.activity_photo,
        id_employee: req.body.id_employee,
    }
    let mail = await Mail.create(data);
    return res.json({
        message: 'Berhasil disimpan',
        data: mail
    });

});

router.patch('/:id', async (req, res) => {
    let data = {
        id_criteria: req.body.id_criteria,
        location: req.body.location,
        mail: req.body.mail,
        activity_photo: req.body.activity_photo,
        id_employee: req.body.id_employee,
    }
    await Mail.update(data, {
        where: {
            id: req.params.id
        }
    });
    let mail = await Mail.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'Berhasil diubah',
        data: mail
    });
});

router.delete('/:id', async (req, res) => {
    await Mail.destroy({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'BERHASIL DIHAPUS'
    });
});

module.exports = router;
