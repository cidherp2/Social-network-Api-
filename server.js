const express = require('express');
const dataBase = require('./config/connection');
const path = require('path');
const route = require("./routes")

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use(express.static(path.join(__dirname,'./routes')));
app.use(route);



dataBase.once("open" ,() => {
    app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`))
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './db.json'));
    //res.send("Hola!")
})