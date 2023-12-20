function getData(id){


    fetch('/getReadingsByID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
        
        
    })
    .then(response => response.json())
    .then(data => {
        
       
        return data;


    })
    .catch((error) => {
        alert("Sorry, an error occoured, if you see this screen, you shouldn't. Congrats?")
        console.error('Error:', error);
    });




}