function initGoogleAuth() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: '930951827083-n1o33l388o9ulb1acs0onsgdc6og2999.apps.googleusercontent.com'
        }).then(function(auth2) {
            console.log('Google Auth initialized');
            updateSigninStatus(auth2.isSignedIn.get());
            auth2.isSignedIn.listen(updateSigninStatus);
        });
    });
}

function signIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function(googleUser) {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    });
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        updateSigninStatus(false);
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById('signin-button').style.display = 'none';
        document.getElementById('signout-button').style.display = 'block';
    } else {
        document.getElementById('signin-button').style.display = 'block';
        document.getElementById('signout-button').style.display = 'none';
    }
}

document.getElementById('signin-button').onclick = signIn;
document.getElementById('signout-button').onclick = signOut;

initGoogleAuth();
