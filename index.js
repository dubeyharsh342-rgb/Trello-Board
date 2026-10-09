//username, password. | USER table
//organization | ORGANIZATion
//boards | BOARDS table
//issue | ISSUE table

const express = require("express");
const jwt = require("jsonwebtoken");

const { authMiddleware } = require("./middleware");

let USER_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUEs_ID = 1;
const USERS = []
const ORGANIZATION = []

const BOARDS = [];

const ISSUE = [];


const app = express();
app.use(express.json())


// CREATE
app.post("/signup", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const userExist = USERS.find(u => u.username === username);
    if(userExist){
        res.status(411).json({
            message: "User with this username already exist"
        })
        return;
    }
    USERS.push({
        username,
        password,
        id: USER_ID++
    })
    res.json({
        message: "You have signed up successfully"
    })
})
app.post("/signin", function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const userExist = USERS.find(u=> u.username === username && u.password === password);
    if(!userExist)
    {
        return res.status(403).json({
            message: "Incorrect crediantials"
        })
    }
    // create a jwt for the user
    const token = jwt.sign({
        userId: userExist.id
    }, "harsh123321")
    res.json({
        token
    })

})

// AUTHENTICATED ROUTE - MIDDLEARE
app.post("/organization",authMiddleware, function(req,res){
    const userId = req.userId;
    ORGANIZATION.push({
        id: ORGANIZATION_ID++,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })
    res.json({
        message: "Org created",
        id: ORGANIZATION_ID-1
    })
})

app.post("/add-member-to-organization",authMiddleware, function(req,res){
    const userId = req.userId;
    const organizationID = req.body.organizationID;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = ORGANIZATION.find(org => org.id === organizationID);
    if(!organization || organization.admin != userId){
        res.status(411).json({
            message: "Either this org dosent exist or you are not an admi of this org"
        })
        return 
    }
    const memberUser = USERS.find(u => u.username === memberUserUsername);
    if(!memberUser){
        res.status(411).json({
            message: "No user ith this username exists in our db"
        })
        return 
    }
    organization.members.push(memberUser.id);
})
app.post("/board", function(req,res){

})
app.post("/issue", function(req,res){

})



// READ 

app.get("/organization",authMiddleware, function(req,res){
    const userId = req.userId;
    const organizationId = parseInt(req.query.organizationId);

    const organization = ORGANIZATION.find(org => org.id === organizationId);
    if(!organization || organization.admin != userId){
        res.status(411).json({
            message: "Either this org dosent exist or you are not an admi of this org"
        })
        return 
    }
    res.json({
        organization: {
            ...organization,
            members: organization.members.map(memberId => {
                const user = USERS.find(user => user.id === memberId);
                return{
                    id: user.id,
                    username: user.username
                }
            })
        }
    })
})
app.get("/board", function(req,res){

})
app.get("/issues", function(req,res){

})

app.get("/member", function(req,res){

})

//UPDATE
app.put("/issues", function(req,res){

})

//DELETE
app.delete("/issues",authMiddleware, function(req, res){
    const userId = req.userId;
    const organizationID = req.body.organizationID;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = ORGANIZATION.find(org => org.id === organizationID);
    if(!organization || organization.admin != userId){
        res.status(411).json({
            message: "Either this org dosent exist or you are not an admi of this org"
        })
        return 
    }
    const memberUser = USERS.find(u => u.username === memberUserUsername);
    if(!memberUser){
        res.status(411).json({
            message: "No user ith this username exists in our db"
        })
        return 
    }
    organization.members.filter(user => user.id !== memberUser.id);
    res.json({
        message: "member deleted!"
    })
})


app.listen(3000);