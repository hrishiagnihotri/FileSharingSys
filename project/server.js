
require('dotenv').config()
const multer=require('multer')
const express = require('express')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const File = require('./models/File')
// const req=require('express/lib/request')
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));//css
const upload=multer({dest:'uploads'})
mongoose.connect(process.env.DATABASE_URL)
app.set('view engine','ejs')

app.get('/',async(req,res,)=>{
    try{
        let recent=await File.findOne().sort({ _id: -1 });
        var recentLink=`/file/${recent.id}`
        res.render('index',{recentLink:recentLink})
    }
    catch(error){
        console.log('failed to get recent link '+error);
        res.render('index')
    }
})
// app.get('/',getrecentLink)

// async function getrecentLink(req,res){
//     const recent=await File.findOne({},{sort:{path:-1}});
//     console.log(recent);
// }
app.post('/upload',upload.single("file"),async(req,res) =>{
    const fileData = {
        path:req.file.path,
        originalName:req.file.originalname,
    }
    if(req.body.password!=null && req.body.password!== ''){
        fileData.password=await bcrypt.hash(req.body.password,10)
    }
    const file=await File.create(fileData)

    // res.render('index',{fileLink: `${req.headers.origin}/file/${file.id}`})
    res.render('index',{fileLink: `/file/${file.id}`,fileName:fileData.originalName})


})

app.route('/file/:id').get(handleDownload).post(handleDownload)


async function handleDownload(req,res){
    const file= await File.findById(req.params.id)

    if(file.password!=null){
        if(req.body.password == null){
            res.render('password',{filename:file.originalName})
            return
        }
    
    if(!(await bcrypt.compare(req.body.password,file.password))){
        res.render('password',{error:true})
        return
    }
}
file.downloadCount++
await file.save()
res.download(file.path,file.originalName)
console.log(file.downloadCount)
}

app.listen(3969)
// app.listen(process.env.PORT)