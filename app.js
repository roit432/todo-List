const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
let works=[
    
        {
            id: uuidv4(),
            username:"Rohit Sonkar",
            taskname: "MERN App",
            priority: "High",
            status: "Pending",
            due: "03/02/2025",
            action: "On Work"
        },
        {
            id:uuidv4(),
            username:"Ankit",
            taskname: "MEAN App",
            priority: "Low",
            status: "Completed",
            due: "01/01/2026",
            action: "Done"
        },
        {
            id:uuidv4(),
            username:"Subham",
            taskname: "React Dashboard",
            priority: "Medium",
            status: "In Progress",
            due: "04/10/2025",
            action: "Developing UI"
        },
        {
            id: uuidv4(),
            username:"Ravi",
            taskname: "Node.js API",
            priority: "High",
            status: "Pending",
            due: "05/15/2025",
            action: "Writing Endpoints"
        },
        {
            id:uuidv4(),
            username:"Bablu",
            taskname: "MongoDB Setup",
            priority: "High",
            status: "Completed",
            due: "02/20/2025",
            action: "Database Ready"
        },
        {
            id: uuidv4(),
            username:"Moni",
            taskname: "JWT Authentication",
            priority: "High",
            status: "Pending",
            due: "06/01/2025",
            action: "Implementing Security"
        },
        {
            id:uuidv4(),
            username:"Raman",
            taskname: "Frontend Deployment",
            priority: "Medium",
            status: "In Progress",
            due: "07/15/2025",
            action: "Testing on Vercel"
        },
        {
            id: uuidv4(),
            username:"Deva",
            taskname: "Bug Fixing",
            priority: "High",
            status: "Pending",
            due: "08/05/2025",
            action: "Reviewing Code"
        },
        {
            id: uuidv4(),
            username:"Aman",
            taskname: "Documentation",
            priority: "Low",
            status: "Pending",
            due: "09/10/2025",
            action: "Writing Docs"
        },
        {
            id: uuidv4(),
            username:"Shivani",
            taskname: "Client Demo",
            priority: "High",
            status: "Upcoming",
            due: "10/05/2025",
            action: "Preparing Slides"
        }
    
    
]

app.get("/works",(req,res)=>{
    console.log(works);
 res.render("index.ejs",{works});
});

app.get("/works/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/works",(req,res)=>{
    let{username,taskname,priority,status,due,action}=req.body;
    let id=uuidv4();
    
    works.push({id,username,taskname,priority,status,due,action});
    console.log(works);
    res.redirect("/works");
});
app.get("/works/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
     let  work=works.find((w)=> id==w.id);
    console.log(work);
    res.render("show.ejs",{work});
});
app.patch("/works/:id",(req,res)=>{
    let {id}=req.params;
    id=parseInt(id);
   
    let {newpriority,newstatus,newdue,newaction}=req.body;


   
    let  work=works.find((w)=> w.id==id);
    work.priority= newpriority || work.priority;
    work.status=newstatus ||work.status;
    work.due=newdue || work.due;
    work.action=newaction || work.action;
    console.log(id);
    console.log(work);
    res.redirect("/works");
});
app.get("/works/:id/edit",(req,res)=>{
    let {id}=req.params;
    let work=works.find((w)=> id==w.id);
    console.log(work);
    res.render("edit.ejs",{work});
    
})
app.delete("/works/:id",(req,res)=>{
    let {id}=req.params;
     works=works.filter((w)=> id!==w.id);
    
    res.redirect("/works");

})
app.listen(port,(req,res)=>{
    console.log(`server port is listening${port}`);
});