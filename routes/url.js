const express=require('express')
const { handlegenerateshorturl,handlegetanalytics,}=require('../controllers/url')
const router=express.Router();

router.post('/',handlegenerateshorturl);
router.get('/analytics/:shortId',handlegetanalytics)
module.exports=router;
