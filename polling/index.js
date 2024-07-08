const app = require("express")();
const jobs = {}
app.post("/submit",(req,res) =>{
    const jobId = `job: ${Date.now()}`
    jobs[jobId] = 0;
    updateJob(jobId, 0)
    res.end("\n\n"+ jobId + "\n\n")
})

app.get("/checkoutstatus", (req,res)=>{
    console.log(jobs[req.query.jobId])
    console.log(req.query.jobId)
res.end("\n\n Job status: " + jobs[req.query.jobId] + "%\n\n")
})

app.listen(8080, ()=>{console.log("server in 8080")})


function updateJob(jobId, initialState){
    jobs[jobId] = initialState
if(initialState == 100) return
    this.setTimeout(() => {
        updateJob(jobId, initialState + 20)
    }, 3000);
}