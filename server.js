const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db=knex({
    client: 'pg',
    connection: {
      host : 'postgresql-amorphous-91185',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app=express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('success!');
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`app is running on port ${process.env.PORT || 3000}`);
})