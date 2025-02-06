const exp=require('express')
const router=exp.Router()

router.get('/',(req,res) => {
    res.send('hi')
})

router.get('/:id',(req,res)=>{
    res.send('its '+req.params.id)
    // console.log(users[req.params.id])
})


const users=[{name:'a'},{name:'b'},{name:'ac'}]
router.param('id',(req,res,next,id)=>{
    // res.send('hello from parasm')
    // req.abc=users[id]
    next()
    

})

module.exports=router