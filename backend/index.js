import express from 'express';
import cors from 'cors';
import {connectDB} from './config.js';
import mainRoute from './routes/index.js';

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/v1',mainRoute);

app.get('/ping',(req,res)=>{
    res.send("Active");
});

const startServer=async()=>{
    await connectDB()
    app.listen(3000, () => {
       console.log("Server is working on port 3000");
    })
}

startServer();