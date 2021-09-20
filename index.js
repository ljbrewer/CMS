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
            "Update an Employee Role",
        ]
    },
];

const promptMenu = () => {
    return inquirer.prompt(menu)
}

async function allLists() {
    try {
        promptMenu()
            (({ answer }) => {
                console.log(answer);
                switch (answer) {
                    case "View All Departments":
                        const [department] = await con.query("SELECT * FROM department")
                        console.table(result);
                        allLists()
                        break;

                    case "View All Roles?":
                        const [role] = await con.query("SELECT * FROM role")
                        console.table(result);
                        allLists()
                        break;

                    case "View All Employees?":
                        const [employee] = await con.query("SELECT * FROM employee")
                        console.table(result);
                        allLists()
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

                    case "Update an Employee Role":
                        updateEmployee();
                        break;
                }
            }
            )} catch (err) {
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
            console.table(response)
            const [deptResult] = await con.query(`INSERT INTO department(name) VALUES (?)`,
                [response.name])
            console.table(deptResult);
            console.log(response);
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
            console.table(response)
            const [insertRole] = await con.query(`INSERT INTO role(title,salary,department) VALUES (?,?,?)`,
                [response.title, response.salary, response.department_id])
            console.table(insertRole);
            console.log(response);
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
            console.table(response);
            const [insertResult] = await con.query(`INSERT INTO employee(first_name, last_name, role,manager_id, department_id) VALUES (?,?,?,?,?)`,
                [response.first_name, response.last_name, response.role_id, response.manager_id, response.department_id])
            console.table(insertResult);
            console.log(response);
        } catch (err) {
            console.error(err);
        } finally {
            allLists()
        }
    }



    function updateEmployee() {
        con.query("SELECT * FROM role", function (err, result, fields) {
            if (err) throw err;
            const employeeUpdate = [
                {
                    type: "list",
                    name: "update",
                    message: "What would you like to update: ",
                    choices: [
                        first_name,
                        last_name,
                        role_id,
                        manager_id
                    ]

                },
                {
                    type: "input",
                    name: "value",
                    message: "what value would you like entered?"
                }

            ];

            inquirer.prompt(employeeUpdate)
                .then((response) => {
                    console.log(response)
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query(
                            `UPDATE employee SET employee.${update}=${value}`,
                            function (err, result, fields) {
                                if (err) throw err;
                                console.log(result);
                                promptMenu()
                            }
                        );
                    })

                })


        });
    }

