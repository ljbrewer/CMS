const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
const inquirer = require("inquirer");

var con = mysql.createConnection({    
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_db"
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

const allLists = () => {
    promptMenu()
        .then(({answer}) => {
            console.log(answer);
            switch (answer) {
                case "View All Departments":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM department", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
                    break;
                case "View All Roles?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM role", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
                    break;
                case "View All Employees?":
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query("SELECT * FROM employee", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
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
            };
        },
            // promptMenu()
        )
}
const deptQuestion = [
    {
        type: "input",
        name: "name",
        message: "Please enter the Department name you would like to add: ",

    }
]



// const employeeQuestion = [
//     {
//         type: "input",
//         name: "first_name",
//         message: "Enter first name of Employee",
//     },
//     {
//         type: "input",
//         name: "last_name",
//         message: "Enter last name of Employee",
//     },
//     {
//         type: "list",
//         name: "role_id",
//         message: "Choose the role of the Employee",
//         choices: con.connect(function (err) {
//             if (err) throw err;
//             con.query("SELECT * FROM role", function (err, result, fields) {
//                 if (err) throw err;
//                 console.log(result);
//             });
//         }),
//     },
//     {
//         type: "list",
//         name: "manager_id",
//         message: "Choose the Manager of the Employee",
//         choices: con.connect(function (err) {
//             if (err) throw err;
//             con.query("SELECT * FROM employee", function (err, result, fields) {
//                 if (err) throw err;
//                 console.log(result);
//             });
//         }),
//     }
// ]

function addDepartment() {
    inquirer.prompt(deptQuestion)
        .then((response) => {
            con.connect(function (err) {
                if (err) throw err;
                con.query(`INSERT INTO department(name) VALUES ${name}`,
                    function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                    });
            }
            )

        })
}
function addRole() {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM department", function (err, result, fields) {
            if (err) throw err;
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
                    choices: result.map(department => {
                        return {
                            name: department.name,
                            value: department.id
                        }
                    }),
                },
            ];

            inquirer.prompt(roleQuestion)
                .then((response) => {
                    con.connect(function (err) {
                        if (err) throw err;
                        con.query(`INSERT INTO role(title,salary,department_id) VALUES ${title, salary, department_id}`,
                            function (err, result, fields) {
                                if (err) throw err;
                                console.log(result);
                                promptMenu()
                            });
                    }
                    )

                })
        });
    })




    
    
}
function addEmployee() {
    // inquirer.prompt(deptQuestion)
    //     .then((response) => {
    //         con.connect(function (err) {
    //             if (err) throw err;
    //             con.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ${first_name,last_name,role_id,manager}`,
    //                 function (err, result, fields) {
    //                     if (err) throw err;
    //                     console.log(result);
    //                 });
    //         }
    //         )

    //     })
}

allLists();