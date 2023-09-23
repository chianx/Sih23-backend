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
    res.send({status : "200", msg:"Job addes successfully"})
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

app.get("/", (req, res) => {
    res.send("The Sited is up and runnig, There is no Get /");
})

app.listen(process.env.PORT ||3000, function() {
    console.log("Server is running on port 3000");
});