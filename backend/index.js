const express=require('express')
const app=express();
const dotenv=require("dotenv")
dotenv.config();
const mongoose=require('mongoose');
const cors = require('cors'); 
app.use(express.json());
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt')
const UserModel = require('./models/userModel')
const PostModel = require('./models/postModel')


app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.static('Public'))


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("connected to mongodb"))
  .catch((err)=>console.log(err));


  //registering user

app.post('/register', (req, res) => {
    const {username, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({username, email, password: hash})
        .then(user => res.json(user))
        .catch(err => res.json(err))
    }).catch(err => console.log(err))
})

//user login

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  UserModel.findOne({email})
  .then(user => {
      if(user) {
          bcrypt.compare(password, user.password, (err, response) => {
              if(response) {
                  res.json("Success")
              } else {console.log("incorrect");
                  res.json("Password is incorrect");
              }
          })
      } else {
        res.json("User does not exist")
      }
  })
  .catch(err => res.json(err))
})

//creating storage for images

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

// creating a post

app.post('/write', upload.single('file'), (req, res) => {
  PostModel.create({title: req.body.title, 
    description: req.body.description, 
    file: req.file.filename, author: req.body.email})
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
})

 //finding all posts from database for homepage
app.get('/getposts', (req, res) => {
  PostModel.find()
  .then(posts => res.json(posts))
  .catch(err => res.json(err))
})

// finding single post by id

app.get('/getpostbyid/:id', (req, res) => {
  const id = req.params.id;
  PostModel.findById({_id: id})
  .then(post => res.json(post))
  .catch(err => console.log(err))
})

//editing single post by id

app.put('/editpost/:id', (req, res) => {
  const id = req.params.id;
  PostModel.findByIdAndUpdate(
      {_id: id},{ 
      title: req.body.title, 
      description: req.body.description}
      ).then(result => res.json("Success"))
      .catch(err => res.json(err))
})

//deleting post by id

app.delete('/deletepost/:id', (req, res) => {
  PostModel.findByIdAndDelete({_id: req.params.id})
  .then(result => res.json("Success"))
  .catch(err => res.json(err))
})



  app.listen("5000",()=>{
    console.log("server running at 5000");
});