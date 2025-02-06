// console.log('start server')npm run devStart

const  express=require('express');
const app=express();
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    // res.send('hi');
    // res.sendStatus(500);
    res.render('hi')

})


const userRouter=require('./routes/users')
app.use('/users',userRouter)
app.listen(3696);