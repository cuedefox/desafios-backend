import express, { urlencoded } from "express";
import router from "./routes/index.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(urlencoded({extended: true}));


app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})