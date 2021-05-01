if(process.env.NODE_ENV !="production") {
    require("dotenv").config()
}

const express = require('express');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt')
const flash = require('connect-flash')
const session = require('express-session')
const es6Renderer = require('express-es6-template-engine')
const parse = require('urlencoded-body-parser')
const initializedPassort = require('./passport_config');
const passport = require("passport");
const { authenticate } = require("passport");
initializedPassort(
    passport,
    (email) => users.find(users => users.email === email),
    (id) => users.find(users => users.id === id)
)


const port = 7007
const users = []



app.use(express.static('../public'));
app.use(express.json());
app.use(cors());
app.use(flash())
app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}))

app.use(passport.initialize())
app.use(passport.session())


app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

app.use(express.urlencoded({extended: false}))

function checkAuthenticated(req,res,next) {
    if(req.isAuthenticated() ){
        return next()
    }
    res.redirect('/')
}


app.get('/',(req,res) => {
    res.render("home", {locals: { name:req.body.name }})
})







app.get('/register',checkAuthenticated, (req,res) => {
    res.render("register")
})

app.post('/register', async (req,res) => {
    try {
    
        const salt = await bcrypt.genSalt();
        res.status(200).send('ok')
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const users = {
            id: Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        };
        users.push(users)
        console.log(users)



        res.status(200).redirect('/login')
    }catch(err){
        res.status(401).redirect("/register")
    }
})







app.get('/login',checkAuthenticated, (req,res) => {
    res.render("login")
})



app.post('/login', 
passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})
)

app.post('/logot' , (req,res) => {
    req.logOut();
    res.redirect('/')
})






app.listen(port , () => {
    console.log(`running on ${port}`)
})