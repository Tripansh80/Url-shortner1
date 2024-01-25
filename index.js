const express=require('express');
const path=require('path')
const {connectmongodb}=require('./connect')
const URL=require('./models/url')
const PORT=8001;
const app=express();
connectmongodb('mongodb://127.0.0.1:27017/short-url').then(()=>console.log("your connection is established"))
const cookieparser=require('cookie-parser')
const {restirictologin}=require("./middlewares/auth")
const urlroute=require('./routes/url')
const userRoute=require('./routes/user')
const staticRoute=require('./routes/staticRouter')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieparser());
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use('/url',restirictologin,urlroute)
app.use('/user',userRoute);
app.use('/',staticRoute);

app.get('/test',async (req,res)=>{
    const allurlsss=await URL.find({})
return res.render('home',{
    urls: allurlsss,

})
})

app.get('/url/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
   const entry= await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visithistory: {
                timestamp: Date.now(),}
    }});   
   res.redirect(entry.redirecturl); 
})
app.listen(PORT,()=>console.log(`your server is started ${PORT}`))


// <ol>
// ${allurlsss.map((URL)=>`<li>${URL.shortId}--${URL.redirecturl}--${URL.visithistory.length}</li>`).join('')}
// </ol>