const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM person', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM person WHERE id = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});

router.post('/', (req, res) => {
    const { id, name, direction } = req.body;
    const query = `
    CALL personAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, direction])
    mysqlConnection.query('SELECT * FROM person WHERE id = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json({ status: 'Person saved' });
        } else {
            console.log(error);
        }
    });
});

router.put('/:id', (req, res) => {
    const { name, direction } = req.body;
    const { id } = req.params;
    const query = `
    CALL personAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, direction])
    mysqlConnection.query('SELECT * FROM person WHERE id = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json({ status: 'Person updated' });
        } else {
            console.log(error);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM person WHERE id = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json({ status: 'Person deleted' });
        } else {
            console.log(error);
        }
    });
});

module.exports = router;