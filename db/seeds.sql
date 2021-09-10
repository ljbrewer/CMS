INSERT INTO
  department (name)
VALUES
  ("Web Development"),
  ("Data Science"),
  ("Math"),
  ("History"),
  ("Games");

INSERT INTO
  role (title, salary, department)
VALUES
  ("JavaScript Developer", 8000.00,1),
  ("Data Science Analyst", 7000.00,2),
  ("Linear Algebra Instructor",6000.00,3),
  ("Historian", 4000.00,4),
  ("HTML Developer", 5000.00,1),
  ("Game Designer", 5000.00,5),
  ("Cloud Developer", 7000.00,1);

  INSERT INTO
  employee (first_name,last_name, role,manager_id,department_id)
VALUES
  ("TJ", "Rivas",1,3,1),
  ("Elizabeth","Ireland",2,1,2),
  ("Laura","Brewer",3,1,3),
  ("Maxwell","Walin",4,2,4),
  ("Jose", "Maruffo",5,3,1),
  ("Dom","Brown",6,1,1),
  ("Khoa","Huynh",7,3,1);