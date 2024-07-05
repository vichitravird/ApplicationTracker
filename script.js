function appTracker() {
    window.open('https://forms.gle/ttuHEVi725RMhQf17', '_blank'); // Opens the link in a new tab
}

function intTracker() {
    window.open('https://forms.gle/AhMQkJ1uVHbgBNVn8', '_blank'); // Opens the link in a new tab
}

function analysisTracker() {
    window.open('https://docs.google.com/spreadsheets/d/1TY0G_WjYtZ6YSbRNkN-LVqnd8U-HffYGzCgH54CZCAo/edit?usp=sharing', '_blank'); // Opens the link in a new tab
}

function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    document.getElementById('datetime').textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call to display the time immediately


let CLIENT_ID = '783859032251-2ogml8ei5t6vic0i5cuk6qklnrrn7cr9.apps.googleusercontent.com';
let API_KEY = 'AIzaSyDGg_nrxL8FYBQtk7EK5_1wGurAW-P3Kjg';
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
let SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    document.getElementById('authorize_button').onclick = handleAuthClick;
    document.getElementById('signout_button').onclick = handleSignoutClick;
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    listFiles();
    document.getElementById('authorize_button').style.display = 'none';
    document.getElementById('signout_button').style.display = 'block';
  } else {
    document.getElementById('authorize_button').style.display = 'block';
    document.getElementById('signout_button').style.display = 'none';
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function listFiles() {
  gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': "nextPageToken, files(id, name)"
  }).then((response) => {
    let files = response.result.files;
    if (files && files.length > 0) {
      let content = 'Files:';
      files.forEach((file) => {
        content += `<br>${file.name} (${file.id}) <button onclick="downloadFile('${file.id}')">Download</button>`;
      });
      document.getElementById('content').innerHTML = content;
    } else {
      document.getElementById('content').innerHTML = 'No files found.';
    }
  });
}

function downloadFile(fileId) {
  gapi.client.drive.files.get({
    fileId: fileId,
    alt: 'media'
  }).then((response) => {
    let blob = new Blob([response.body], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'file.xlsx';
    a.click();
  });
}

handleClientLoad();
