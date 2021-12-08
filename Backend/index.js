const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const fs = require('fs');

'use strict';

const url = 'mongodb+srv://abecc:tortilla@cluster0.mpjye.mongodb.net/Platformer?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'Platformer'
const db = client.db(dbName);
const enemyCollection = db.collection('Enemies');
const keyCollection = db.collection('Keys');

const app = express();

const urlEncodedParser = express.urlencoded({
    extended: false
});

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/world/:id', async (req,res) => {
    let rawdata = fs.readFileSync(`Worlds/world${req.params.id}.json`);
    let world = JSON.parse(rawdata);
    res.json(world);
});



app.listen(3000);