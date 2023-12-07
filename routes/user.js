const express = require('express');
const Router = express.Router();
const Article = require('../models/article');

// new form view



Router.get('/new', (req, res) => {
    res.render('article/new');
});

// update

Router.get('/edit/:id',async(req,res)=>{
    const article_date = await Article.findById({_id:req.params.id})
    res.render('article/edit.ejs',{article:article_date})

})



Router.post('/edit/:id', async (req, res) => {
    try {
        const updatedArticle = await Article.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        if (!updatedArticle) {
            console.log('Cannot find article to update');
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log('Error updating article:', err);
        res.redirect('/');
    }
});


Router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) {
        res.redirect('/');
    }
    res.render('article/show', { article: article });
});

Router.post('/', (req, res) => {
    const article = new Article({
        title: req.body.title,
        des: req.body.des,
        info: req.body.info
    });
    article.save().then(() => {
        res.redirect('/');
    });
});

// delete

Router.get('/delete/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.send('Sorry');
    }
});


module.exports = Router;
