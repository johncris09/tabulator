import express from "express"
import cors from "cors"
import monitorRoute from "./routes/Monitor.js"
import auditionRoute from "./routes/Audition.js"
import talentPresentationRoute from "./routes/TalentPresentation.js"
import productionNumberRoute from "./routes/ProductionNumber.js"
import productionAttireRoute from "./routes/ProductionAttire.js"
import swimWearRoute from "./routes/SwimWear.js"
import eveningGownRoute from "./routes/EveningGown.js"
import topFiveRoute from "./routes/TopFive.js"
import finalRoundRoute from "./routes/FinalRound.js"
import candidateRoute from "./routes/Candidate.js"
import settingsRoute from "./routes/Settings.js"
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
app.use("/audition",  auditionRoute);
app.use("/talent_presentation",  talentPresentationRoute);
app.use("/production_number",  productionNumberRoute);
app.use("/production_attire",  productionAttireRoute);
app.use("/swim_wear",  swimWearRoute);
app.use("/evening_gown",  eveningGownRoute);
app.use("/top_five",  topFiveRoute);
app.use("/final_round",  finalRoundRoute);
app.use("/settings",  settingsRoute);
app.use("/monitor",  monitorRoute);


app.get('/', (req, res) => {
    res.send("Welcome to the Server")
})
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
})
