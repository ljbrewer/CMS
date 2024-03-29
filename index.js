const express = require('express');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
require('dotenv').config();
const inquirer = require("inquirer");

let con;

mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).then(c => {
    con = c;
    allLists();
});



menu = [
    {
        type: 'rawlist',
        message: "What would you like to do?",
        name: "answer",
        choices: [
            "View All Departments",
            "View All Roles?",
            "View All Employees?",
            "Add a Department?",
            "Add a Role?",
            "Add an Employee?",
            "Update an Employee",
            "Exit the Database"
        ]
    },
];

const promptMenu = () => {
    return inquirer.prompt(menu)
}

function allLists() {
    promptMenu()
        .then(({ answer }) => {
            switch (answer) {
                case "View All Departments":
                    viewDepartment();
                    break;

                case "View All Roles?":
                    viewRole();
                    break;

                case "View All Employees?":
                    viewEmployee();
                    break;

                case "Add a Department?":
                    addDepartment();
                    break;

                case "Add a Role?":
                    addRole();
                    break;

                case "Add an Employee?":
                    addEmployee();
                    break;

                case "Update an Employee":
                    updateEmployee();
                    break;

                case "Exit the Database":
                    process.exit(0)
                    break;
            }

        }

        )
}

async function viewDepartment() {
    try {
        const [department] = await con.query("SELECT * FROM department")
        console.table(department);
    } catch (err) {
        console.error(err);
    } finally {
        allLists()
    }
}

async function viewRole() {
    try {
        const [role] = await con.query("SELECT * FROM role")
        console.table(role);
    } catch (err) {
        console.error(err);
    } finally {
        allLists()
    }
}

async function viewEmployee() {
    try {
        const [employee] = await con.query("SELECT first_name, last_name, employee.id, role.title as Position, role.salary as Salary, department.name as Department FROM employee INNER JOIN role ON employee.role = role.id INNER JOIN department ON employee.department_id = department.id ORDER BY employee.department_id")
        console.table(employee);
    } catch (err) {
        console.error(err);
    } finally {
        allLists()
    }
}


async function addDepartment() {
    try {
        const [department] = await con.query("SELECT * FROM department")
        const roleQuestion = [
            {
                type: "input",
                name: "name",
                message: "Enter the new department name",

            }]

        const response = await inquirer.prompt(roleQuestion)
        const [deptResult] = await con.query(`INSERT INTO department(name) VALUES (?)`,
            [response.name])
        //console.table(deptResult);
    } catch (err) {
        console.error(err);
    } finally {
        allLists()
    }
}


async function addRole() {
    try {
        const [department] = await con.query("SELECT * FROM department")

        const roleQuestion = [
            {
                type: "input",
                name: "title",
                message: "Please enter the Role would you like to add: ",
            },
            {
                type: "number",
                name: "salary",
                message: "Enter the Salary for this Role: ",
            },
            {
                type: "list",
                name: "department_id",
                message: "Choose the department for this Role",
                choices: department.map(department => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                }),
            },
        ];

        const response = await inquirer.prompt(roleQuestion)
        const [insertRole] = await con.query(`INSERT INTO role(title,salary,department) VALUES (?,?,?)`,
            [response.title, response.salary, response.department_id])
        //console.table(insertRole);

    } catch (err) {
        console.error(err);
    } finally {
        allLists()
    }
}

async function addEmployee() {
    try {
        const [roles] = await con.query("SELECT * FROM role")
        const [employees] = await con.query("SELECT * FROM employee")
        const [department] = await con.query("SELECT * FROM department")
        const employeeQuestion = [
            {
                type: "input",
                name: "first_name",
                message: "Please enter the First Name of the Employee: ",
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter the Last Name for this Employee: ",
            },
            {
                type: "list",
                name: "role_id",
                message: "Choose the Role for this Employee",
                choices: roles.map(role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                },
                )
            },
            {
                type: "list",
                name: "manager_id",
                message: "Choose the Manager for this Employee",
                choices: employees.map(employee => {
                    return {
                        name: employee.first_name + ' ' + employee.last_name,
                        value: employee.id,
                    }
                })
            },
            {
                type: "list",
                name: "department_id",
                message: "Choose the department for this Employee",
                choices: department.map(department => {
                    return {
                        name: department.name,
                        value: department.id,
                    }
                })
            }
        ]
        const response = await inquirer.prompt(employeeQuestion)
            const [insertResult] = await con.query(`INSERT INTO employee(first_name, last_name, role,manager_id, department_id) VALUES (?,?,?,?,?)`,
            [response.first_name, response.last_name, response.role_id, response.manager_id, response.department_id])
        //console.table(insertResult);
    }catch (err) {
        console.error(err);
    } finally {
        allLists()
    }
}

async function updateEmployee() {
    try {
        const [employee] = await con.query("SELECT * FROM employee")
        const employeeUpdate = [
            {
                type: "list",
                name: "employee_id",
                message: "Choose the Employee you want to update:",
                choices: employee.map(employee => {
                    return {
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id
                    }
                }),
            },
            {
                type: "list",
                name: "update",
                message: "What would you like to update: ",
                choices: [
                    "first_name",
                    "last_name",
                    "role",
                    "manager_id",
                    "department_id"
                ]

            },
            {
                type: "input",
                name: "value",
                message: "Enter the value would you like entered? Role, Manager, or Department must be entered as their id"
            },

        ]

        const response = await inquirer.prompt(employeeUpdate)
       // console.table(response)
        const [insertEmpUpdate] = await con.query(`UPDATE employee SET ?? = ? WHERE id = ?`,
            [response.update, response.value, response.employee_id])
       // console.table(insertEmpUpdate);

    } catch (err) {
        console.error(err);
    } finally {
        allLists()
    }
}
