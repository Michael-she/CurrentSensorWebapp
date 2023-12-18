function handleCredentialResponse(response) {
    // Parse the ID token (JWT) to get user information
    const gdata = parseJwt(response.credential);

    console.log('User signed in:');
   /* console.log('ID: ' + gdata.sub);
    console.log('Full Name: ' + gdata.name);
    console.log('Given Name: ' + gdata.given_name);
    console.log('Family Name: ' + gdata.family_name);
    console.log('Image URL: ' + gdata.picture);
    console.log('Email: ' + gdata.email);*/

    setID(gdata.sub);

    const postData = {
        id: gdata.sub,
        
    }

    
    document.getElementById("username").value = gdata.name;
    document.getElementById("email").value = gdata.email;

    console.log("DATA TO BE POSTED:")
    console.log(postData)
    
    fetch('/checkOauth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
        
        
    })
    .then(response => response.json())
    .then(response => {
        
        if(response.state == 0){
            console.log("login");
            window.location.href = "/landingPage"
            
        }
        if(response.state == 1){
            console.log("attempting to set values")
            console.log(gdata.name);
           
            
        }
    })
    .catch((error) => {
        alert("Sorry, an error occoured, if you see this screen, you shouldn't. Congrats?")
        console.error('Error:', error);
    });






    
      
    
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function signOut() {
    // To sign out, you need to remove the Google session
    // This can be done by redirecting the user to a URL or by JavaScript
    console.log('User signed out.');
    // Implement sign-out functionality as needed
}

window.onload = function() {
    google.accounts.id.initialize({
        client_id: '930951827083-n1o33l388o9ulb1acs0onsgdc6og2999.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { theme: 'outline', size: 'large' } // Customize button appearance
    );
};