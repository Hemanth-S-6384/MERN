const express=require("express")
const mongoose = require("mongoose")
const cors=require("cors")
const EmployeeModel=require('./models/Employee')
const NewPostModel = require('./models/NewPost')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee")


app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees =>res.json(employees))
    .catch(err=>res.json(err))
})

app.get('/allNewPosts', async (req, res) => {
    try {
      const allNewPosts = await NewPostModel.find();
      res.json(allNewPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/newPost',(req,res)=>{
    NewPostModel.create(req.body)
    .then(posts =>res.json(posts))
    .catch(err=>res.json(err))
})

app.post("/login",(req,res)=>{
    const{email,password}=req.body
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                if(user.role==="admin"){
                    res.json("Admin Sucess")
                }else{
                    res.json("Success")
                }
            }else{
                res.json("The Password is incorret")
            }
        }else{
            res.json("No record Exist")
        }
    })
})

app.listen(3001,()=>{
    console.log("server is running")
})


