const User=require('../models/user')
const {v4: uuidv4}=require('uuid')
const{setUser}=require('../service/auth')
async function handleuserSignup(req,res) {

const {name,email,password}=req.body;
await User.create({

    name,
    email,
    password,
});

return res.redirect('/')
}

async function handleuserlogin(req,res) {

    const {email,password}=req.body;
   const user= await User.findOne({
        email,
        password,
    });
    if(!user){
        return res.render("/login",{
error: "invalid username, passwprd",
        });
      
    }
    // const sessionid=uuidv4(); 
    const token = setUser(user)
    res.cookie('uid',token)
    return res.redirect('/')
    }

module.exports={
    handleuserSignup,
    handleuserlogin
}




///This is without JWT items

// const User=require('../models/user')
// const {v4: uuidv4}=require('uuid')
// const{setUser}=require('../service/auth')
// async function handleuserSignup(req,res) {

// const {name,email,password}=req.body;
// await User.create({

//     name,
//     email,
//     password,
// });

// return res.redirect('/')
// }

// async function handleuserlogin(req,res) {

//     const {email,password}=req.body;
//    const user= await User.findOne({
//         email,
//         password,
//     });
//     if(!user){
//         return res.render("/login",{
// error: "invalid username, passwprd",
//         });
      
//     }
//     const sessionid=uuidv4(); 
//     setUser(sessionid,user)
//     res.cookie('uid',sessionid)
//     return res.redirect('/')
//     }

// module.exports={
//     handleuserSignup,
//     handleuserlogin
// }