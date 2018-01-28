"use strict";
const express = require('express');
const router = express.Router();

module.exports = (dbHelper) => {
    router.get('/login', (req, res) => {
       res.json("hold on");
    });
    return router;
}