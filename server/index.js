import express from "express"
import cors from "cors"
import talentPresentationRoute from "./routes/TalentPresentation.js"
import candidateRoute from "./routes/Candidate.js"
import loginRoute from "./routes/Login.js"
import userRoute from "./routes/Users.js"
const PORT = 3001 
const app = express() 

// middleware for server
app.use(express.json())
app.use(cors()) 


app.use("/login",  loginRoute);
app.use("/users",  userRoute);
app.use("/candidate",  candidateRoute);
app.use("/talent_presentation",  talentPresentationRoute);

app.get('/', (req, res) => {
    res.send("Weclome to the Server")
})
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
})
