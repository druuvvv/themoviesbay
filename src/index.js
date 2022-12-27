const express = require('express')
const path = require('path')
const app = express()

const staticPath = path.join(__dirname , "../public");
app.use(express.static(staticPath));

app.set('view engine' , 'hbs');

app.get('/' , (req,res) => {
    res.render('index');
})

app.get('*' , (req,res) => {
    res.render('newpage');
})

app.listen(8000);