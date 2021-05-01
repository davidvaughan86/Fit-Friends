
const express = require('express');
const app = express();
const port = 6006
const cors = require('cors')
const es6Renderer = require("express-es6-template-engine");
const pool = require('./db.js')

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
    try {
        const addFriendsToDB = await pool.query(
            'INSERT INTO friends (fName, lName, gymName) VALUES ($1, $2, $3)', [fName, lName, gymName]
        );
    
    
        res.status(200).send('friends are added')

    }catch(err) {
        console.log(err.message)
    }
    
    
})

app.get('/addfriends' , (req,res) => {
    res.render('addfriends')
})


app.get('/friends' , async (req,res) => {
    try {
        const friendsList = await pool.query(
            'SELECT * FROM friends ORDER BY user_id;'
        )
        // res.json(friendsList.rows)
        // JSON.stringify(friendsList.rows)
        // console.log(friendsList.rows)
        
        res.render('friends',
         {
                locals: {
                    friends:[...friendsList.rows]
                }
            }
        )
    }catch(err) {
        console.log(err.message)
    }
    
})
     
        
app.post('/delete_friends/:user_id', async (req,res) => {
    try {
    const { user_id } = req.params;
    console.log(user_id)
    
        const delete_friend = await pool.query(
            `DELETE FROM friends WHERE user_id = ${user_id}`, [user_id]
        )
        res.status(200).redirect('/friends')
    }catch(err){
        console.log(err.message)
    }
    
})
        
    
    
    









app.listen(port , () => console.log(`running on port ${port}`))