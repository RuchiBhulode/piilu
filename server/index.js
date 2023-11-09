const http=require('http');
const express=require('express');
const cors=require('cors');
const socketIO=require("socket.io");
const app=express();


const port=4500 || process.env.PORT;
const users=[{}];
app.use(cors());
app.get("/",(req,res)=>{
    res.send("i am working ");
})
const server=http.createServer(app);

const io=socketIO(server);
io.on("connection",(socket)=>
{
    console.log("New Connection");

    socket.on('joined', ({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('pillu',{user:"Admin",message: `${users[socket.id]} has joined`});
        
    socket.emit('ruppa' , {user: "Admin" , message: `Welcome to the chat, ${users[socket.id]}`})
    })

    socket.on('message', ({ message, id }) => {
       // console.log('Received mess:', user, mess, id);
        io.emit('sendMess', { user:users[id], message, id });
      });
      
      


socket.on('discon',()=>{
    socket.broadcast.emit('leo',{user:"Admin", message:`${users[socket.id]} has left`});
    console.log('USer left');
})

});
server.listen(port,()=>{
    console.log(`server is working on ${port}`);
})