const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
const inquirer = require("inquirer");



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

const promptMenu = () => {
    return inquirer.prompt(menu)
}

const allLists = () => {
    promptMenu()
        .then((answer) => {
            switch (answer) {
                case "View All Departments":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM department", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
                case "View All Roles?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM role", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                });
                case "View All Employees?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM employee", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
                case "Add a Department?":
                   addDepartment();
                
                case "Add a Role?":
                   addRole();

                case "Add an Employee?":
                    addEmployee();

                case "Update an Employee Role":
                    updateEmployee();

            };
        },
        promptMenu()
        )
    }
const deptQuestion = [
    {
        type: "input",
        name: "name",
        message: "Please enter the Department name you would like to add: ",
        
    }
]

const roleQuestion = [
    {
        type: "input",
        name: "title",
        message: "Please enter the Role would you like to add: ",
    },
    {
        type: "input",
        name: "salary",
        message: "Enter the Salary for this Role: ",
    },
    {
        type: "list",
        name: "department_id",
        message: "Choose the department ID for this Role",
        Choices: con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM department", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        }),
    },    
]

const employeeQuestion = [
    {
        type: "input",
        name: "first_name",
        message: "Enter first name of Employee",
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter last name of Employee",
    },
    {
        type: "list",
        name: "role_id",
        message: "Choose the role of the Employee",
        choices: con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM role", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        }),
    },
    {
        type: "list",
        name: "manager_id",
        message: "Choose the Manager of the Employee",
        choices: con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM employee", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        }),
    }
]