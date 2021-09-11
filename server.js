const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
const inquirer =require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();




app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});