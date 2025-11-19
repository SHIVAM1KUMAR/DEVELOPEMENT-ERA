const express=require ('express');
const app=express();
const path=require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
// Home Route
app.get('/', (req, res) => {
    res.render("index", { username: null });
});

// Dynamic Route (username)
app.get('/user/:username', (req, res) => {
    res.render("index", { username: req.params.username });
});

 ///const Port= 3000;
app.listen(3000,function (){
    console.log("Its Running");
})