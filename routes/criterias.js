var express = require('express');
var router = express.Router();
const { Criteria } = require('../models');

const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    let criterias = await Criteria.findAll();
    return res.json(criterias);
});

router.get('/:id', async (req, res) => {
    let criterias = await Criteria.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.json(criterias);
});

router.post('/', async (req, res) => {
    let data = {
        criteria: req.body.criteria,
    }
    let criteria = await Criteria.create(data);
    return res.json({
        message: 'Berhasil disimpan',
        data: criteria
    });

});

router.patch('/:id', async (req, res) => {
    let data = {
        criteria: req.body.criteria,
    }
    await Criteria.update(data, {
        where: {
            id: req.params.id
        }
    });
    let criteria = await Criteria.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'Berhasil diubah',
        data: criteria
    });
});

router.delete('/:id', async (req, res) => {
    await Criteria.destroy({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'BERHASIL DIHAPUS'
    });
});

module.exports = router;
