const express = require('express');
const app = express();
const port = 6006
const cors = require('cors')
const es6Renderer = require("express-es6-template-engine");

app.use(express.json())
app.use(cors())

app.engine('html', es6Renderer)
app.set('views','./templates' )
app.set('view engine', 'html')


app.get('/' , (req,res) => {
    res.render('home')
})

app.post('/new_friends' , async (req,res) => {
    const {
        fName,
        lName,
        gymName
    } = req.body
    const addFriendsToDB = await pool.query(
        'INSERT INTO friends (firstName, lastName, gymName) VALUES ($1, $2, $3)', [fName, lName, gymName]
    );


    res.status(200).send('friends are added')
    
})

app.get('/addfriends' , (req,res) => {
    res.render('addfriends')
})











app.listen(port , () => console.log(`running on port ${port}`))