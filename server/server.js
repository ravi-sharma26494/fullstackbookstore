const express =require('express');
const app = express();
const cors = require('cors')
const PORT = 5000;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'fadfadfadfadafad';
const Login = require('./Models/Login')

const authenticate = require('././Middlewares/auth'); //for protected route


app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/FullStackBook').then(()=> console.log('Connected to the Database')).catch((er)=> console.log(err))

// app.post('/registration', (req,res)=>{
//     // console.log(req.body);
//     var {username, password, confirmpassword} = req.body;
//     if(!username || !password || !confirmpassword){
//         res.status(201).json({
//             message:'Please fill all the details'
//         });
//     }
//     if(!password === confirmpassword){
//         res.status(201).json({
//             message:"Password do not match"
//         })
//     }
//     bcrypt.hash(password,12)
//     .then((hashedPassword)=>{
//         User.findOne({username: username})
//         .then((savedUser)=>{
//             if(savedUser){
//                 return res.status(201).json({
//                     message:'User Already Exists'
//                 })
//             }
//             const user = new User({
//                 username,
//                 password:hashedPassword,
//                 confirmpassword:hashedPassword
//             })
//             user.save()
//                 .then((user)=> {
//                     res.json({message: "New User Saved"})
//                     console.log(user.username);
//                 })
//                 .catch((err)=> console.log(err))
//         }).catch((err)=> console.log(err))
//     }).catch(err => console.log(err))
    

    
// });

// app.post('/login', (req,res)=>{
//     var{username, password} = req.body;
//     if(!username || !password){
//         return res.status(201).json({
//             message: "FiLL All the field !!"
//         })
//     }
//     User.findOne({username:username})
//     .then((savedUser)=>{
//         if(!savedUser){
//             return res.status(200).json({message:'Register to login'})
//         }

//         bcrypt.compare(password, savedUser.password)
//         .then((match)=>{
//             if(match){
//                 const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
//                 res.status(200).json({token:token})
                
//             } else{
//                 return res.status(404).json({message:"Username or Password donot match"})
//             }
//         }).catch(err=> console.log(err))
//     }).catch(err=> console.log(err))
// })

route.post(
    "/signup",
  
    async (req, res) => {
      const { username, password, confirmpassword } = req.body;
  
      if (!username || !password || !confirmpassword) {
        res.status(422).json({ error: "fill all the details" });
      }
  
      try {
        const preuser = await Login.findOne({ username: username });
  
        if (preuser) {
          res.status(422).json({ message: "This Email, Already Exist" });
        } else if (password !== confirmpassword) {
          res
            .status(422)
            .json({ error: "Password and Confirm Password Not Match" });
        } else {
          const finalUser = new Login({
            username,
            password,
            confirmpassword,
          });
  
          // password hasing
  
          const storeData = await finalUser.save();
  
          // console.log(storeData);
          res.status(201).json({ status: 201, storeData });
        }
      } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
      }
    }
  );
  
  // user Login
  
  route.post("/login", async (req, res) => {
    // console.log(req.body)
  
    const { username, password } = req.body;
  
    const userValid = await Login.findOne({ username });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      // console.log(userValid)
  
      if (!isMatch) {
        return res.status(422).json({ message: "invalid details" });
      } else {
        // token generate
        const token = await userValid.generateAuthtoken();
  
        // cookiegenerate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
  
        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
  
      // res.json({ message: 'User does not exist ,Please Register' })
    } else {
      return res.json({ message: "User do not exist ,Please Signup" });
    }
  });
  
  //user valid
  route.get("/validuser", authenticate, async (req, res) => {
    try {
      const ValidUserOne = await Login.findOne({ _id: req.userId });
      // console.log(ValidUserOne)
      return res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
      return res.status(401).json({ status: 401, error });
    }
  });
  //logout
  route.get("/logout", authenticate, async (req, res) => {
    try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
        return curelem.token !== req.token;
      });
  
      res.clearCookie("usercookie", { path: "/" });
  
      req.rootUser.save();
  
      res.status(201).json({ status: 201 });
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  });

app.get('/protected', (req, res)=>{
    const token = req.headers['x-access-token']
    try {
        const decoded =jwt.verify(token, JWT_SECRET)
        const username = decoded.username;
        const user = User.findOne({username: username})
        const upadte = User.updateOne({username: username}, {$set:{title:req.body.title}})
        return {staus:'ok', message:'Hello your books are here'}     
    } catch (error) {
        console.log(err);
        res.status(401).json({
            status:'error',
            message:'invalid token'
        })
    }
    
    
})
app.listen(PORT, ()=> console.log('running'))