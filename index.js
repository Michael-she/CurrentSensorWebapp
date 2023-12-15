


const express = require('express');
const app = express();
const port = 3000;



// Middleware to parse JSON body in POST requests
//app.use(express.json());

// GET request handler
app.get('/landingPage', (req, res) => {

    const filePath = path.join(__dirname, 'landingPage.html');
    res.sendFile(filePath);
});

app.get('/', (req, res) => {
    console.log("Default endpoint reached");
res.redirect("/landingPage");

})


app.get('/', (req, res) => {
    console.log("Default endpoint reached");
res.redirect("/landingPage");

})


// POST request handler
app.post('/data', (req, res) => {
    const data = req.body;
    // Process the data here
    res.json({
        message: 'Data received successfully',
        receivedData: data
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
