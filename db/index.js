const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user= process.env.DB_USER,
        // TODO: Add MySQL password here
        password =  process.env.PASSWORD,
        database = process.env.DB_NAME
    },
    console.log(`Connected to the employee_db database.`)
);

menu = [
    {
        type: 'rawlist',
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles?",
            "View All Employees?",
            "Add a Department?",
            "Add a Role?",
            "Add an Employee?",
            "Update an Employee Role",
        ]
    },
];

const promptUser = () => {
    return inquirer.prompt(menu)
}

const departments = () => {
    promptUser()
        .then((answer) => {
            switch (answer) {
                case "View All Departments":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM department", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                        break
                    });
                case "View All Roles?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM role", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                        break
                    });
                case "View All Employees?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM employee", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                        break
                    });
                case "Add a Department?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM department", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                        break
                    });
                case "Add a Role?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM role", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                        break
                    });
                case "Add an Employee?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM employee", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                        break
                    });
                case "Update an Employee Role":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM employee", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                        break
                    });

            };
        }
        )
}

