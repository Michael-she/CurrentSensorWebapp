

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

const JWT_SECRET = process.env.JWT_SECRET;

const connection = mysql.createConnection(process.env.DATABASE_URL); // Gets the URL of the database from the PlanetScale envyroment variable, allowing the connection to be made while keeping the secret key a secret
connection.connect(); // Initializes connection to the PlanetScale API.




const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'gebzznhHigFSBkwUKZu5YRQYAOx5iDajNFn_XbEKLC7zE3j95tgeikkyXxKV3oBh',
    baseURL: 'https://current-sensor-webapp.vercel.app',
    clientID: 'qJ8ZmMPsWiTnx3o29mhFmljgzTsaDxP9',
    routes: {
        // Override the default login route to use your own login route as shown below
        login: false,
        // Pass a custom path to redirect users to a different
        // path after logout.
        
        // Override the default callback route to use your own callback route as shown below
    },
    issuerBaseURL: 'https://dev-feweogch7uuhq23l.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));




//COOKIES!

const cookieParser = require('cookie-parser');


app.use(cookieParser());


// req.isAuthenticated is provided from the auth router
app.get('/amLoggedIn', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});



const { requiresAuth } = require('express-openid-connect');



app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});


var deviceIDs = [];
var readingsCache = [];


startUp();



// GET request handler


app.get('/dashboard', (req, res) => {
    
    const filePath = path.join(__dirname, 'landingPage.html');
    console.log(filePath);
    res.sendFile(filePath);
    
    
});

app.get('/chartTest', (req, res) => {
    
    const filePath = path.join(__dirname, 'ChartTest.html');
    //console.log(filePath);
    res.sendFile(filePath);
    
    
});

app.post('/dashboard', (req, res) => {
    
    const filePath = path.join(__dirname, 'landingPage.html');
    //console.log(filePath);
    res.sendFile(filePath);
    
    
});

app.get('/VirtaulDevicePage', (req, res) => {
    
    const filePath = path.join(__dirname, 'VirtaulDevicePage.html');
    // console.log(filePath);
    res.sendFile(filePath);
    
    
    
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


app.get('/CookieManager.js', (req, res) => {
    
    const filePath = path.join(__dirname, 'CookieManager.js');
    // console.log(filePath);
    res.sendFile(filePath);
});

app.get('/InputValidation.js', (req, res) => {
    
    const filePath = path.join(__dirname, 'InputValidation.js');
    //console.log(filePath);
    res.sendFile(filePath);
});


app.get('/login', (req, res) => {
    res.oidc.login({
        returnTo: '/dashboard',
        authorizationParams: {
            redirect_uri: 'https://current-sensor-webapp.vercel.app/callback',
        },
    })
    
})
app.get('/signup', (req, res) => {
    console.log("Default endpoint reached");
    
    res.redirect("/auth");
    
})


app.get('/auth', (req, res) => {
    
    const filePath = path.join(__dirname, 'signupPage.html');
    //console.log(filePath);
    res.redirect("/login");
});


app.get('/', (req, res) => {
    console.log("Default endpoint reached");
    
    res.redirect("/auth");
    
})





app.get('/getReadings', (req, res) => {
    
    res.send(readingsCache);
    
})


app.post('/getReadingsByID', (req, res) => {
    
const {id} = req.body



const sql = `SELECT reading, readingMax, readingMin, dateRecieved FROM IOTReadings WHERE ID='${id}';`

console.log(sql);

connection.query(sql, function (err, rows, fields) { //Execute the SQL query
    if (err) {
        // console.log(err);
        throw (err); //If an error occours, throw the error to prevent the program from crashing
    }
    
    // console.log(rows)
    
    res.send(rows);
});
    
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

app.post('/checkOauth', (req, res) => {
    
    console.log(req.body)
    
    const {id} = req.body;
    
    
    
    
    
    const sql = `SELECT * FROM  IOTUsers WHERE ID = '${id}';`
    //console.log(sql)
    
    
    
    connection.query(sql, function (err, rows, fields) { //Execute the SQL query
        if (err) {
            console.log(err);
            res.json({
                
                state: -1
            });
        }
        
        if(rows.length == 1){
            
            
            
            
            
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

app.get('/allDevices', (req, res) => {
    
    const sql = `SELECT ID FROM  IOTDevices;`
    //console.log(sql)
    
    
    
    connection.query(sql, function (err, rows, fields) { //Execute the SQL query
        if (err) {
            console.log(err);
            res.json({
                
                state: -1
            });
        }
        res.send(rows)
        
    })
    
    
});

app.get('/allCachedDevices', (req, res) => {
    
    
    //console.log(sql)
    
    
    
    res.send(deviceIDs);
    
    
});




app.post('/inputCSV', (req, res) => {
    console.log("CSV DATA!");
    const csvData = req.body;
    
    console.log(csvData);
    
    
    const dataArr=csvData.split(",");
    
    
    const id = dataArr[0];
    const reading = dataArr[1];
    const readingMax = dataArr[2];
    const readingMin = dataArr[3];
    
    
    updateReadingsCache(id, reading, readingMax, readingMin);
    
    
    const currentDate = new Date();
    // Pad the month and day with a leading zero if they are less than 10
    const dateNow = currentDate.getFullYear() + '-' +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getDate()).slice(-2);
    
    const timeNow = currentDate.getHours() + '-' +
    ('0' + (currentDate.getMinutes() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getSeconds()).slice(-2);
    
    const dateTimeNow = dateNow +" "+timeNow;
    
    
    
    if(deviceIDs.includes(id)){
        
        const sql = `INSERT INTO IOTReadings (ID, reading, dateRecieved, readingMax, readingMin) VALUES ('${id}', '${reading}', '${dateTimeNow}', '${readingMax}', '${readingMin}');`
        
        
        //console.log(sql)
        
        connection.query(sql, function (err, rows, fields) { //Execute the SQL query
            if (err) {
                console.log(err);
                
            }
        });
        
        // Process the data here
        
        
    }else{
        deviceIDs[deviceIDs.length] = id;
        const lat = 0, long = 0;
        
        console.log("The dark path - DEVICE NOT RECOCNISED");
        
        const sql = `INSERT INTO IOTDevices (ID, LastContacted, DateAdded, latitude, longitude) VALUES ('${id}', '${dateTimeNow}', '${dateTimeNow}', '${lat}', '${long}');`
        
        
        console.log(sql)
        
        connection.query(sql, function (err, rows, fields) { //Execute the SQL query
            if (err) {
                console.log(err);
                
            }
        });
        
        const sql2 = `INSERT INTO IOTReadings (ID, reading, dateRecieved, readingMax, readingMin) VALUES ('${id}', '${reading}', '${dateTimeNow}', '${readingMax}', '${readingMin});`
        
        
        //console.log(sql)
        
        connection.query(sql2, function (err, rows, fields) { //Execute the SQL query
            if (err) {
                console.log(err);
                
            }
        });
        
    }
    
    
    
    
    res.json({
        
        ack: 0
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
    
    res.redirect("/dashboard");
    
    
    
    
})





// Start the server
app.listen(port, () => {
    //console.log(process.env.DATABASE_URL)
    console.log(`Server is running on http://localhost:${port}`);
});

function updateReadingsCache(id, reading, readingMax, readingMin){
    
    let chacheHit = false;
    
    for(let i = 0; i <readingsCache.length; i++){
        if(readingsCache[i].ID == id){
            
            readingsCache[i].reading = reading;
            readingsCache[i].readingMax = readingMax;
            readingsCache[i].readingMin = readingMin;
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
            readingMax: readingMax, 
            readingMin: readingMin,
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