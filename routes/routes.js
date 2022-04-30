const express = require('express');
const router = express.Router();
const Blog = require('../model/schema')
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

//home redirect route.
router.get('/blogsoftware', (req, res) => {
    res.redirect('/all-blogs');
}) 

router.get('/new-blog', (req, res) => {
    res.render('../views/new-blog.ejs');  
})

//Pulls all blogs and renders them on home.ejs. Which is /all-blogs!
router.get('/all-blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
    .then((result)=>{
         res.render('home', {blogs: result}); 
    }).catch((err)=>{
        console.log(err);
    })

}) 

//responsible for saving new blog post
router.post('/blogsoftware', (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then((result)=>{
        res.redirect('/blogsoftware');
    }).catch((err)=>{
        console.log(err);
    })
}) 

 //rendering single blog thats clicked on
router.get('/blogsoftware/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('single-blog', { blog: result});
      })
      .catch(err => {
        console.log(err);
      });
  });

  //delete route
router.delete('/blogsoftware/:id/',  (req, res) => {
    Blog.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            console.log(err)
        } else {
            res.redirect('/blogsoftware')
        }
    })
})

//getting edit route and rendering edit form
router.get('/blogsoftware/:id/edit', (req, res) => {
    const id = req.params.id
    Blog.findById(id).then(result => {
        res.render('edit', {blog: result});
    }).catch(err => {
        console.log(err)
    });
})

//takes in new req.body data and then redirects with new-params
router.put('/blogsoftware/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, {

        title: req.body.title,
        author: req.body.author,
        snippet: req.body.snippet,
        body: req.body.body,

    }, function(err, update){
        console.log(req.body)
        if(err){
            console.log(err)
        } else {
            res.redirect('/blogsoftware/' + req.params.id)
        }
    })
})

module.exports = router;