// npm Dependencies
const fs = require('fs'); 
const inquirer = require('inquirer');

const renderHTML = require('./src/renderHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const teamArray = []; 



//Start to add Employees
function createEmployee () {
    inquirer
    .prompt([
      {
        type: "list",
        message: "What is your job title?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        message: "What is this Team Members name?",
        name: "name",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log ("Please enter the Team Members name!");
                return false; 
            }
        }
    },
      {
        type: "input",
        message: "What is the Team Members email address?",
        name: "email",
        validate: email => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if (valid) {
                return true;
            } else {
                console.log ('Please enter an email address!')
                return false; 
            }
        }
    },
      {
        type: "input",
        message: "What is the Team Members ID#?",
        name: "id",
        validate: nameInput => {
            if  (isNaN(nameInput)) {
                console.log ("Please enter the Team Members ID!")
                return false; 
            } else {
                return true;
            }
        }
    },
    ])
    // Start questions based on role chosen
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "Engineer") {
        roleInfo = "GitHub?";
      } else if (role === "Intern") {
        roleInfo = "School?";
      }
      else {
        roleInfo = "Office number?";
      }
      inquirer
        .prompt([
          {
            type: "input",
            message: `Enter Team Members ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "confirm",
            message: "Would you like to add more Team Members?",
            name: "more",
          },
        ])
        .then(function ({ roleInfo, more }) {
          let teamMember;
          if (role === "Manager") {
            teamMember = new Manager(name, id, email, roleInfo);
          } else if (role === "Engineer") {
            teamMember = new Engineer(name, id, email, roleInfo);
          } else {
            teamMember = new Intern(name, id, email, roleInfo);
          }
          teamArray.push(teamMember);
          if (more === true) {
            createEmployee();
          } else {
            let str = renderHTML(teamArray);
            createHTML(str);
          }
        });
    });
}


//Generate HTML
function createHTML(str) {
    fs.writeFile('./dist/index.html', str, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your index.html team profile has been created!")
        }
    })
}; 
function init() {
    createEmployee(); 
}

init();
