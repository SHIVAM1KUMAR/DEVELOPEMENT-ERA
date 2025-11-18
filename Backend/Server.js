const express= require('express');
const app=express();

//express is a framework of node which provides us a env  to req and res getting

app.use(function(req,res,next){
    console.log("Middleware chal gaya");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));//these two line use to make make data readable for says cokkies,session,or bodyparser




app.get('/',function(req,res){
    res.send("MAI PAHLA ROUTE Hu")
});
app.get('/profile',function(req,res){
    res.send("MAI Dusra ROUTE Hu")
});

app.listen(3000);