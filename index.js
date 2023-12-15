


const express = require('express');
const app = express();
const port = 3000;



// Middleware to parse JSON body in POST requests
//app.use(express.json());

// GET request handler
app.get('/hello', (req, res) => {
    res.send('Hello, world!');
});

app.get('/', (req, res) => {
    console.log("Default endpoint reached");
res.send("Default");

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
