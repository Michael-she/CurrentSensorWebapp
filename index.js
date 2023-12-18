

const bodyParser = require('body-parser'); // Import the body-parser library for parsing incoming JSON data

const express = require('express'); // Express is the basis of all of these apps
const app = express();
const port = 3000;
const path = require('path'); // Import the path module for working with file paths

const mysql = require('mysql2'); //Package for mySQL
const { time } = require('console');

require('dotenv').config(); //package to use the ENV file
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true })); // Set up middleware to parse incoming requests as JSON
app.use(bodyParser.json());

const csvParser = require('csv-parser');

// Middleware to parse JSON body in POST requests
//app.use(express.json());



const connection = mysql.createConnection(process.env.DATABASE_URL); // Gets the URL of the database from the PlanetScale envyroment variable, allowing the connection to be made while keeping the secret key a secret
connection.connect(); // Initializes connection to the PlanetScale API.

const session = require('express-session');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // allows requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(session({
    secret: '967980912346',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge:60000000, secure: true }
}));


var deviceIDs = [];
var readingsCache = [];


startUp();



// GET request handler
app.get('/landingPage', (req, res) => {
    console.log(req.session.userID)
    if(req.session.userID){
    const filePath = path.join(__dirname, 'landingPage.html');
    //console.log(filePath);
    res.sendFile(filePath);

    }else{
        res.redirect("/auth");
    }
});

app.get('/VirtaulDevicePage', (req, res) => {
    if(req.session.userID){
    const filePath = path.join(__dirname, 'VirtaulDevicePage.html');
    // console.log(filePath);
    res.sendFile(filePath);

}else{
    res.redirect("/auth");
}
});




app.get('/OauthTest', (req, res) => {
    
    const filePath = path.join(__dirname, 'OauthTest.html');
    // console.log(filePath);
    res.sendFile(filePath);
});
app.get('/Oauth.js', (req, res) => {
    
    const filePath = path.join(__dirname, 'Oauth.js');
    // console.log(filePath);
    res.sendFile(filePath);
});


app.get('/InputValidation.js', (req, res) => {
    
    const filePath = path.join(__dirname, 'InputValidation.js');
    //console.log(filePath);
    res.sendFile(filePath);
});


app.get('/login', (req, res) => {
    console.log("Default endpoint reached");
    
    res.redirect("/auth");
    
})
app.get('/signup', (req, res) => {
    console.log("Default endpoint reached");
    
    res.redirect("/auth");
    
})


app.get('/auth', (req, res) => {
    
    const filePath = path.join(__dirname, 'signupPage.html');
    //console.log(filePath);
    res.sendFile(filePath);
});


app.get('/', (req, res) => {
    console.log("Default endpoint reached");
    
    res.redirect("/auth");
    
})





app.get('/getReadings', (req, res) => {
    
    res.send(readingsCache);
    
})


app.post('/saveUser', (req, res) => {
    
    const currentDate = new Date();
    // Pad the month and day with a leading zero if they are less than 10
    const dateNow = currentDate.getFullYear() + '-' +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getDate()).slice(-2);
    
    const timeNow = currentDate.getHours() + '-' +
    ('0' + (currentDate.getMinutes() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getSeconds()).slice(-2);
    
    const dateTimeNow = dateNow +" "+timeNow;

    console.log(req.body)
    
    let {id, username, password, email, phone} = req.body;
    
    if(id== null){

        id = Math.floor(Math.random() * 999999999999999) + 1;

    }



    const sql = `INSERT INTO IOTUsers (id, userName, password, email, phone, dateCreated, admin) VALUES ("${id}", "${username}", "${password}", "${email}", '${phone}', '${dateTimeNow}', false);`
    
    connection.query(sql, function (err, rows, fields) { //Execute the SQL query
        if (err) {
            console.log(err);
            res.json({
            
                ack: 1
            });
        }


        res.json({
            
            state: 0
        });
    });
    



})



app.post('/authUser', (req, res) => {
    
    
    

    console.log(req.body)
    
    let {fName, password, rememberMe} = req.body;
    
  



    const sql = `SELECT * FROM  IOTUsers WHERE username = "${fName}" AND password = "${password}";`
    //console.log(sql)

    
    
    connection.query(sql, function (err, rows, fields) { //Execute the SQL query
        if (err) {
            console.log(err);
            res.json({
            
                state: -1
            });
        }
        
        if(rows.length == 1){
            req.session.userID = rows[0].ID;
            console.log(req.session.userID);
            if(rememberMe){
                console.log("rembebred for a while");

                req.session.cookie.maxAge= 31 * 24 * 60 * 60 * 1000*3;
            }

            res.json({
            
                state: 0
            });
           

        }else{
            console.log(rows.length);
            res.json({
            
                state: 1
            });
        }
        
    });
    



})

// POST request handler
app.post('/input', (req, res) => {
    
    console.log("INPUT")
    
    // console.log(req.body);
    
    const {id, reading} = req.body;
    
    updateReadingsCache(id, reading);
    
    console.log(reading);
    console.log(id);
    const currentDate = new Date();
    
    // Pad the month and day with a leading zero if they are less than 10
    const dateNow = currentDate.getFullYear() + '-' +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getDate()).slice(-2);
    
    const timeNow = currentDate.getHours() + '-' +
    ('0' + (currentDate.getMinutes() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getSeconds()).slice(-2);
    
    const dateTimeNow = dateNow +" "+timeNow;
    
    
    
    if(deviceIDs.some(element => element == id)){
        
        const sql = `INSERT INTO IOTReadings (ID, reading, dateRecieved) VALUES ('${id}', '${reading}', '${dateTimeNow}');`
        
        
        //console.log(sql)
        
        connection.query(sql, function (err, rows, fields) { //Execute the SQL query
            if (err) {
                console.log(err);
                throw (err); //If an error occours, throw the error to prevent the program from crashing
            }
        });
        
        // Process the data here
        res.json({
            
            ack: 0
        });
        
    }else{
        deviceIDs[deviceIDs.length] = id;
        const lat = 0, long = 0;
        
        console.log("The dark path - DEVICE NOT RECOCNISED");
        
        const sql = `INSERT INTO IOTDevices (ID, LastContacted, DateAdded, latitude, longitude) VALUES ('${id}', '${dateTimeNow}', '${dateTimeNow}', '${lat}', '${long}');`
        
        
        console.log(sql)
        
        connection.query(sql, function (err, rows, fields) { //Execute the SQL query
            if (err) {
                console.log(err);
                throw (err); //If an error occours, throw the error to prevent the program from crashing
            }
        });
        
        
    }
});

app.post('/inputCSV', (req, res) => {
    console.log("CSV DATA!");
    const csvData = req.body;
    
    console.log(csvData);
    
    
    const dataArr=csvData.split(",");
    
    
    const id = dataArr[0];
    const reading = dataArr[1];
    
    updateReadingsCache(id, reading);
    
    
    const currentDate = new Date();
    // Pad the month and day with a leading zero if they are less than 10
    const dateNow = currentDate.getFullYear() + '-' +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getDate()).slice(-2);
    
    const timeNow = currentDate.getHours() + '-' +
    ('0' + (currentDate.getMinutes() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getSeconds()).slice(-2);
    
    const dateTimeNow = dateNow +" "+timeNow;
    
    
    
    if(deviceIDs.some(element => element == id)){
        
        const sql = `INSERT INTO IOTReadings (ID, reading, dateRecieved) VALUES ('${id}', '${reading}', '${dateTimeNow}');`
        
        
        //console.log(sql)
        
        connection.query(sql, function (err, rows, fields) { //Execute the SQL query
            if (err) {
                console.log(err);
                throw (err); //If an error occours, throw the error to prevent the program from crashing
            }
        });
        
        // Process the data here
        res.json({
            
            ack: 0
        });
        
    }else{
        deviceIDs[deviceIDs.length] = id;
        const lat = 0, long = 0;
        
        console.log("The dark path - DEVICE NOT RECOCNISED");
        
        const sql = `INSERT INTO IOTDevices (ID, LastContacted, DateAdded, latitude, longitude) VALUES ('${id}', '${dateTimeNow}', '${dateTimeNow}', '${lat}', '${long}');`
        
        
        console.log(sql)
        
        connection.query(sql, function (err, rows, fields) { //Execute the SQL query
            if (err) {
                console.log(err);
                throw (err); //If an error occours, throw the error to prevent the program from crashing
            }
        });
        
        
    }
    
    
    
    
    res.json({
        
        ack: 0
    });
    
    
    
});

app.post('/saveVirtualDevice', (req, res) => {
    
    const {id} = req.body;
    
    console.log(id);
    
    const lat = 0, long = 0;
    
    
    const currentDate = new Date();
    
    // Pad the month and day with a leading zero if they are less than 10
    const dateNow = currentDate.getFullYear() + '-' +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getDate()).slice(-2);
    
    const timeNow = currentDate.getHours() + '-' +
    ('0' + (currentDate.getMinutes() )).slice(-2) + '-' +
    ('0' + currentDate.getSeconds()).slice(-2);
    
    const dateTimeNow = dateNow +" "+timeNow;
    
    
    deviceIDs[deviceIDs.length] = id;
    
    
    //console.log(dateNow)
    
    const sql = `INSERT INTO IOTDevices (ID, LastContacted, DateAdded, latitude, longitude) VALUES ('${id}', '${dateTimeNow}', '${dateTimeNow}', '${lat}', '${long}');`
    
    
    // console.log(sql)
    
    connection.query(sql, function (err, rows, fields) { //Execute the SQL query
        if (err) {
            //console.log(err);
            throw (err); //If an error occours, throw the error to prevent the program from crashing
        }
    });
    
});


app.get('/getIOTDevices', (req, res) => {
    
    const sql = `SELECT * FROM IOTDevices;`
    
    
    //console.log(sql)
    
    connection.query(sql, function (err, rows, fields) { //Execute the SQL query
        if (err) {
            // console.log(err);
            throw (err); //If an error occours, throw the error to prevent the program from crashing
        }
        
        // console.log(rows)
        
        res.send(rows);
    });
    
    
    
    
    
})


app.get('/refreshCache', (req, res) => {
    
    startUp();
    
    res.redirect("/landingPage");
    
    
    
    
})


// Start the server
app.listen(port, () => {
    //console.log(process.env.DATABASE_URL)
    console.log(`Server is running on http://localhost:${port}`);
});

function updateReadingsCache(id, reading){
    
    let chacheHit = false;
    
    for(let i = 0; i <readingsCache.length; i++){
        if(readingsCache[i].ID == id){
            
            readingsCache[i].reading = reading;
            
            chacheHit = true;
            const currentDate = new Date();
            
            // Pad the month and day with a leading zero if they are less than 10
            
            
            readingsCache[i].dateRecieved = currentDate;
            //console.log("CACHE HIT")
        }
        
        
        
        
    }
    
    
    
    if(!chacheHit){
        // console.log("NO CACHE HIT")
        
        
        chacheHit = true;
        const currentDate = new Date();
        
        
        
        readingsCache[readingsCache.length]={
            ID: id,
            reading: reading,
            dateRecieved: currentDate
        } ;
        
        
    }
    
}



function startUp(){
    
    const sql = `SELECT * FROM IOTDevices;`
    
    
    // console.log(sql)
    
    connection.query(sql, function (err, rows, fields) { //Execute the SQL query
        if (err) {
            console.log(err);
            throw (err); //If an error occours, throw the error to prevent the program from crashing
        }
        
        //console.log(rows)
        
        for(let i  = 0 ; i<rows.length; i++){
            
            deviceIDs[i] = rows[i].ID;
            
            
            
        }
        
        // console.log(deviceIDs);
    });
    
    
    const sql2 = `SELECT * FROM IOTReadings WHERE dateRecieved IN (SELECT MAX(dateRecieved) as dateRecieved FROM IOTReadings GROUP BY ID);
    `
    
    
    
    // console.log(sql2)
    
    connection.query(sql2, function (err, rows, fields) { //Execute the SQL query
        if (err) {
            console.log(err);
            throw (err); //If an error occours, throw the error to prevent the program from crashing
        }
        
        //  console.log(rows)
        
        for(let i  = 0 ; i<rows.length; i++){
            
            readingsCache[i] = rows[i];
            
            
            
        }
        
        //  console.log(readingsCache);
    });
    
    
}