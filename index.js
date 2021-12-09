const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const path = require('path');
const fs = require('fs');

'use strict';

const url = 'mongodb+srv://abecc:tortilla@cluster0.mpjye.mongodb.net/Platformer?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'Platformer'
const db = client.db(dbName);
const collection = db.collection('Users');

const app = express();

const urlEncodedParser = express.urlencoded({
    extended: false
});
app.use(express.static(path.join(__dirname, '/public')));
app.use('/game',express.static(path.join(__dirname, '/public')));
app.use('/game',express.static(path.join(__dirname, '/Game')));
app.use('/game',express.static(path.join(__dirname, '/Data')));

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//sendGameFiles


////////


app.get("/home"||"/game/home", (req,res) => {
    res.sendFile(path.join(__dirname, '/home.html'));
});



app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, '/login.html'));
});

app.get("/death", (req,res) => {
    res.sendFile(path.join(__dirname, '/death.html'));
});

app.get("/game/death", (req,res) => {
    res.sendFile(path.join(__dirname, '/death.html'));
});

app.get("/game", (req,res) => {
    res.sendFile(path.join(__dirname, '/game.html'))
});
app.get("/login/:username/:password", urlEncodedParser , async (req,res) => {
    await client.connect();
    const userResults = await collection.find({username: req.params.username}).toArray()
    client.close();
    console.log(userResults[0].password);
    if(userResults[0].password == req.params.password) {
        res.json({match:true});
    }else {
        res.json({match:false});
    }
    console.log(userResults);
    console.log(userResults[0].password);
    console.log(req.params.password);
});

app.get('/world/:id', async (req,res) => {
    let rawdata = fs.readFileSync(`Worlds/world${req.params.id}.json`);
    let world = JSON.parse(rawdata);
    res.json(world);
});



app.listen(process.env.PORT || 3000);