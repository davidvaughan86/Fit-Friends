const express = require('express');
const app = express();
const port = 6006
const cors = require('cors')
const es6render = require('express-es6-template-engine')

app.use(express(cors()))

app.set('html', 'es6render')
app.set('views','' )


app.get('/' , (req,res) => {
    res.render()
})











app.listen(port , () => console.log(`running on port ${port}`))