function setCookie(name, value, daysToExpire) {
    var expires = "";
    if (daysToExpire) {
     var date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
     expires = "; expires=" + date.toUTCString();
     }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Function to get the value of a specific cookie by name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  



  function deleteCookie(name) {
    // Set the cookie with an expiry date in the past
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }