// 1. import 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// 2. initialisation
const app = express();
app.use(express.json())
app.use(cors())
// 2.1 connection to mongoDB
mongoose.connect("mongodb://localhost:27017/resume")
.then( ()=>{
    console.log("MongoDB Connect")
} )
.catch(err=>{
    console.log(err)
})


// 3. traitement
require('./resume.routes')(app)
// app.get('/:id' , (req,res)=>{
   
    
//     res.send({data:  req.params.id});
// })


// 4. lancement du serveur
app.listen(5000 , ()=> {
    console.log('server is running on port 5000');
}); // callback because this can take time