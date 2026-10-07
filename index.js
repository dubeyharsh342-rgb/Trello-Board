//username, password. | USER table
//organization | ORGANIZATion
//boards | BOARDS table
//issue | ISSUE table

const express = require("express");

const userd = [{
    id: 1,
    username : "harkirat",
    password : "123123"
},{
    id: 2,
    username : "raman",
    password : "123123"

}]
const organization = [{
    id: 1,
    title: "100xdevs",
    description: "Learning coding plateform",
    admin: 1,
    members: [2]
},
{
    id: 2,
    title: "ramans org",
    description: "Experimenting",
    admin: 1,
    members: []
}]

const boards = [{
    id: 1,
    title: "100xschool website",
    organization: 1
}];

const issue = [{
    id: 1,
    title: "Add dark mode",
    boardId: 1
},{
    id:2,
    title: "Allows admins to create more courses",
    boardId: 2 
}];


const app = express();
app.listen(3000);