const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article = require('./models/article')

//route

const userRouters = require('./routes/user');

const app = express();

// mongoose db connect

mongoose.connect('mongodb://localhost:27017/mydatabase');




// view engine
app.use(expressLayouts);
app.set('view engine','ejs');


// route

app.get('/',async(req,res)=>{
  const article = await Article.find();
  console.log(article)
  res.render('index',{article:article})
})


// body parser

app.use(express.json());
app.use(express.urlencoded({extended:true}))




// userRouters

app.use('/article',userRouters)


// public folder for css and js

app.use(express.static('public'))




// port
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
  console.log("working on port 8080")
})