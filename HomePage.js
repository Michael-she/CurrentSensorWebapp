

const filePath = path.join(__dirname, 'landingPage.html');
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
    });



