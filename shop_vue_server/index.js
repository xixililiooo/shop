const express = require('express');
const fs = require('fs');
const path = require('path');
const app = new express();
app.use(express.static(path.resolve(__dirname,'./dist')));
app.get('/',(req,res)=>{
    let html = fs.readFileSync(path.resolve(__dirname,'./dist/index.html'),'utf-8');
    res.send(html);
})
app.listen(3400,()=>{
    console.log('server is running');
})