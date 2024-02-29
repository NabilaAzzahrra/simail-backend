var express = require('express');
var router = express.Router();
const { Employee } = require('../models');

router.get('/', async (req, res) => {
    let employees = await Employee.findAll();
    return res.json(employees);
});

router.get('/:id', async (req, res) => {
    let employees = await Employee.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.json(employees);
});

router.post('/', async (req, res) => {
    let data = {
        nik: req.body.nik,
        name: req.body.name,
        number_phone: req.body.number_phone,
    }
    let employee = await Employee.create(data);
    return res.json({
        message: 'Berhasil disimpan',
        data: employee
    });

});

router.patch('/:id', async (req, res) => {
    let data = {
        nik: req.body.nik,
        name: req.body.name,
        number_phone: req.body.number_phone,
    }
    await Employee.update(data, {
        where: {
            id: req.params.id
        }
    });
    let employee = await Employee.findOne({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'Berhasil diubah',
        data: employee
    });
});

router.delete('/:id', async (req, res) => {
    await Employee.destroy({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'BERHASIL DIHAPUS'
    });
});

module.exports = router;
