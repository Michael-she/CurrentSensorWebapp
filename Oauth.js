function handleCredentialResponse(response) {
    // Parse the ID token (JWT) to get user information
    const data = parseJwt(response.credential);

    console.log('User signed in:');
    console.log('ID: ' + data.sub);
    console.log('Full Name: ' + data.name);
    console.log('Given Name: ' + data.given_name);
    console.log('Family Name: ' + data.family_name);
    console.log('Image URL: ' + data.picture);
    console.log('Email: ' + data.email);
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
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" }  // customization attributes
    );

    document.getElementById('signout-button').onclick = signOut;
};
