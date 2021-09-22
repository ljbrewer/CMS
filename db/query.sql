SELECT employee.id,employee.first_name,employee.last_name,department.name FROM employee  
JOIN department ON employee.department_id = department.id;

SELECT * FROM role
JOIN department ON role.department = department.id;

SELECT * FROM department;

INSERT INTO employee(first_name, last_name,role, manager_id)
values("Dave","COX",1, 1);


INSERT INTO role(title, salary,department)
VALUES("CSS Developer", 6000.00,1);

UPDATE employee
set role = "8"
where first_name = "Laura";

SELECT first_name, last_name, employee.id, role.title as Position, role.salary as Salary, department.name as Department
FROM employee
INNER JOIN role 
ON employee.role = role.id 
INNER JOIN department 
ON employee.department_id = department.id
ORDER BY employee.department_id