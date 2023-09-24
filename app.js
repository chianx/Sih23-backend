import express from  "express";
import cors from "cors";
import helmet from "helmet";
import {db} from "./firebaseConfig/config.js"
import {ref, onValue, set, update, get, remove, push} from "firebase/database";

const app = express();
app.use(express.json())
app.use(cors())
app.use(helmet())

app.post("/job", (req, res) => {
    const body = req.body;
    var jobRef = push(ref(db, "jobs"));
    const job = {...body, jobId: jobRef.key};
    set(jobRef, job).then (async() => {
        console.log("Job posted sucessfully");
    });
    res.send({status : "200", msg:"Job added successfully"})
})

app.post("/course", (req, res) => {
    const body = req.body;
    var courseRef = push(ref(db, "courses"));
    const course = {...body, courseId: courseRef.key};
    set(courseRef, course).then (async() => {
        console.log("Course posted sucessfully");
    });
    res.send({status : "200", msg:"Course added successfully"})
})

app.get("/allJobs", (req, res) => {
    
    var jobRef = (ref(db, "jobs/"));
    onValue(jobRef, async(snapshot) => {
        const data = snapshot.val() != null ? snapshot.val() : [] ;
        const allJobs = Object.keys(data).map(key => ({
            ...data[key]
        })).reverse()
        res.send(allJobs);
    })
})

app.get("/allCourse", (req, res) => {
    
    var courseRef = (ref(db, "courses/"));
    onValue(courseRef, async(snapshot) => {
        const data = snapshot.val() != null ? snapshot.val() : [] ;
        const allCourse = Object.keys(data).map(key => ({
            ...data[key]
        })).reverse()
        res.send(allCourse);
    })
})

app.post("/contact", (req, res) => {
    const body = req.body;
    var contactRef = push(ref(db, "contact"));
    const temp = {...body};
    set(contactRef, temp).then (async() => {
        console.log("Contact posted sucessfully");
    });
    res.send({status : "200", msg:"Contact Us info added successfully"})
})

app.post("/register", (req, res) => {
    const body = req.body;
    var registerRef = push(ref(db, "users"));
    const temp = {...body, userId : registerRef.key};
    set(registerRef, temp).then (async() => {
        console.log("User Registered");
    });
    res.send({status : "200", msg:"User added successfully", userId : registerRef.key})
})

app.get("/getUser" , (req, res) => {
    const body = req.body;
    const uid = body.userId + "";
    var userRef = (ref(db, "users/" + uid));
    onValue(userRef, async(snapshot) => {
        const data = snapshot.val() != null ? snapshot.val() : "" ;
        if(data === "") {
            res.send({status: 200, msg: "User Not found"})
        }else {
            res.send(data);
        }
    })
})

app.get("/", (req, res) => {
    res.send("The Sited is up and runnig, There is no Get /");
})
// https://sih23-backend.vercel.app/
app.listen(process.env.PORT ||3000, function() {
    console.log("Server is running on port 3000");
});