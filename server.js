import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req,res) =>{
    res.render("index.ejs", {shops: null, city:""});
});



app.post("/search", async (req,res) =>{
    const city = req.body.city;

    try{
        const result = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}`);
        res.render("index.ejs", {shops: result.data, city});
    } catch (error){
        console.error("Error fetching shops:", error);
        res.render("index", { shops: [], city });
    }
});


app.listen(port, () =>{
    console.log(`Listening On Port : ${3000}`);
});