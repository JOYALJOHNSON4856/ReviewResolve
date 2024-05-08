const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log('mongodb atlas connected with pfserver');
}).catch((err)=>{
    console.log(`gggghg ${err}`);
})