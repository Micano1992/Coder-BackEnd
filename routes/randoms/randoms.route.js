const express = require('express');
const { fork } = require('child_process')
const path = require('path')

const router = express.Router();

router.get('/random', (req, res) => {

    let { cant } = req.query

    if (!cant) {
        cant = 1000000000
    }
    const computo = fork(path.resolve(__dirname, './computo.js'))

    computo.send(cant)

    computo.on('message', (data) => {

        res.send(data)
    })



})

module.exports = router;