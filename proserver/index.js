const express=require('express');
const cors=require('cors');
require('dotenv').config()
//set up db connection
require('./DB/connection')



// importing router
const router=require('./Router/router')


// server creation
const pserver=express()
// using cors
pserver.use(cors());

// converting data to json
pserver.use(express.json())

// using the router
pserver.use(router);
pserver.use('/uploads',express.static('./uploads'))


// setting the port

const PORT=4000|| process.env.PORT

// listening for connection
pserver.listen(PORT,()=>{
    console.log(`pf server created at port ${PORT}`);
})

pserver.get('/',(req,res)=>{
   res.send('get request updated');
})