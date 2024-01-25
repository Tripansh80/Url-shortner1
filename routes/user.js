const express=require('express')
const {handleuserSignup,handleuserlogin}=require('../controllers/user')
const router=express.Router();

router.post('/',handleuserSignup);
router.post('/login',handleuserlogin);
module.exports=router;