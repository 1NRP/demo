var t=`<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" sizes="192x192" href="https://1nrp.github.io/1/Images/N-Logo1.png">
    <meta charset="utf-8">
    <meta name="theme-color" content="#02121b">
    <title>Sign In</title>
  </head>
  <style>
    body {
      color: #fff;
      background-color: #02121b;
    }

    input:focus,
    textarea,
    select:focus {
      outline: 0;
    }

    #form-container {
      position: fixed;
      top: 30vh;
      left: 10vw;
      background-color: #456;
      box-shadow: 10px 10px 8px #789;
      padding: 20px;
      border-radius: 8px;
      width: 70vw;
      animation-name: Login;
      animation-duration: 2s;
    }
    #form-container input {
      outline: 0;
      color: #fff222;
    }
    #form-container h2 {
      text-align: center;
      color: #dde00b;
      font-size: 28px;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 600;
      margin: -15px 0px 10px 0px;
    }
    a4 {
      color: #d88;
      font-weight: 800;
    }
    #userId, #password {
      width: 90%;
      padding: 10px;
      background-color: #222;
      margin-bottom: 10px;
      border: 2px dashed #888;
      border-radius: 6px;
    }
    ::placeholder {
      font-weight: 600;
    }
    #form-container button {
      width: 96.2%;
      padding: 10px;
      border: 2px solid #ddd;
      font-weight: 600;
      background-color: #4caf50;
      color: #fff;
      border-radius: 4px;
    }
    .Alerts {
      position: fixed;
      /* top: 5dvh; */
      left: 20dvw;
      z-index: 50;
      color: #000;
      background-color: #fff;
      font-weight: 1000;
      padding: 5px;
      border: none;
      border-radius: 5px;
      animation-name: Alert;
      animation-duration: 1s;
    }
    #form-container button:hover {
      background-color: #4caf5099;
    }
    #logoutButton {
      position: fixed;
      top: 100px;
      right: 100px;
      background-color: #e63509;
      color: #fff;
      border: 2px solid #504949;
      padding: 10px;
      border-radius: 4px;
    }
    #logoutButton:hover {
      background-color: #d16a0999;
    }

    @keyframes Alert {
      from {
        font-size: 10px;
        top: 5dvh;
      }
      to {
        font-size: 25px;
        top: 10dvh;
      }
    }
    @keyframes Login {
      from {
        opacity: 0;
        top: 0vh;
      }
      to {
        opacity: 1;
        top: 30vh;
      }
    }
  </style>

  <body>
    <div id="form-container">
      <h2>Sign In</h2>
      <form id="loginForm">
        <input type="text" placeholder="Enter Valid Email" id="userId" required>
        <input type="password" placeholder="Enter Password" id="password" required>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
    <button id="logoutButton" onclick="Logout()" style="display: none">Sign Out</button>

    <script>
      // Show Alerts depending upon the response received.
      function showAlert(BgColor, Text) {
        var alertBox = document.createElement('div')
        alertBox.className = 'Alerts'
        alertBox.style.backgroundColor = BgColor
        alertBox.textContent = Text
        document.body.appendChild(alertBox)
        setTimeout(() => {
          alertBox.remove()
        }, 1000)
      }

      const form = document.getElementById('loginForm')
      form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const username = document.getElementById('userId').value
        const password = document.getElementById('password').value
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
        if (response.ok) {
          showAlert('#4CAF50', '\u2714 Login Successful')
          setTimeout(() => {
            globalThis.location.href = '/'
          }, 1000)
        } else {
          const errorMessage = await response.json()
          showAlert('#f44336', errorMessage.message)
          console.log('Error: ', errorMessage)
        }
      })

      async function Logout() {
        const permission = confirm('Are You Sure You Want To Logout ?')
        if (!permission) return

        const response = await fetch('/logout')

        if (response.status === 200) {
          showAlert('#4CAF50', '\u2716 Logged Out')
        } else if (response.status === 401) {
          showAlert('#f44336', '\u26A0 Login First')
        } else {
          showAlert('#f44336', 'Something Went Wrong')
        }
      }
    <\/script>
  </body>
</html>
`;var n=`<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" sizes="192x192" href="https://1nrp.github.io/1/Images/N-Logo1.png">
  <meta charset="utf-8">
  <title>Websites</title>
<style>
  body {
    color: #fff;
    background-color: #010b14;
  }
  a:link, a {
    background-color: #044d5f;
    color: #c6e3e6;
    font-family: arial, sans-serif;
    font-size: 20px;
    font-weight: 1000;
    padding: 4px 20px 5px 20px;
    border-radius: 6px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    }
    a:hover {
      background-color: #0b4b4b64;
    }
    h2 {
      color: #dd4d0a;
      font-size: 30px;
      font-weight: 300;
      font-family: fantasy, arial, sans-serif;
    }
</style>
</head>

<body>
  
<center>
    
    <h2>WEBPAGE LINKS</h2>

    <p><a href="/JS_Notebook" target="_self">JS Notebook</a></p>
    <p><a href="/Login" target="_self">Sign In / Out</a></p>
    <p><a href="/Notes" target="_self">Cloud Notes</a>
    <p><a href="/Video" target="_self">Video</a></p>
    <p><a href="/Blob">Blob</a></p>
    
</center>

</body> 
</html>`;var a=`<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <meta name="theme-color" content="#02121b">
    <link rel="icon" sizes="192x192" href="https://1nrp.github.io/1/Images/N-Logo1.png">
    <title>Blob Store</title>
  </head>
  <style>
    body {
      color: #fff;
      background-color: #02121b;
    }
    input:focus,
    textarea:focus,
    select:focus {
      outline: 0;
    }
    h2 {
      font-family: cursive, arial, sans-serif;
      font-size: 25px;
      font-weight: 900;
      margin: -8px 0px 2px 0px;
    }
    #TopBar {
      display: flex;
      flex-direction: row;
    }
    #Stores {
      padding: 2px 2px;
      border: 2px solid #555;
      border-radius: 40px;
      width: 80px;
      position: absolute;
      color: #fff;
      background-color: #000;
      margin: -6px 0px 0px 74vw;
      font-weight: 500;
    }
    #viewBox {
      width: 99%;
      height: 80vh;
      border-radius: 8px;
      position: relative;
      border: 2px solid #333;
      overflow-y: scroll;
      background-color: #111135;
      margin: 2px;
    }
    #uploadBox {
      color: #fffd;
      min-height: 20%;
      overflow: auto;
      width: 65%;
      overflow: scroll;
      border: 2px dashed #754;
      border-radius: 6px;
      padding: 6px;
    }
    #uploadButton {
      background-color: #205c89;
      color: #fffb;
      border: none;
      font-size: 25px;
      border-radius: 50px;
      padding: 0px 8px 5px 7px;
      font-weight: 1000;
    }
    #getFilesBtn {
      background-color: #126419;
      color: #fffb;
      border: none;
      border-radius: 50px;
      font-size: 25px;
      font-weight: 1000;
      padding: 2px 8px 3px 7px;
    }
    #clearBtn {
      border: none;
      color: #fffb;
      font-size: 25px;
      font-weight: 1000;
      border-radius: 50px;
      background-color: #833;
      padding: 0px 9px 4px 8px;
    }
    #clearBtn:hover,
    #getFilesBtn:hover,
    #uploadButton:hover {
      background-color: #444;
    }
    .Alerts {
      position: fixed;
      /* top: 5dvh; */
      left: 15dvw;
      background-color: #fff;
      color: #fffd;
      font-weight: 900;
      padding: 5px 5px;
      border: none;
      z-index: 50;
      border-radius: 5px;
      animation-name: Alert;
      animation-duration: 1s;
    }
    /* Alert Animation */
    @keyframes Alert {
      from {
        font-size: 10px;
        top: 5dvh;
      }
      to {
        font-size: 25px;
        top: 10dvh;
      }
    }
    @keyframes Menu {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .cell-buttons {
      position: absolute;
      top: 2px;
      right: 4px;
      display: flex;
      gap: 25px;
      z-index: 20;
      margin-top: 6px;
      background-color: #4c8fb680;
      border: 2px solid #157c23;
      padding: 6px;
      opacity: 0.2;
      border-radius: 4px;
    }
    .toggle-btn:hover {
      opacity: 1;
      background-color: #444;
    }
    .fileDiv {
      border: 2px solid #960f6960;
      border-radius: 4px;
      overflow-y: visible;
      height: auto;
      position: relative;
      margin: 2px;
      border-radius: 6px;
      padding: 2px;
    }
    .toggle-btn {
      position: absolute;
      right: 6px;
      top: 6px;
      opacity: 0.4;
      padding: 3px 6px 2px 6px;
      font-size: 14px;
      background-color: #0d4257;
      font-weight: 800;
      border: 2px solid #444e09;
      color: #fff;
      transition: transform 0.2s ease;
      border-radius: 50%;
    }
    .cell-buttons-div {
      display: none;
      position: absolute;
      right: 50px;
      top: 8px;
      padding: 2px;
      z-index: 100;
      background-color: #265a7c;
      border: none;
      border-radius: 10px;
      animation-name: Menu;
      animation-duration: 0.5s;
    }
    .cell-buttons-div button {
      margin: 2px;
      background-color: #0d2136;
      padding: 6px;
      border: none;
      border-radius: 6px;
    }
  </style>
  <body>
    <!--  * Keyboard Shortcuts: Fetch Notes: "ArrowRight + ArrowDown", Save Notes: "ArrowRight + ArrowUp", Delete Notes: "ArrowRight + End"  -->
    <div id="TopBar">
      <h2 id="Header">Blob Store</h2>
      <select id="Stores">
        <option value="Text" data-Colour="#111135">Text</option>
        <option value="Image" data-Colour="#4e3144">Image</option>
        <option value="Audio" data-Colour="#664337">Audio</option>
        <option value="Video" data-Colour="#503959">Video</option>
        <option value="Document" data-Colour="#395c42">Document</option>
        <option value="TI_Images" data-Colour="#664337">T&I Images</option>
        <option value="Others" data-Colour="#272729">Others</option>
      </select>
    </div>
    <div id="viewBox"></div>
    <form id="uploadForm">
      <div style="display: flex; gap: 10px; align-items: center">
        <button
          id="clearBtn"
          type="button"
          onclick="document.getElementById('uploadBox').value=''; document.getElementById('viewBox').innerHTML=''; document.getElementById('fileMetadata').style.display='none'; document.getElementById('progressSpan').style.display = 'none';"
        >
          \u2716
        </button>
        <input id="uploadBox" type="file" multiple accept="*/*" required />
        <button id="uploadButton" type="submit">\u25B2</button>
        <button id="getFilesBtn" type="button" onclick="getFiles()">\u25BC</button>
      </div>
    </form>
    <progress id="progressBar" style="width: 100%; height: 15px; border: none" value="0" max="100"></progress>
    <p
      id="progressSpan"
      style="display: none; border: 2px dashed #fff888; border-radius: 4px; width: auto; padding: 2px; margin-top: 2px; font-weight: 700; text-align: center; color: #fffd"
    >
    </p>
    <p
      id="currentFile"
      style="display: none; border: 2px dashed #196d08; border-radius: 4px; width: 98.5%; padding: 2px; margin-top: 2px; text-wrap: wrap; font-size: 12px; font-weight: 600; color: #fff888"
    >
    </p>
    <!-- Display file metadata -->
    <div id="fileMetadata" style="display: none"></div>
    <iframe id="downloadFrame" src="" name="IFrame" style="display: none"></iframe>
    <!-- Dummy iframe to support downloading files in X-Mini browser without leaving the webpage. -->
    <script src="upload.js"><\/script>
    <!-- Bundled code for Vercel Blob's client-side 'upload' function. -->

    <script>
      // File Upload Functionality.
      document.getElementById('uploadForm').addEventListener('submit', async (event) => {
        event.preventDefault()
        const fileInput = document.getElementById('uploadBox')
        const files = Array.from(fileInput.files) // Convert FileList to an array.
        document.getElementById('uploadButton').disabled = files.length === 0 // Disable button if no files.
        if (files.length > 0) {
          for (const file of files) {
            let optForMultiPartUpload = false
            const pathname = \`\${document.getElementById('Stores').value}/\${file.name}\`
            if (!file) {
              alert('Please select a file to upload.')
              return
            } else if (file.size > 200000000 /* 200 MB */) {
              alert('Filesize exceeded 200 MB.')
              return
            } else if (file.size >= 10000000 /* 10 MB */) {
              optForMultiPartUpload = true
            }
            try {
              // Upload the file to Vercel Blob.
              const newBlob = await upload(pathname, file, {
                access: 'public',
                handleUploadUrl: '/blobserver',
                multipart: optForMultiPartUpload,
                clientPayload: \`\${file.type}\`,
                onUploadProgress: (progress) => {
                  const { percentage } = progress
                  // console.log(\`Upload Progress: \${percentage}%\`);
                  document.getElementById('progressBar').value = \`\${percentage}\`
                  document.getElementById('progressSpan').style.display = 'block'
                  document.getElementById('progressSpan').textContent = \`\${percentage} %\`
                  document.getElementById('currentFile').style.display = 'block'
                  document.getElementById('currentFile').textContent = file.name
                },
              })
              if (newBlob.ok) {
                document.getElementById('progressSpan').style.display = 'none'
                document.getElementById('fileMetadata').style.display = 'none'
                document.getElementById('currentFile').style.display = 'none'
                // Show saved alert when "OK" response (200) is received from the server.
                showAlert({ BgColor: '#1bd13d', Text: '\u2714 File Saved' })
              }
              // Reset the 'multipart' option.
              optForMultiPartUpload = false
            } catch (error) {
              console.error('Error uploading file:', error)
              alert(\`An error occurred while uploading: \${file.name}. Please try again.\`)
              continue
            }
          }
        }
      })

      document.getElementById('uploadBox').addEventListener('change', (event) => {
        const files = Array.from(event.target.files) // Convert FileList to an array.
        document.getElementById('uploadButton').disabled = !files
        if (files) {
          for (file of files) {
            const div = document.createElement('div')
            div.innerHTML = \`
                <h3 style="color: #205c89;">File : \${file.name}</h3>
                <p style="color: #64770e;"><strong>Type:</strong> <span style="color: #76ddbe;">\${file.type}</span></p>
                <p style="color: #64770e;"><strong>Size:</strong> <span style="color: #76ddbe;">\${
              (file.size / (1024 * 1024)).toFixed(2)
            } MB</span></p>
            \`
            document.getElementById('fileMetadata').appendChild(div)
          }
          document.getElementById('fileMetadata').style.display = 'block'
        } else {
          document.getElementById('fileMetadata').style.display = 'none'
        }
      })

      document.getElementById('Stores').addEventListener('change', function () {
        var dropdown = document.getElementById('Stores')
        var chosenStore = dropdown.options[dropdown.selectedIndex]
        var Colour = chosenStore.getAttribute('data-Colour')
        document.getElementById('viewBox').style.backgroundColor = Colour
        document.getElementById('Header').innerText = chosenStore.value
      })

      // Show Alerts depending upon the response received.
      function showAlert({ BgColor = '#fff', Text = 'Alert' } = {}) {
        var alertBox = document.createElement('div')
        alertBox.className = 'Alerts'
        alertBox.style.backgroundColor = BgColor
        alertBox.textContent = Text
        document.body.appendChild(alertBox)
        setTimeout(() => {
          alertBox.remove()
        }, 1000)
      }

      // Retrive the Files from BLob storage.
      async function getFiles() {
        try {
          const Folder_Name = document.getElementById('Stores').value
          const response = await fetch(\`/blobserver?TASK=List&FOLDER_NAME=\${Folder_Name}\`)
          const blobs = await response.json()
          document.getElementById('viewBox').innerHTML = ''
          let count = 1
          for (let blob of blobs) {
            const div = document.createElement('div')
            div.className = 'fileDiv'
            const name = blob.pathname.split('/').slice(-1)[0]
            const size = (blob.size / 1000000).toFixed(2) + 'MB',
              downloadLink = blob.downloadUrl,
              Link = blob.url
            div.ondblclick = () => navigator.clipboard.writeText(Link)
            div.innerHTML = \`
              <button class="toggle-btn" onclick="toggleButtons(this)">\u2630</button>
              <p>\${count++}. \${name} [\${size}]</p>
                <div class="cell-buttons-div">
                  <button onclick="downloadFile('\${downloadLink}')">\u{1F4E5}</button>
                  <button onclick="renameFile('\${Link}')">\u270F\uFE0F</button>
                  <button onclick="deleteFile('\${Link}')">\u274C</button>
                </div>
            \`
            document.getElementById('viewBox').appendChild(div)
          }
        } catch (error) {
          console.error('Error fetching or parsing data:', error)
        }
      }

      function downloadFile(Link) {
        const frame = document.getElementById('downloadFrame')
        frame.src = Link
        /*
  setTimeout(() => {
  frame.src = '';
  }, 5000);
  */
      }

      /*
// X-Mini browser redirects to the download link, thus leaving the tab, instead of downloading the file. So an alternative method (Iframe) is used.
// Main stream browsers support the below method without leaving the tab.
function downloadFile(Link) {
    const url = document.createElement('a');
    url.href = Link;
    url.click();
}
			*/

      async function renameFile(Link) {
        const newFileName = prompt('Enter the new file name:')
        const newPathName = \`\${document.getElementById('Stores').value}/\${newFileName}\`
        if (newFileName) {
          try {
            const response = await fetch(\`/BlobServer?TASK=Rename&FILE_URL=\${Link}&NEW_PATHNAME=\${newPathName}\`)
            if (response.ok) {
              showAlert({ BgColor: '#1bd13d', Text: \`\u2714 File Renamed\` })
            } else {
              const errorData = await response.json()
              console.error('Error from server:', errorData.error)
            }
          } catch (error) {
            console.error('Error renaming file:', error)
          }
        }
      }

      async function deleteFile(Link) {
        const confirmDelete = confirm('Are you sure you want to delete this file ?')
        if (confirmDelete) {
          try {
            const response = await fetch(\`/BlobServer?TASK=Delete&URL=\${Link}\`)
            if (response.ok) {
              showAlert({ BgColor: '#f2074e', Text: \`\u2716 File Deleted\` })
            } else {
              const errorData = await response.json()
              alert('Error from server:', errorData.error)
            }
          } catch (error) {
            alert('Error deleting file:', error)
          }
        }
      }

      // Toggle the Action/Menu Buttons for each file.
      function toggleButtons(button) {
        // Toggle the rotation of the button
        button.style.transform = button.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)'
        // Get all elements (NodeList) with the class '.cell-buttons-div' and convert the NodeList into an array.
        const cellsArr = Array.from(document.querySelectorAll('.cell-buttons-div'))
        // Find the index of the target element
        const currentDiv = cellsArr.indexOf(button.nextElementSibling.nextElementSibling)
        // Remove the current button from the list (1 element starting at currentDiv)
        cellsArr.splice(currentDiv, 1)
        // Hide all div elements except the one being toggled
        for (let element of cellsArr) {
          element.style.display = 'none'
        }
        // Toggle the display of the buttons div
        const buttonsDiv = button.nextElementSibling.nextElementSibling // Skip over the <p> and target the next div.
        buttonsDiv.style.display = buttonsDiv.style.display === 'block' ? 'none' : 'block'
      }

      // Keyboard Shortcuts for different Functions
      let arrowRightPressed = false
      document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          arrowRightPressed = true
        }

        if (arrowRightPressed) {
          if (event.key === 'ArrowUp') {
            document.getElementById('uploadButton').click()
          } else if (event.key === 'ArrowDown') {
            getFiles()
          } else if (event.key === 'End') {
            document.getElementById('clearBtn').click()
          }
        }
      })

      document.addEventListener('keyup', function (event) {
        if (event.key === 'ArrowRight') {
          arrowRightPressed = false
        }
      })
    <\/script>
  </body>
</html>
`;var s=`<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <meta name="theme-color" content="#02121b">
    <link rel="icon" sizes="192x192" href="https://1nrp.github.io/1/Images/N-Logo1.png">
    <title>Cloud Notes</title>
  </head>
  <style>
    body {
      color: #fff;
      background-color: #000;
    }
    input:focus,
    textarea:focus,
    select:focus {
      outline: 0;
    }
    h2 {
      font-family: cursive, arial, sans-serif;
      font-size: 25px;
      font-weight: 900;
      margin: -8px 0px 2px 0px;
    }
    #TopBar {
      display: flex;
      flex-direction: row;
    }
    #Stores {
      padding: 2px 2px;
      border: 2px solid #555;
      border-radius: 40px;
      width: 80px;
      position: absolute;
      color: #fff;
      background-color: #000;
      margin: -6px 0px 0px 70vw;
      font-weight: 500;
    }
    #textBox {
      width: 96%;
      height: 85vh;
      padding: 6px;
      font-family: sans-serif;
      font-size: 15px;
      resize: none;
      overflow: auto;
      background-color: #111136;
      border: none;
      color: #fff;
      border-radius: 6px;
    }
    #deleteBox {
      color: #fff;
      height: auto;
      min-height: 10%;
      resize: none;
      overflow: auto;
      box-sizing: border-box;
      width: 100%;
      overflow: scroll;
      background-color: #361923;
      border: 2px solid #444;
      border-radius: 6px;
    }
    #deleteBtn {
      background-color: #802;
      color: #b4b4b4;
      border: none;
      font-size: 15px;
      border-radius: 50px;
      cursor: pointer;
      padding: 6px 8px;
      font-weight: 900;
      margin: 0px 2px 4px 0px;
    }
    #saveButton {
      background-color: #205c89;
      color: #b4b4b4;
      border: none;
      font-size: 15px;
      border-radius: 50px;
      cursor: pointer;
      padding: 6px 8px;
      font-weight: 900;
      margin: 2px 2px 0px 15%;
    }
    #getNotes {
      background-color: #761;
      color: #b4b4b4;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 900;
      padding: 6px 8px;
      margin: 2px 2px 0px 15px;
    }
    #clearBtn {
      border: none;
      color: #b4b4b4;
      border-radius: 50px;
      background-color: #833;
      padding: 2px 7px 5px 7px;
      margin: 0px 0px 0px 15%;
    }
    #clearBtn:hover,
    #getNotes:hover,
    #deleteBtn:hover,
    #saveButton:hover {
      background-color: #444;
    }
    .Alerts {
      position: fixed;
      /* top: 5dvh; */
      left: 15dvw;
      background-color: #fff;
      color: #000;
      font-weight: 900;
      padding: 5px 5px;
      border: none;
      border-radius: 5px;
      animation-name: Alert;
      animation-duration: 1s;
    }
    /* Alert Animation */
    @keyframes Alert {
      from {
        font-size: 10px;
        top: 5dvh;
      }
      to {
        font-size: 25px;
        top: 10dvh;
      }
    }
  </style>
  <body>
    <!-- * Keyboard Shortcuts: Fetch Notes: "ArrowRight + ArrowDown", Save Notes: "ArrowRight + ArrowUp", Delete Notes: "ArrowRight + End"  -->
    <div id="TopBar">
      <h2 id="Header">Nihar's Cloud Notes</h2>
      <select id="Stores">
        <option value="Miscellaneous" data-Name="Nihar's Cloud Notes" data-Colour="#111136">Miscellaneous</option>
        <option value="Trading_And_Investing" data-Name="Trading & Investing" data-Colour="#4e3144">
          Trading & Investing
        </option>
        <option value="Important_Webpages" data-Name="Important Webpages" data-Colour="#395c42">
          Important Webpages
        </option>
        <option value="Movie_Watch_List" data-Name="Movie Watch List" data-Colour="#503959">Movie Watch List</option>
        <option value="Book_Summaries" data-Name="Book Summaries" data-Colour="#664337">Book Summaries</option>
        <option value="TG_Channels" data-Name="TG Channels" data-Colour="#376661">TG Channels</option>
        <option value="To_Do_List" data-Name="To Do List" data-Colour="#364b57">To Do List</option>
        <option value="Keywords" data-Name="Keywords" data-Colour="#272729">Keywords</option>
        <option value="Book_List" data-Name="Book List" data-Colour="#8c7842">Book List</option>
        <option value="Quotes" data-Name="Quotes" data-Colour="#1d423a">Quotes</option>
      </select>
    </div>
    <textarea id="textBox" spellcheck="false" autocomplete="off" translate="no"></textarea>
    <button id="deleteBtn" onclick="deleteNote()">DELETE</button>
    <button id="clearBtn" onclick="document.getElementById('textBox').value=''">\u2716</button>
    <button id="saveButton" onclick="saveNotes()">SAVE</button>
    <button id="getNotes" onclick="getNote()">VIEW</button>
    <textarea id="deleteBox" spellcheck="false" autocomplete="off" translate="no"></textarea>

    <script>
      // Redirecting to '/login' page if not Authenticated.
      ;(async () => {
        const route = '/LoginStatus'
        const response = await fetch(route)
        if (response.status === 401) {
          showAlert({ BgColor: '#f2074e', Text: 'Login Required' })
          console.log('Redirecting To Login Page...')
          setTimeout(() => {
            globalThis.location.href = '/login'
          }, 1000)
        }
      })()

      document.getElementById('Stores').addEventListener('change', function () {
        var dropdown = document.getElementById('Stores')
        var chosenStore = dropdown.options[dropdown.selectedIndex]
        var Name = chosenStore.getAttribute('data-Name')
        var Colour = chosenStore.getAttribute('data-Colour')
        document.getElementById('textBox').style.backgroundColor = Colour
        document.getElementById('Header').innerText = Name
      })

      // Auto expand deleteBox if texts overflow while typing or pasting, to properly see what will be deleted.
      document.addEventListener('DOMContentLoaded', function () {
        const textarea = document.getElementById('deleteBox')
        textarea.addEventListener('input', function () {
          this.style.height = 'auto' // Reset the height.
          this.style.height = this.scrollHeight + 'px' // Set the height to the scroll height.
        })
        // Trigger input event to adjust height if there's initial content.
        textarea.dispatchEvent(new Event('input'))
      })

      // Show Alerts depending upon the response received.
      function showAlert({ BgColor = '#fff', Text = 'Alert' } = {}) {
        var alertBox = document.createElement('div')
        alertBox.className = 'Alerts'
        alertBox.style.backgroundColor = BgColor
        alertBox.textContent = Text
        document.body.appendChild(alertBox)
        setTimeout(() => {
          alertBox.remove()
        }, 1000)
      }

      // Save the Last Line (LL) in KV Cloud storage.
      async function saveNotes() {
        const AlertText = document.getElementById('Header').innerText
        const textValue = document.getElementById('textBox').value.trim()
        const lines = textValue.split('\\n\\n\\n\\n\\n\\n')
        const date = \`\u25CF Date: \${new Date().toLocaleDateString('en-IN')} \u25CF\`
        const Sentence = lines[lines.length - 1].trim()
        const lastSentence = date + '\\n' + Sentence
        if (Sentence && lastSentence) {
          try {
            const REDIS_KEY = document.getElementById('Stores').value
            const response = await fetch('/saveNote', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ lastSentence, REDIS_KEY }),
            })
            if (response.ok) {
              console.log('Note sent to Vercel KV store with KEY:', REDIS_KEY)
              // Show saved alert when "OK" response (200) is received from the server.
              showAlert({ BgColor: '#1bd13d', Text: \`\u2714 \${AlertText}\` })
            } else {
              const errorData = await response.json()
              console.error('Error from server:', errorData.error)
            }
          } catch (error) {
            console.error('Error sending note to Vercel KV:', error)
          }
        }
      }

      // Delete the specific Note in KV Cloud storage.
      async function deleteNote() {
        const deleteValue = document.getElementById('deleteBox').value.trim()
        const AlertText = document.getElementById('Header').innerText
        if (deleteValue) {
          try {
            const Redis_Key = document.getElementById('Stores').value
            const response = await fetch(\`/deleteNote?REDIS_KEY=\${Redis_Key}\`, {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: deleteValue,
            })
            if (response.ok) {
              const data = await response.json() // Wait for the JSON response.
              if (data.result !== 0) {
                console.log('Note deleted in Vercel KV store with KEY:', Redis_Key)
                // Show deleted alert if response result is positive {result: (list_count)}. 'list_count' is the number of deleted values.
                showAlert({ BgColor: '#f2074e', Text: \`\u2716 \${AlertText}\` })
              } else {
                // Show not found alert if response result is Zero {result: 0}.
                console.log('This Note does not exist in Vercel KV store with KEY:', Redis_Key)
                showAlert({ BgColor: '#e8af05', Text: \`\u26A0 \${AlertText}\` })
              }
            } else {
              const errorData = await response.json() // Wait for the JSON error response.
              console.error('Error from server:', errorData.error)
            }
          } catch (error) {
            console.error('Error deleting note in Vercel KV:', error)
          }
        }
      }

      // Retrive the texts from KV Cloud storage.
      async function getNote() {
        try {
          const Redis_Key = document.getElementById('Stores').value
          const response = await fetch(\`/getNote?REDIS_KEY=\${Redis_Key}\`)
          const data = await response.json()
          const result = data.result.join('\\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\n')
          document.getElementById('textBox').value = result
        } catch (error) {
          console.error('Error fetching or parsing data:', error)
        }
      }

      // Keyboard Shortcuts for different Functions
      let arrowRightPressed = false
      document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          arrowRightPressed = true
        }
        if (arrowRightPressed) {
          if (event.key === 'ArrowUp') {
            saveNotes()
          } else if (event.key === 'ArrowDown') {
            getNote()
          } else if (event.key === 'End') {
            deleteNote()
          }
        }
      })

      document.addEventListener('keyup', function (event) {
        if (event.key === 'ArrowRight') {
          arrowRightPressed = false
        }
      })

      // Function to paste specific note into deleteBox
      function pasteLineText(event) {
        var textBox = document.getElementById('textBox')
        var text = textBox.value
        var cursorPosition = textBox.selectionStart // Get cursor position
        // Find the nearest start line before the cursor position
        var startLine = text.lastIndexOf(
          '\\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\n',
          cursorPosition,
        )
        // Find the nearest end line after the cursor position
        var endLine = text.indexOf('\\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\n', cursorPosition)
        // Adjust start and end positions to get the text between them
        var startOfLine = startLine + '\\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\n'.length
        var endOfLine = endLine
        // If no start line is found before the cursor position, start from the beginning
        if (startLine === -1 || cursorPosition < startLine) {
          startOfLine = 0
        }
        // If no end line is found after the cursor position, select till the end of text
        if (endLine === -1 || cursorPosition > endLine) {
          endOfLine = text.length
        }
        var lineText = text.substring(startOfLine, endOfLine)
        document.getElementById('deleteBox').value = lineText
      }
      document.getElementById('textBox').onclick = pasteLineText
    <\/script>
  </body>
</html>
`;var d=`<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <meta name="theme-color" content="#02121b">
    <!--  <link rel="manifest" href="PWA/manifest.json">  -->
    <link rel="icon" sizes="192x192" href="https://1nrp.github.io/1/Images/N-Logo1.png">
    <script src="https://1nrp.github.io/vid/custom-long-press.js"><\/script>
    <!--  <link rel="stylesheet" href="CSS-JS/style.css">  -->
    <title>Video Player (CORS)</title>
    <style>
      body {
        background-color: #0d2136;
        color: #fff;
      }
      input:focus, /* Remove Focused element's border outline. */
      select:focus,
      textarea:focus {
        outline: 0;
      }
      #post-container {
        width: 99%;
        height: 360px;
        border-radius: 8px;
        position: relative;
        border: 2px solid #333;
        overflow-y: scroll;
        background-color: #02121b;
        margin: 205px 0px 4px 0px;
      }
      .post-details {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .poster-image {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
      }
      .size {
        color: #b4b4b4;
        font-family: Arial, Helvetica, Cursive, Palatino, Courier, sans-serif;
        font-size: 15px;
        font-weight: 600;
        margin: 0px 40px 1px 0px;
      }
      .duration {
        color: #b4b4b4;
        font-family: Arial, Helvetica, Cursive, Palatino, Courier, sans-serif;
        font-size: 15px;
        font-weight: 600;
        margin: 0px 20px 1px 35vw;
      }
      /*  #embedVideo {
          position: fixed;
          top: 0vh;
          left: 0vw;
          border: 2px solid #333;
          border-radius: 6px;
          background-color: #02121b;
          width: 98.9dvw;
          display: block;
          height: 30vh;
        } */
      #player {
        position: fixed;
        top: 0vh;
        left: 0vw;
        border: 2px solid #333;
        border-radius: 6px;
        background-color: #02121b;
        max-width: 98.9dvw; /* dvw = dynamic viewport width */
        max-height: 85dvh; /* dvh = dynamic viewport height */
        margin: 0px 0px 0px 0px; /* Top, Right, Bottom, Left */
      }
      #saveDeleteBtn {
        background-color: #000;
        padding: 6px;
        margin-left: 2px;
        border: 2px dashed #555;
        color: #fff;
        cursor: pointer;
      }
      input::placeholder {
        color: #929292;
      }
      #vid {
        width: 57%;
        max-width: 300px;
        padding: 6px 2px;
        display: block;
        background-color: #000;
        color: #a2a2a2;
        font-weight: 600;
        border: 2px dashed #555;
      }
      #button-play {
        background-color: #000;
        width: 17%;
        color: #a2a2a2;
        font-weight: 1000;
        max-width: 100px;
        padding: 6px;
        border: 2px dashed #555;
      }
      #clearBtn {
        background-color: #000;
        color: #fff;
        position: relative;
        max-width: 50px;
        padding: 6px;
        z-index: 10;
        border: 2px dashed #555;
      }
      #boxContainer {
        width: 97%;
        height: 300px;
        overflow-y: scroll;
        border: 2px solid #333;
        padding: 2px;
        position: relative;
        background-color: #02121b;
        border-radius: 8px;
        margin: 2px;
        display: none;
      }
      .TG-post-container {
        display: inline-block;
        border: none;
        background: transparent;
        width: auto;
        height: auto;
        margin: -4px 0px 0px 0px;
        overflow: hidden;
      }
      .TG-Play {
        background-color: #405580;
        border: none;
        border-radius: 50px;
        font-size: 15px;
        font-weight: 1000;
        padding: 4px 145px;
        margin: 0px 0px 4px 4px;
      }
      .TG-Play:hover {
        background-color: #444;
      }
      #hamburgerMenu {
        padding: 5px 8.5px 5.5px 9px;
        font-weight: 1000;
        margin-left: 2px;
        transition: transform 0.4s ease;
      }
      .menuButtons {
        background-color: #000;
        padding: 8px;
        border: 2px solid #888;
        color: #fff;
        border-radius: 10px;
        margin: 2px 4px;
      }
      #menuBox {
        position: fixed;
        top: 60dvh;
        left: 40vw;
        display: none;
        padding: 4px;
        z-index: 40;
        background-color: #031522;
        border: 2px solid #444;
        border-radius: 20px;
        animation-name: menu;
        animation-duration: 0.5s;
      }
      #channelName {
        width: 80px;
        padding: 5px 2px 5px 4px;
      }
      #messageID {
        width: 60px;
        padding: 6px 0px 6px 15.5px;
      }
      #go-btn {
        padding: 6px 7.4px;
      }
      #btn-next {
        padding: 6px 10.2px;
      }
      #reload {
        padding: 6.5px 6px;
      }
      .secondRow {
        display: none;
        font-weight: 600;
        color: #b4b4b4;
        border: 2px dotted #555;
        border-radius: 10px;
        background-color: #02121b;
      }
      #textBox {
        width: 99%;
        height: 150px;
        color: #b4b4b4;
        resize: none;
        position: relative;
        background-color: #02121b;
        border: 2px solid #333;
        border-radius: 8px;
        overflow-y: scroll;
        margin: 2px 0px;
      }
      .txtDiv {
        color: #b4b4b4;
        overflow-x: hidden;
        padding: 2px;
        margin: 4px 2px;
        text-wrap: no-wrap;
        white-space: pre;
        font-size: 12px;
        border-radius: 4px;
        font-weight: 500;
      }
      #thumbnailContainer {
        position: fixed;
        top: 2dvh;
        left: 5dvw;
        display: none;
        z-index: 40;
        width: 88%;
        height: 350px;
        border-radius: 5px;
        padding: 2px;
        border: 2px solid #358585;
        background-color: #000;
        align-items: center;
      }
      .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .linkNumber {
        background-color: #572067;
        color: #b4b4b4;
        padding: 5px;
        font-weight: 800;
        font-size: 12px;
        border: none;
        border-radius: 20px;
      }
      #brightnessSlider {
        width: 80%;
        margin: 0% 10%;
        display: none;
      }
      .menuButtons:hover,
      .secondRow:hover {
        background-color: #405580;
      }
      #button-play:hover,
      #clearBtn:hover {
        background-color: #405580;
      }
      .Alerts {
        position: fixed;
        /* top: 5dvh; */
        left: 20dvw;
        z-index: 50;
        background-color: #fff;
        font-weight: 1000;
        padding: 5px;
        border: none;
        border-radius: 5px;
        animation-name: Alert;
        animation-duration: 1s;
      }
      /* Animations */
      @keyframes Alert {
        from {
          font-size: 5px;
          top: 0dvh;
        } /* transform: rotate(30deg)} */
        to {
          font-size: 20px;
          top: 10dvh;
        } /* transform: rotate(0deg)} */
      }
      @keyframes menu {
        from {
          opacity: 0;
          top: 10dvh;
        }
        to {
          opacity: 1;
          top: 60dvh;
        }
      }
      /* Code for Night-Mode toggle. */
      .nightMode {
        body {
          background-color: #000;
          color: #b4b4b4;
        }
        #thumbnailContainer,
        #embedVideo,
        #player,
        #menuBox,
        #Default-Position-Elements {
          filter: brightness(70%);
        }
        #copyLink,
        #saveDeleteBtn,
        #reload,
        .menuButtons {
          color: #b4b4b4b4;
        }
        #vid,
        #textBox,
        #button-play,
        .secondRow,
        .size,
        .duration {
          color: #999;
        }
      }
    </style>
  </head>

  <body>
    <div id="Default-Position-Elements">
      <!-- Separation between Fixed position and Non-Fixed position elements is for brightness adjustment purpose. The 'brightnessSlider' distorts the positioning of Fixed elements. -->
      <div id="post-container" data-long-press-delay="1000" ondblclick="document.getElementById('vid').value=''"></div>
      <center style="display: flex; gap: 4px">
        <button id="saveDeleteBtn" onclick="handleButtonClick()" ondblclick="checkLinkExistence()">\u{1F310}</button>
        <input
          type="text"
          placeholder="Enter Download Link..."
          id="vid"
          name="vid"
          autocomplete="off"
          maxlength="10000"
        >
        <button id="button-play" onclick="CloudFlare_Play()" data-long-press-delay="500">PLAY</button>
        <button
          id="clearBtn"
          onclick="document.getElementById('vid').value='';"
          ;
          ondblclick="document.getElementById('player').src='';"
        >
          \u2716\uFE0F
        </button>
      </center>
      <div style="height: 2px"></div>
      <!--  To create gap between 1st and 2nd row of buttons (saveDeleteBtn, hamburgerMenu etc) .  -->
      <div id="boxContainer"></div>
      <button
        id="hamburgerMenu"
        class="secondRow"
        onclick="menuBox(); style.transform = (style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)');"
      >
        \u2630
      </button>
      <select id="channelName" class="secondRow" ondblclick="fetchOptions()"></select>
      <input id="messageID" class="secondRow">
      <button
        id="go-btn"
        class="secondRow"
        onclick="fetchSinglePost(); document.getElementById('boxContainer').style.display='block'"
      >
        GO
      </button>
      <button id="btn-next" class="secondRow" onclick="loadNextPosts()">NEXT</button>
      <button id="reload" class="secondRow" onclick="fetchPosts()">\u267B\uFE0F</button>
      <div>
        <div id="textBox" readonly data-long-press-delay="2000"></div>
        <!--b<div id="textBoxHighlighter"></div> -->
      </div>
      <input id="brightnessSlider" type="range" value="100" min="50" max="150" class="slider">
    </div>
    <!--  Keyboard Shortcuts: Play: "ArrowRight + ArrowDown", Fetch Posts: "ArrowRight + ArrowLeft", Clear Button(click): "ArrowRight + End", Save Link: "ArrowRight + ArowUp"  -->
    <!--  Fixed Position Elements. 
<iframe id="embedVideo" referrerPolicy="no-referrer" name="videoFrame"></iframe>
<iframe id="dummyIframe" referrerpolicy="no-referrer" style="display: none"></iframe> -->
    <video
      id="player"
      controls
      controlsList="nofullscreen"
      poster="img/my_name_logo_1.2.1.jpg"
      data-long-press-delay="400"
      tabindex="0"
      loop="loop"
      src=""
      width="100%"
      muted
      autoplay
    >
    </video>
    <div id="thumbnailContainer"></div>
    <div id="menuBox">
      <button class="menuButtons" onclick="nightModeFunction()">\u{1F317}</button>
      <button class="menuButtons" onclick="getLink()">\u{1F517}</button>
      <button
        class="menuButtons"
        onclick="document.getElementById('player').removeAttribute('controlsList', 'nofullscreen')"
      >
        \u{1F533}
      </button>
      <button
        class="menuButtons"
        onclick="document.getElementById('brightnessSlider').style.display = (document.getElementById('brightnessSlider').style.display === 'flex' ? 'none' : 'flex')"
      >
        \u2194\uFE0F
      </button>
      <div style="height: 4px"></div>
      <!--  Gap between 1st and 2nd row of 'Menu' buttons.  -->
      <button class="menuButtons" onclick="copyVideoSrc()">\u{1F4E1}</button>
      <button class="menuButtons" onclick="getOtherLinks()">\u{1F4E5}</button>
      <button class="menuButtons" onclick="changePlayFunction()">\u25B6\uFE0F</button>
      <button class="menuButtons" onclick="vConsole()">\u{1F6E0}\uFE0F</button>
    </div>
    <!--  <script src="CSS-JS/script.js"><\/script>  -->
    <script>
      ;(async () => {
        const route = '/LoginStatus'
        const response = await fetch(route)
        if (response.status === 401) {
        setTimeout( () => {
          showAlert({ BgColor: '#e8af05', Text: '\u26A0 Not Logged In' })
        }, 2000)
        }
      })()

      // Check browser color theme and adapt colors accordingly.
      function darkTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          document.body.color = '#000'
        }
      }
      darkTheme()
      // Get external Links from other sources.
      async function getOtherLinks() {
        try {
          const response = await fetch(\`\${document.getElementById('vid').value}\`)
          const data = await response.json()
          const box = document.getElementById('textBox')
          box.innerHTML = ''
          for (const [index, object] of data.result.entries()) {
            const tera = object.id
            let teraId
            if (tera.startsWith('1')) teraId = tera
            else teraId = 1 + tera
            const div = document.createElement('div')
            div.className = 'txtDiv'
            div.innerText = \`\${index + 1} \u25CF https://teraboxapp.com/s/\${teraId}\`
            box.appendChild(div)
          }
        } catch (error) {
          alert('Error fetching or parsing MdiskPlay json data.')
        }
      }

      // Cycle through the different "PLAY" functions.
      const PlayFunctions = [CloudFlare_Play, Vercel_Play, Mdisk_Play]
      let currentIndex = 0
      function changePlayFunction() {
        // Update the index to the next "PLAY" function.
        currentIndex = (currentIndex + 1) % PlayFunctions.length // The modulo operator (%) ensures that if the index exceeds the length of the array (which is 3), it wraps around to 0. This allows for cycling through the functions in the array.
        document.getElementById('button-play').onclick = PlayFunctions[currentIndex]
        showAlert({ BgColor: '#2894c7', Text: \`\${PlayFunctions[currentIndex].name} \u2714 Activated\` })
      }

      // Long Press Events.
      var el = document.getElementById('textBox')
      el.addEventListener('long-press', function (e) {
        e.preventDefault()
        getLink()
      })

      var el = document.getElementById('button-play')
      el.addEventListener('long-press', function (e) {
        e.preventDefault()
        Vercel_Play()
      })

      var el = document.getElementById('saveDeleteBtn')
      el.addEventListener('long-press', function (e) {
        e.preventDefault()
        checkLinkExistence()
      })

      var el = document.getElementById('clearBtn')
      el.addEventListener('long-press', function (e) {
        e.preventDefault()
        var elements = document.getElementsByClassName('secondRow')
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = (elements[i].style.display === 'none' || elements[i].style.display === '')
            ? 'inline'
            : 'none'
        }
      })

      var el = document.getElementById('player')
      el.addEventListener('long-press', function (e) {
        e.preventDefault()
        document.getElementById('player').style.maxHeight = '195px'
      })

      var el = document.getElementById('post-container')
      el.addEventListener('long-press', function (e) {
        e.preventDefault()
        var elements = document.getElementsByClassName('secondRow')
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = (elements[i].style.display === 'none' || elements[i].style.display === '')
            ? 'inline'
            : 'none'
        }
        //fetchPosts();
      })

      // Copy the source of the currently playing video.
      function copyVideoSrc() {
        /* if (document.getElementById('embedVideo').style.display === 'block') {
    navigator.clipboard.writeText(document.getElementById('embedVideo').src);
  } else { */
        navigator.clipboard.writeText(document.getElementById('player').src)
        // }
      }

      /*
// Increase Z-Index of "post-container", "boxContainer" and "textBox" on hovering to be shown above "embedVideo" iFrame.
const element1 = document.getElementById('post-container');
const element2 = document.getElementById('boxContainer');
const element3 = document.getElementById('textBox');
let touchTimeout;
let activeElement;
document.addEventListener('touchstart', zIndexUp);
document.addEventListener('mouseover', zIndexUp);
function zIndexUp(event) {
    if (document.getElementById('embedVideo').src == "" && ((element1.contains(event.target) && element1.innerHTML !== '') || element2.contains(event.target) || event.target === element3)) {
        event.preventDefault();
        activeElement = event.target.closest('#post-container');
	activeElement.style.zIndex = 100;
    console.log('mover & ',activeElement);
        clearTimeout(touchTimeout); // Clear any previous timeout to avoid resetting prematurely.
    }
}
document.addEventListener('touchend', zIndexDown);
document.addEventListener('mouseout', zIndexDown);
function zIndexDown(event) {
    touchTimeout = setTimeout(function() {
    if (activeElement) {
        activeElement.style.zIndex = 0; // Reset z-index after 500ms.
        console.log('mout & ', activeElement,'Out');
	activeElement = null;
      }
   }, 500);
}
      */
      const element1 = document.getElementById('post-container')
      const element2 = document.getElementById('boxContainer')
      const element3 = document.getElementById('textBox')
      let touchTimeout
      let activeElement

      // Add event listeners directly to the three elements
      element1.addEventListener('touchstart', handleZIndexUp)
      element1.addEventListener('mouseover', handleZIndexUp)
      element2.addEventListener('touchstart', handleZIndexUp)
      element2.addEventListener('mouseover', handleZIndexUp)
      element3.addEventListener('touchstart', handleZIndexUp)
      element3.addEventListener('mouseover', handleZIndexUp)

      function handleZIndexUp(event) {
        if (document.getElementById('player').src) {
          if ((this === element1 && element1.innerHTML !== '') || this === element2 || this === element3) {
            activeElement = this
            activeElement.style.zIndex = 100
            clearTimeout(touchTimeout) // Clear any previous timeout to avoid resetting prematurely.
          }
        }
      }
      element1.addEventListener('touchend', handleZIndexDown)
      element1.addEventListener('mouseout', handleZIndexDown)
      element2.addEventListener('touchend', handleZIndexDown)
      element2.addEventListener('mouseout', handleZIndexDown)
      element3.addEventListener('touchend', handleZIndexDown)
      element3.addEventListener('mouseout', handleZIndexDown)

      function handleZIndexDown(event) {
        touchTimeout = setTimeout(() => {
          if (activeElement) {
            activeElement.style.zIndex = 0 // Reset z-index after 500ms.
            activeElement = null
          }
        }, 500)
      }

      // Function to load the vConsole debug tool.
      function vConsole() {
        const script = document.createElement('script')
        script.src = 'vConsole-3.15.1.js'
        script.onload = () => {
          if (window.VConsole) {
            new VConsole({ theme: 'dark' })
          } else {
            alert('Failed To Load V-Console Library.')
            console.error('Error Loading vConsole library.')
          }
        }
        script.onerror = () => {
          console.error('Failed to load VConsole.')
        }
        document.head.appendChild(script)
      }

      // Brightness Control Functionality.
      const brSlider = document.getElementById('brightnessSlider')
      brSlider.addEventListener('input', function () {
        const brightnessValue = this.value
        document.getElementById('Default-Position-Elements').style.filter = \`brightness(\${brightnessValue}%)\`
        document.getElementById('player').style.filter = \`brightness(\${brightnessValue}%)\`
        document.getElementById('embedVideo').style.filter = \`brightness(\${brightnessValue}%)\`
        document.getElementById('menuBox').style.filter = \`brightness(\${brightnessValue}%)\`
        document.getElementById('thumbnailContainer').style.filter = \`brightness(\${brightnessValue}%)\`
      })

      // Fetch the TG Channels from database and populate the <select> element with the channels.
      let channelKeywords = [] // Global array to store all the TG channel names.
      async function fetchOptions() {
        const response = await fetch('/tgChannels')
        const data = await response.json()
        const selectElement = document.getElementById('channelName')
        selectElement.innerHTML = ''
        // Create a default "Select" option.
        const defaultOption = document.createElement('option')
        defaultOption.value = ''
        defaultOption.textContent = 'SELECT'
        selectElement.appendChild(defaultOption)
        // Clear the "channelKeywords" array before populating it with the channel names.
        channelKeywords = []
        // Populate the <select> element with the fetched options.
        let index = 1
        for (const rawChannel of data.result) {
          const channelID = rawChannel.split('/').slice(-1)[0]
          const fullChannel = 'https://t.me/' + channelID + '/'
          // Add the channels to the global Telegram Channel Keywords array.
          channelKeywords.push(fullChannel)
          // Create a new option element for each channel.
          const option = document.createElement('option')
          option.value = channelID
          option.textContent = \`\${index} \u25CF \${channelID}\`
          selectElement.appendChild(option)
          index += 1
        }
      }
      // window.onload = fetchOptions;

      // Show Alerts depending upon the response received.
      function showAlert({ BgColor = '#fff', Text = 'Alert' } = {}) {
        var alertBox = document.createElement('div')
        alertBox.className = 'Alerts'
        alertBox.style.backgroundColor = BgColor
        alertBox.textContent = Text
        document.body.appendChild(alertBox)
        setTimeout(() => {
          alertBox.remove()
        }, 1000)
      }

      // Save the Link in KV Cloud storage.
      async function saveLink() {
        const textarea = document.getElementById('vid')
        const textValue = textarea.value.trim()
        if (textValue) {
          try {
            const response = await fetch('/saveLink', {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: textValue,
            })
            if (response.ok) {
              const data = await response.json() // Wait for the JSON response.
              const listCount = data.result
              // Show "Link Saved" alert when "OK" response (200) is received from the server.
              showAlert({ BgColor: '#1bd13d', Text: \`\${listCount} \u2714 Link Saved\` })
            } else {
              const errorData = await response.json()
              console.error('Error from server:', errorData.error)
            }
          } catch (error) {
            console.error('Error sending link to Vercel KV:', error)
          }
        }
      }

      // Delete the Link in KV Cloud storage.
      async function deleteLink() {
        const deletearea = document.getElementById('vid')
        const deleteValue = deletearea.value.trim()

        if (deleteValue) {
          try {
            const response = await fetch('/deleteLink', {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: deleteValue,
            })
            if (response.ok) {
              const data = await response.json() // Wait for the JSON response
              if (data.result == 0) {
                console.log('This Link does not exist in Vercel KV.')
                // Show "Link Doesn't Exist" alert if response result is zero {result: 0}.
                showAlert({ BgColor: '#e8af05', Text: "\u26A0 Link Doesn't Exist" })
              } else {
                console.log('Link deleted in Vercel KV.')
                // Show "Link(s) Deleted" alert if response result is more than zero {result: (list_count)}. 'list_count' is the number of deleted values.
                const listCount = data.result
                showAlert({ BgColor: '#f2074e', Text: \`\${listCount} \u2716 Link Deleted\` })
              }
            } else {
              const errorData = await response.json() // Wait for the JSON error response
              console.error('Error from server:', errorData.error)
            }
          } catch (error) {
            console.error('Error deleting Link in Vercel KV:', error)
          }
        }
      }

      // Check if the same Link already exists in KV Cloud storage before saving a new one.
      async function checkLinkExistence() {
        const linkValue = document.getElementById('vid').value.trim()
        if (linkValue) {
          try {
            const response = await fetch('/checkLinkExistence', {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: linkValue,
            })
            if (response.ok) {
              const data = await response.json() // Wait for the JSON response.
              if (data.result == null) {
                showAlert({ BgColor: '#f403fc', Text: "\u2716 Link Doesn't Exist" })
              } else {
                showAlert({ BgColor: '#03ecfc', Text: '\u2714 Link Already Exists' })
              }
            } else {
              const errorData = await response.json() // Wait for the JSON error response
              console.error('Error from server:', errorData.error)
            }
          } catch (error) {
            console.error('Error deleting Link in Vercel KV:', error)
          }
        }
      }

      // Retrive the Links from KV Cloud storage.
      let textBoxArray = [], textBoxJsonData = []
      async function getLink() {
        try {
          const response = await fetch('/getLink')
          const data = await response.json()
          const box = document.getElementById('textBox')
          box.innerHTML = ''
          for (const [index, value] of data.result.entries()) {
            let div = document.createElement('div')
            div.className = 'txtDiv'
            div.innerText = \`\${index + 1} \u25CF \${value}\`
            box.appendChild(div)
          }
          // Fetch the already saved data json.
          const blob = await fetch(
            'https://srbo3gia676hprqy.public.blob.vercel-storage.com/Others/KV-Store-Saved-TB-Link-Thumbnails.json',
          )
          const blobdata = await blob.json()
          textBoxJsonData = blobdata
          for (let item of blobdata) {
            const shortURL = item.url
            textBoxArray.push(shortURL)
          }
        } catch (error) {
          console.error('Error fetching or parsing data:', error)
        }
      }

      // Night-Mode toggle function.
      function nightModeFunction() {
        let element = document.body
        element.classList.toggle('nightMode')
      }

      // Keyboard Shortcuts for different Button clicks & Functions
      let arrowRightPressed = false
      document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          arrowRightPressed = true
        }
        if (arrowRightPressed) {
          if (event.key === 'ArrowUp') {
            saveLink()
          } else if (event.key === 'ArrowDown') {
            document.getElementById('button-play').click()
          } else if (event.key === 'ArrowLeft') {
            fetchPosts()
          } else if (event.key === 'End') {
            document.getElementById('clearBtn').click()
          }
        }
      })
      document.addEventListener('keyup', function (event) {
        if (event.key === 'ArrowRight') {
          arrowRightPressed = false
        }
      })

      // Try to read clipboard on clicking 'PLAY' button if no URL is given.
      async function checkClipboard() {
        var query = document.getElementById('vid').value.trim() // Trim whitespaces
        if (query === '') {
          // Check if the clipboard API is supported
          if (!navigator.clipboard) {
            console.error('Clipboard API not supported')
            return
          }
          // Try to read text from clipboard
          try {
            const text = await navigator.clipboard.readText()
            if (text.trim() === '') {
              alert('Please Enter URL First')
              return
            }
            document.getElementById('vid').value = text.trim() // Update the input field
            query = text.trim()
            return query
          } catch (err) {
            console.error('Failed to read clipboard contents:', err)
            if (err.name === 'NotAllowedError') {
              console.error('Permission to read clipboard denied')
            }
            return
          }
        } else {
          return query
        }
      }

      /*
// Iframe Play Method.
async function IFrame_Play() {
    const query = await checkClipboard();
    // Check if the URL contains 'Terabox'.
    if (/(teraboxapp|terasharelink|teraboxlink|terafileshare|1024terabox|teraboxshare|freeterabox)/.test(query.toLowerCase())) {
        const shortURL = query.split('/').slice(-1)[0];
        const jsonData = await getTboxAPI(shortURL);
            const { shareid, uk } = jsonData;
            const { fs_id } = jsonData.list[0];
            const playUrl = \`https://www.terabox1024.com/share/extstreaming.m3u8?uk=\${uk}&shareid=\${shareid}&type=M3U8_AUTO_360&fid=\${fs_id}&sign=1&timestamp=1&clienttype=1&channel=1\`;
            // window.open(playUrl, 'videoFrame', 'noopener,noreferrer');
	    document.getElementById('embedVideo').src = playUrl;
	    adjustIframeStyles();
    } else {
        // Not a terabox URL, play as usual
        document.getElementById("player").src = query;
        adjustStyles();
    }
}
      */

      async function CloudFlare_Play() {
        const query = await checkClipboard()
        if (query.toLowerCase().includes('.com/s/1')) {
          const shortURL = query.split('/').slice(-1)[0]
          if (!localStorage.getItem('Cloudflare-Access-Token')) {
            const cfToken = prompt("Enter The 'Cloudflare-Access-Token' :")
            localStorage.setItem('Cloudflare-Access-Token', cfToken)
          }
          const cfToken = localStorage.getItem('Cloudflare-Access-Token')
          document.getElementById('player').src = 'https://tbox.1nrp.workers.dev?URL=' + shortURL +
            '&CacheOption=No&AccessToken=' + cfToken
          document.getElementById('player').style.maxHeight = '85dvh'
          //adjustStyles();
        } else {
          // Not a terabox URL, play as usual.
          document.getElementById('player').src = query
          //adjustStyles();
        }
      }

      // MdiskPlay method.
      async function Mdisk_Play() {
        const query = await checkClipboard()
        if (
          /(teraboxapp|terasharelink|teraboxlink|terafileshare|1024terabox|teraboxshare|freeterabox)/.test(
            query.toLowerCase(),
          )
        ) {
          var videoId = query.split('/').slice(-1)[0]
          // Remove the first character, assuming it's always same(1).
          videoId = videoId.substring(1)
          //var requestUrl = "https://mdiskplay.com/terabox/" + videoId + "?nid=m6rjtuvntneaqnlhir";
          //document.getElementById('dummyIframe').src = requestUrl;
          var requestUrl = 'https://core.mdiskplay.com/box/terabox/' + videoId + '?aka=baka'
          var response = await fetch(requestUrl)
          document.getElementById('player').style.maxHeight = '85dvh'
          document.getElementById('player').src = 'https://video.mdiskplay.com/' + videoId + '.m3u8'
          //adjustStyles();
        } else {
          // Not a terabox URL, play as usual.
          document.getElementById('player').src = query
          //adjustStyles();
        }
      }

      // (Vercel Serverless Function Method) PLAY Video Function.
      async function Vercel_Play() {
        const query = await checkClipboard()
        // Check if the URL contains 'Terabox'
        if (
          /(teraboxapp|terasharelink|teraboxlink|terafileshare|1024terabox|teraboxshare|freeterabox)/.test(
            query.toLowerCase(),
          )
        ) {
          // Extract the video ID from the URL
          var videoId = query.split('/').slice(-1)[0]
          if (!localStorage.getItem('Vercel-Access-Token')) {
            const token = prompt("Enter The 'Vercel-Access-Token' :")
            localStorage.setItem('Vercel-Access-Token', token)
          }
          const token = localStorage.getItem('Vercel-Access-Token')
          const playUrl = \`/getM3U8?URL=\${videoId}&AccessToken=\${token}\`
          document.getElementById('player').style.maxHeight = '85dvh'
          document.getElementById('player').src = playUrl
          //adjustStyles();
          console.error('Error fetching or processing:', error)
          alert('Failed to fetch M3U8 File. Please try again later.')
        } else {
          // Not a terabox URL, play as usual
          document.getElementById('player').src = query
          //adjustStyles();
        }
      }

      // Repetitive code for height and display adjustment in 'PLAY' functions.
      function adjustIframeStyles() {
        document.getElementById('player').src = ''
        document.getElementById('player').style.display = 'none'
        document.getElementById('embedVideo').style.height = '85dvh'
        document.getElementById('embedVideo').style.display = 'block'
      }
      function adjustStyles() {
        document.getElementById('embedVideo').src = ''
        document.getElementById('embedVideo').style.display = 'none'
        document.getElementById('player').style.display = 'block'
        document.getElementById('player').style.maxHeight = '85dvh'
        document.getElementById('player').play()
      }

      // Function for fetching Terabox API with another retry if initial request fails.
      async function getTboxAPI(shortURL) {
        const maxAttempts = 2 // Max retries.
        let attempts = 0
        let params
        while (attempts < maxAttempts) {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 3000) // Abort after 3 seconds if response is not yet received.
          try {
            // **Without CORS Bypass (Tampermonkey). Using server-side proxy.
            // **const response = await fetch(\`/CORS-Proxy?URL=\${encodeURIComponent(\`https://www.terabox.app/api/shorturlinfo?shorturl=\${shortURL}&root=1\`)}\`, {
            const response = await fetch(
              \`https://www.terabox.app/api/shorturlinfo?&shorturl=\${shortURL}&root=1\`,
              {
                signal: controller.signal,
              },
            )
            clearTimeout(timeoutId) // Clear the timeout if response is received.
            if (!response.ok) {
              throw new Error('Failed to fetch data from Terabox API.')
            }
            const jsonData = await response.json()
            return jsonData // Exit the loop and return jsonData to the functions that passed the shortURL to this function, if fetch is successful.
          } catch (error) {
            clearTimeout(timeoutId) // Clear the timeout if there's an error
            attempts++
            if (attempts >= maxAttempts) {
              alert('Failed to fetch data from Terabox API. Please try again later.')
              return // Exit the function if retry attempts are exhausted
            }
          }
        }
      }

      // Telegram Post fetching function.
      function createTelegramPost(channelName, messageID, tgContainer) {
        const script = document.createElement('script')
        script.async = true
        script.src = \`https://telegram.org/js/telegram-widget.js?22\`
        script.dataset.telegramPost = \`\${channelName}/\${messageID}\`
        script.dataset.width = \`100%\`
        script.dataset.userpic = \`false\`
        script.dataset.color = \`b4b4b4\`
        script.dataset.dark = \`1\`
        const postContainer = document.createElement('div')
        postContainer.className = 'TG-post-container'
        const button = document.createElement('button')
        button.className = 'TG-Play'
        button.textContent = 'PLAY'
        button.onclick = () => getIframeLink(postContainer.querySelector('script'))
        postContainer.appendChild(button)
        postContainer.appendChild(script)
        tgContainer.appendChild(postContainer)
        // Trigger rendering of Telegram widget.
        window.TelegramWidget && window.TelegramWidget.initWidget && window.TelegramWidget.initWidget(script)
      }
      function fetchSinglePost() {
        const tgContainer = document.getElementById('boxContainer')
        const channelName = document.getElementById('channelName').value
        const messageID = document.getElementById('messageID').value
        tgContainer.innerHTML = '' // Clear previous posts.
        createTelegramPost(channelName, messageID, tgContainer) // Fetch single post.
      }
      function loadNextPosts() {
        const tgContainer = document.getElementById('boxContainer')
        const channelName = document.getElementById('channelName').value
        const messageID = Number(document.getElementById('messageID').value) // 'Number' would make 'messageID' be treated as a number instead of a string at the time of adding "i" to it.
        for (let i = 0; i < 5; i += 1) { // "i++", "i += 1" & "i = i + 1" are same. Load 4 posts.(max value of "i < 5" is 4).
          const currentMessageID = messageID + i
          createTelegramPost(channelName, currentMessageID, tgContainer) // Fetch each of the given number of posts.
        }
        // Update message ID input field with the last calculated message ID.
        document.getElementById('messageID').value = messageID + 4
      }

      // Event listener to get the Last Message's ID of the selected Telegram Channel.
      // The below code snippet is programmed to start showing from 100 posts before the last post in these Telegram Channels.
      document.getElementById('channelName').addEventListener('change', async function () {
        async function getMessageID() {
          const channelName = document.getElementById('channelName').value
          const TgChannel = 'https://t.me/s/' + channelName // Telegram Channel URL to fetch and parse.
          try {
            // **Without CORS Bypass (Tampermonkey). Using server-side proxy.
            // **const response = await fetch('/CORS-Proxy?URL=' + encodeURIComponent(TgChannel));
            const response = await fetch(TgChannel)
            const htmlText = await response.text()
            // Parse the HTML content
            const parser = new DOMParser()
            const doc = parser.parseFromString(htmlText, 'text/html')
            // Extract all anchor/link tags
            const anchors = doc.querySelectorAll('a')
            let lastMessage = '' // Variable to store the last matching link.
            // Iterate over anchor tags to find the last matching link
            anchors.forEach((anchor) => {
              const href = anchor.href
              if (channelKeywords.some((channelKeyword) => href.includes(channelKeyword))) {
                lastMessage = href // Update lastMessage with the latest match
              }
            })
            // Extract the messageID which is after the last '/'
            if (lastMessage) {
              const numberAfterSlash = lastMessage.lastIndexOf('/')
              const messageNumber = lastMessage.substring(numberAfterSlash + 1) - 110
              document.getElementById('messageID').value = messageNumber
            } else {
              alert('No Link in the Message ID format was found.')
            }
          } catch (error) {
            alert("Error fetching Telegram Channel's source code.")
            console.error('Error fetching the source code of the selected Telegram Channel:', error)
          }
        }
        await getMessageID()
      })

      // Extract the TB Link from the Telegram post.
      async function getIframeLink(script) {
        // Retrieve iframe source from script's data attribute.
        const iframeSrc = script.dataset.telegramPost
        const iframe = document.querySelector(\`iframe[src*="\${iframeSrc}"]\`)
        if (!iframe) {
          alert('Iframe not found.')
          return
        }
        const src = iframe.src
        try {
          // **Without CORS Bypass (Tampermonkey). Using server-side proxy.
          // **const response = await fetch('/corsproxy?URL=' + encodeURIComponent(src));
          const response = await fetch(src)
          const htmlText = await response.text()
          // Parse the HTML and extract anchor tags.
          const parser = new DOMParser()
          const doc = parser.parseFromString(htmlText, 'text/html')
          const anchors = doc.querySelectorAll('a')
          // Filter anchor tags containing TB Links.
          const keywords = [
            'teraboxapp',
            'teraboxshare',
            'terafileshare',
            'teraboxlink',
            'terasharelink',
            '1024terabox',
            'freeterabox',
          ]
          let found = false
          let TBoxLink = ''
          anchors.forEach((anchor) => {
            const href = anchor.href
            if (keywords.some((keyword) => href.includes(keyword))) {
              TBoxLink = href
              found = true
            }
          })
          if (found) {
            document.getElementById('vid').value = TBoxLink
            document.getElementById('button-play').click()
          } else {
            alert('No TB Link was found.')
          }
        } catch (error) {
          alert('Error fetching the URL. Please make sure the URL is correct.')
          console.error('Error fetching HTML:', error)
        }
      }

      // Logic for toggling the mode between 'storing' and 'deleting' Link.
      const textBox = document.getElementById('textBox')
      const placeholder = document.getElementById('vid')
      let clickCount = 0
      let clickTimer
      let deleteMode = false
      // Set initial mode to "Save"
      document.getElementById('saveDeleteBtn').innerText = '\u{1F310}'
      // Handle "saveDeleteBtn" button click
      function handleButtonClick() {
        clickCount++
        clearTimeout(clickTimer)
        clickTimer = setTimeout(() => {
          if (clickCount >= 3) {
            toggleMode()
          } else {
            if (deleteMode) {
              deleteLink()
            } else {
              saveLink()
            }
          }
          clickCount = 0
        }, 600) // 3 clicks in 0.6 second or 600 milliseconds.
      }

      // Function to toggle between paste and copy modes
      function toggleMode() {
        deleteMode = !deleteMode
        document.getElementById('saveDeleteBtn').innerText = deleteMode ? '\u{1F5D1}\uFE0F' : '\u{1F310}'
      }
      document.getElementById('saveDeleteBtn').addEventListener('click', handleButtonClick)

      // Function to show Thumbnail and Paste LineText in link input field.
      function getLineText(event) {
        var numText = event.target.innerText
        var lineText = numText.split('\u25CF').slice(1)[0].trim()
        var linkNumber = numText.split('\u25CF').slice(0)[0]
        return { lineText, linkNumber }
      }
      // Show thumbnail function with 3 attempts to fetch the TB API if failed in the 1st or 2nd attempts.
      async function showThumbnail(lineText, linkNumber) {
        const shortURL = lineText.substring(lineText.lastIndexOf('/') + 1)
        const thumbnailContainer = document.getElementById('thumbnailContainer')
        document.getElementById('vid').value = lineText
        const index = textBoxArray.indexOf(shortURL)
        const img = index !== -1 ? textBoxJsonData[index].img : (await getTboxAPI(shortURL)).list[0].thumbs.url2
        thumbnailContainer.innerHTML =
          \`<img src="\${img}" class="thumbnail" onclick="textBoxLink('\${lineText}')" alt="Thumbnail Image"><span class="linkNumber">\${linkNumber}</span>\`
        thumbnailContainer.style.display = 'block'
        // Hide the Thumbnail container when clicking outside of it.
        document.addEventListener('click', function handleClickOutside(event) {
          if (!thumbnailContainer.contains(event.target)) {
            document.getElementById('thumbnailContainer').style.display = 'none'
            document.removeEventListener('click', handleClickOutside)
          }
        })
      }

      let clickTimeout // ,highlightedDiv;
      const clickDelay = 0
      document.getElementById('textBox').addEventListener('click', function (event) {
        const targetDiv = event.target.closest('.txtDiv')
        //if (highlightedDiv) { highlightedDiv.style.backgroundColor = null };
        targetDiv.style.backgroundColor = '#405580'
        targetDiv.style.color = '#aaa'
        //highlightedDiv = targetDiv;
        if (clickTimeout) {
          clearTimeout(clickTimeout)
          clickTimeout = null
          var { lineText } = getLineText(event)
          textBoxLink(lineText)
        } else {
          clickTimeout = setTimeout(function () {
            clickTimeout = null
            const { lineText, linkNumber } = getLineText(event)
            showThumbnail(lineText, linkNumber)
          }, clickDelay)
        }
      })
      // Function to handle clicking on the Thumbnail.
      function textBoxLink(lineText) {
        const linkID = lineText.split('/').slice(-1)[0]
        if (!localStorage.getItem('Cloudflare-Access-Token')) {
          const cfToken = prompt("Enter The 'Cloudflare-Access-Token' :")
          localStorage.setItem('Cloudflare-Access-Token', cfToken)
        }
        const cfToken = localStorage.getItem('Cloudflare-Access-Token')
        document.getElementById('vid').value = lineText
        document.getElementById('player').style.maxHeight = '85dvh'
        document.getElementById('player').src = 'https://tbox.1nrp.workers.dev?URL=' + linkID +
          '&CacheOption=Yes&AccessToken=' + cfToken
        document.getElementById('thumbnailContainer').style.display = 'none'
      }

      // Function to load posts from the 9000 JSON items with 3rd party "Imagekit" thumbnail service.
      async function returnRandomPosts() {
        const localStorageKey = 'jsonTBLinks'
        const url = 'https://1nrp.github.io/vid/9000_Links_Min.json'
        const count = 2 // Number of items to fetch at once.
        let jsonData = localStorage.getItem(localStorageKey)
        if (jsonData) {
          data = JSON.parse(jsonData)
        } else {
          try {
            const response = await fetch(url)
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            data = await response.json()
            // Store the fetched data in local storage to avoid frequent fetching of the json file.
            localStorage.setItem(localStorageKey, JSON.stringify(data))
          } catch (error) {
            console.error('Failed to fetch data:', error)
            return null
          }
        }
        // Randomly pick unique items.
        const randomItems = []
        const indices = new Set()
        while (randomItems.length < count && randomItems.length < data.items.length) {
          const randomIndex = Math.floor(Math.random() * data.items.length)
          if (!indices.has(randomIndex)) {
            indices.add(randomIndex)
            randomItems.push(data.items[randomIndex])
          }
        }
        return randomItems
      }
      async function fetchPosts() {
        const postsContainer = document.getElementById('post-container')
        postsContainer.innerHTML = '' // Clear previous posts.
        const items = await returnRandomPosts()
        if (!items) return
        for (const item of items) {
          const key = item.key
          const link = item.link
          const durationInMinutes = Math.round(item.duration / 60)
          const sizeInMB = (item.size / (1024 * 1024 * 3)).toFixed(0) // Divide by 1024 twice for MB and divide by 3 because 360p streaming consumes 3 times less data.
          const postElement = document.createElement('div')
          postElement.classList.add('post')
          postElement.innerHTML = \`
        <div>
            <img src="https://ik.imagekit.io/media91/image/\${key}.jpg" alt="Poster" class="poster-image" onclick="handlePosterClick('\${link}')">
            <div class="post-details">
            <p class="duration">\${durationInMinutes}<span style="color: #666;">&nbspMin</span></p>          
            <p class="size">\${sizeInMB}<span style="color: #666;">&nbspMB</span></p>
        </div>
        </div>
        \`
          postsContainer.appendChild(postElement)
        }
      }

      /*
// Function to load posts from the 9000 JSON items with my own "Imagekit" thumbnail service.
 async function returnRandomPosts() {
    const localStorageKey = 'tbJsonLinks';
    const url = 'https://1nrp.github.io/vid/TB_JSON_Min.json';
    const count = 2; // Number of items to fetch at once.
    let jsonData = localStorage.getItem(localStorageKey);
    if (jsonData) {
        data = JSON.parse(jsonData);
    } else {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            data = await response.json();
            // Store the fetched data in local storage to avoid frequent fetching of the json file.
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to fetch data:', error);
            return null;
        }
    }
    // Randomly pick unique items.
    const randomItems = [];
    const indices = new Set();
    while (randomItems.length < count && randomItems.length < data.items.length) {
        const randomIndex = Math.floor(Math.random() * data.items.length);
        if (!indices.has(randomIndex)) {
            indices.add(randomIndex);
            randomItems.push(data.items[randomIndex]);
        }
    }
    return randomItems;   //*** return { items: randomItems }; // Return the items in an object with key "items" in json format.
}
function fetchPosts() {
  const postsContainer = document.getElementById('post-container');
  postsContainer.innerHTML = ''; // Clear previous posts.
    returnRandomPosts()
        .then(items => {  //*** .then(result) => { if (!result) return; const items = result.items; items.forEach(item => {......
            if (!items) return;
            items.forEach(item => {
                    const link = item.link;
                    const durationInMinutes = item.time;
                    const sizeInMB = (item.size / 3).toFixed(0); // Divide by 3 because 360p streaming consumes 3 times less data.
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = \`
                        <div>
                          <img src="https://ik.imagekit.io/TBoxLinks/TB-Links/\${link}.jpg" alt="Poster" class="poster-image" onclick="handlePosterClick('\${link}')">
                            <div class="post-details">
                            <p class="duration">\${durationInMinutes}<span style="color: #666;">&nbspMin</span></p>
                            <p class="size">\${sizeInMB}<span style="color: #666;">&nbspMB</span></p>
                          </div>
                        </div>
                         \`;
                       postsContainer.appendChild(postElement);
                    });8
          });
}
      */

      // Function to handle clicking on the Poster.
      function handlePosterClick(link) {
        document.getElementById('vid').value = 'https://teraboxapp.com/s/' + link
        //document.getElementById('vid').value = link;
        document.getElementById('button-play').click()
      }

      // Show or Hide Hamburger menu box.
      function menuBox() {
        const alertBox = document.getElementById('menuBox')
        if (alertBox.style.display === 'block') {
          alertBox.style.display = 'none'
        } else {
          alertBox.style.display = 'block'
        }
      }
      // Hide menuBox when clicked on it.
      document.addEventListener('click', function (event) {
        const menuBox = document.getElementById('menuBox')
        const menu = document.getElementById('hamburgerMenu')
        if (menuBox && menuBox.style.display === 'block' && !menu.contains(event.target)) {
          setTimeout(() => {
            menuBox.style.display = 'none'
          }, 300)
        }
      })

      /*
// Progressive Web App Service Worker Registration.
window.addEventListener('load', () => {
  registerSW();
});
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('PWA/serviceWorker.js');
      console.log('Service Worker registration successful with scope: ', registration.scope);
    } catch (e) {
      console.log('Service Worker registration failed:', e);
    }
  }
}
      */
    <\/script>
  </body>
</html>
`;var u=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" sizes="192x192" href="https://1nrp.github.io/1/Images/N-Logo1.png">
    <title>Nihar's JS Notebook</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        background-color: #0d203040;
        padding: 0;
      }
      input:focus, /* Remove Focused element's border outline. */
      select:focus,
      textarea:focus {
        outline: 0;
      }
      .toolbar {
        padding: 4px;
        background-color: #00200020;
        border-bottom: 2px solid #34a054;
      }
      .toolbar input {
        font-size: 16px;
        border: 2px solid #34a054;
        background-color: #00400040;
        border-radius: 5px;
        padding: 5px;
      }
      .toolbar button {
        padding: 2px 6px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 5px;
        background-color: #00400040;
        border: 2px solid #34a054;
      }
      .toolbar button:hover {
        background-color: #23974060;
      }
      .cell {
        border: none;
        margin: 2px;
        width: 97%;
        height: auto;
        border-radius: 4px;
      }
      .code-editor {
        height: 100%;
        width: 99%;
        border-radius: 4px;
        resize: none;
        color: #eee;
        direction: ltr;
        text-wrap: wrap;
        overflow-y: hidden;
        background-color: #1759d840;
        border: none;
        min-height: 40px;
      }
      .code-cell, .text-cell {
        position: relative;
        border: 2px solid #2e633540;
        border-radius: 4px;
        overflow-y: visible;
        min-height: 40px;
      }
      .cell-buttons {
        position: absolute;
        top: 2px;
        right: 4px;
        display: flex;
        gap: 25px;
        z-index: 20;
        margin-top: 6px;
        background-color: #4c8fb680;
        border: 2px solid #157c23;
        padding: 6px;
        opacity: 0.2;
        border-radius: 4px;
      }
      .cell-buttons:hover {
        background-color: #444;
        opacity: 1;
      }
      .output {
        overflow-y: visible;
        width: 98%;
      }
      .logDiv {
        font-family: 'Times New Roman', Times, sans-serif;
        border-top: 1px solid #33558880;
        padding: 4px;
        width: 100%;
        font-size: 14px;
        text-wrap: wrap;
        margin: 4px 0px;
        background-color: #02103020;
      }
      .errorDiv {
        color: #ddd;
        border: 1px solid #d00;
        padding: 4px;
        margin: 4px 0px;
        background-color: #40000040;
      }
      .minimized {
        max-height: 40px;
      }
      .markdown-render {
        padding: 10px;
        background: #fff;
        border: 1px dashed #ccc;
        border-radius: 5px;
      }
      .Alerts {
        position: fixed;
        /* top: 5dvh; */
        left: 20dvw;
        z-index: 50;
        background-color: #fff;
        color: #000;
        font-weight: 1000;
        padding: 5px;
        border: none;
        border-radius: 5px;
        animation-name: Alert;
        animation-duration: 1s;
      }
      /* Animations */
      @keyframes Alert {
        from {
          font-size: 5px;
          top: 0dvh;
        } /* transform: rotate(30deg)} */
        to {
          font-size: 20px;
          top: 10dvh;
        } /* transform: rotate(0deg)} */
      }
    </style>
  </head>
  <body>
    <div class="toolbar">
      <input
        style="display: none; margin: 0px 0px 4px 0px"
        id="notebook-title"
        placeholder="Untitled Notebook"
        value="Untitled Notebook"
      >
      <div>
        <button onclick="createCodeCell()" style="padding: 3px 6px">+ CODE</button>
        <button
          id="show-title"
          style="padding: 3px 6px"
          onclick="showNotebookList(); document.getElementById('notebook-title').style.display = (document.getElementById('notebook-title').style.display == 'none') ? 'block' : 'none';"
        >
          TOGGLE
        </button>
        <button onclick="setLocal()" style="margin-left: 6px">\u25BC SET</button>
        <button onclick="getLocal()" style="margin-left: 6px">\u25B2 GET</button>
        <button style="margin: 0px 0px 0px 10px" onclick="saveNotebook()">\u25B2</button>
        <button onclick="getNotebook()">\u25BC</button>
      </div>
    </div>
    <div id="notebook"></div>

    <script>
      document.addEventListener('input', (event) => {
        if (event.target.classList.contains('code-editor')) {
          adjustTextareaHeight(event.target)
        }
      })
      function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto' // Reset the height.
        textarea.style.height = \`\${textarea.scrollHeight}px\` // Set height based on content.
      }
      // Show Alert Function.
      function showAlert({ BgColor = '#fff', Text = 'Alert' } = {}) {
        var alertBox = document.createElement('div')
        alertBox.className = 'Alerts'
        alertBox.style.backgroundColor = BgColor
        alertBox.textContent = Text
        document.body.appendChild(alertBox)
        setTimeout(() => {
          alertBox.remove()
        }, 1000)
      }

      // Editor settings.
      let cellCounter = 0
      let textCounter = 0
      const notebook = document.getElementById('notebook')
      function createCodeCell() {
        const cellId = \`cell-\${++cellCounter}\`
        const textId = \`text-\${++textCounter}\`
        const cell = document.createElement('div')
        cell.classList.add('cell', 'code-cell')
        cell.id = cellId
        cell.innerHTML = \`
        <button class="cell-buttons" style="margin:0px 120px 0px 0px" onclick="runCode('\${cellId}')">\u2699\uFE0F</button>
        <button class="cell-buttons" style="margin:0px 60px 0px 0px" onclick="minimizeCell('\${cellId}', '\${textId}')">\u25B6\uFE0F</button>
        <button class="cell-buttons" onclick="deleteCell('\${cellId}')">\u274C</button>

        <textarea id="\${textId}" class="code-editor" spellcheck=false></textarea>
        <div class="output"></div>
      \`
        notebook.appendChild(cell)
        const editor = cell.querySelector('.code-editor')
        cell.editor = editor
      }

      async function runCode(cellId) {
        const cell = document.getElementById(cellId)
        const output = cell.querySelector('.output')
        output.innerHTML = ''

        const cleanup = redirectConsole(output)
        try {
          const code = cell.editor.value
          await new Function(\`return (async () => { \${code} })()\`)()
        } catch (err) {
          console.error(err.message)
        }
        cleanup()
      }

      function redirectConsole(output) {
        const originalLog = console.log
        const originalError = console.error

        // Override console.log().
        console.log = (...args) => {
          const msg = document.createElement('div')
          msg.className = 'logDiv'
          msg.textContent = args.join('')
          output.appendChild(msg)
          // originalLog.apply(console, args); // Also log to real console.
        }

        // Override console.error
        console.error = (...args) => {
          const msg = document.createElement('div')
          msg.className = 'errorDiv'
          msg.textContent = '\xBB ' + args.join('')
          output.appendChild(msg)
          // originalError.apply(console, args); // Also log to real console.
        }

        // Create global log() and error() functions.
        window.log = (...args) => console.log(...args)
        window.n = (...args) => console.log(...args) // Even shorter and quicker log function than the above "log()".
        window.error = (...args) => console.error(...args)

        // Returns a function that can be called to restore the original console.log and console.error.
        return () => {
          console.log = originalLog
          console.error = originalError
          // delete window.n;
          // delete window.log;
          // delete window.error;
        }
      }

      function minimizeCell(cellId, textId) {
        const cell = document.getElementById(cellId)
        const text = document.getElementById(textId)
        text.classList.toggle('minimized')
        cell.classList.toggle('minimized')
      }

      function deleteCell(cellId) {
        const cell = document.getElementById(cellId)
        cell.remove()
      }

      function setLocal() {
        if (!confirm('Do You Want To Set The Current Notebook With The Given Title To Local Storage ?')) return

        const title = document.getElementById('notebook-title').value.trim()
        if (!title || title == 'Untitled Notebook') {
          alert('Please give a Title to the Notebook.')
          return
        }
        const content = { title, cells: [] }
        notebook.querySelectorAll('.cell').forEach((cell) => {
          if (cell.classList.contains('code-cell')) {
            content.cells.push({ type: 'code', content: cell.editor?.value || '' })
          } else if (cell.classList.contains('text-cell')) {
            const markdown = cell.querySelector('.markdown-editor')?.value || ''
            content.cells.push({ type: 'text', content: markdown })
          }
        })
        try {
          localStorage.setItem(\`JSNB-\${title}\`, JSON.stringify(content))
          showAlert({ BgColor: '#3705eb', Text: '\u2714 Saved Locally' })
        } catch (error) {
          showAlert({ BgColor: '#f2074e', Text: '\u2716 Saving Failed' })
        }
      }

      function showNotebookList() {
        createCodeCell()
        const showListsCode = \`// List All Notebooks.
for (let i = 0; i < localStorage.length; i++) {
   let key = localStorage.key(i);
   if (key.startsWith('JSNB')) {
      console.log(key);
   }
}

const outputDiv = document.getElementsByClassName('output')[0];
outputDiv.addEventListener('click', function(event) { 
    let ID = event.target.closest('.logDiv').textContent; 
    finalID = ID.replaceAll('JSNB-', ''); 
    document.getElementById('notebook-title').value = finalID;
}) \`
        notebook.lastChild.editor.value = showListsCode
      }

      function getLocal() {
        const notebookName = document.getElementById('notebook-title').value.trim()
        if (!notebookName) {
          alert('Please enter a notebook title.')
          return
        }
        const localNote = localStorage.getItem(\`JSNB-\${notebookName}\`)
        if (localNote) {
          const content = JSON.parse(localNote) // Parse the local storage string into JSON
          document.getElementById('notebook-title').value = content.title
          notebook.innerHTML = '' // Clear the notebook content.
          content.cells.forEach((cell) => {
            if (cell.type === 'code') {
              createCodeCell()
              if (notebook.lastChild && notebook.lastChild.editor) {
                notebook.lastChild.editor.value = cell.content // Set the content of the code cell
              }
            }
          })
        } else {
          alert('Notebook not found in Local Storage.')
        }
      }

      // Upload Notebook to KV.
      async function saveNotebook() {
        const check = confirm('Is This The Browser Where All Notebooks Are Saved In Local Storage ?')
        if (!check) return

        notebook.innerHTML = '' // "notebook" is defined at the start of the script.
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i)
          if (key.startsWith('JSNB')) {
            const json = JSON.parse(localStorage.getItem(key))
            json.cells.forEach((cell) => {
              if (cell.type === 'code') {
                createCodeCell()
                notebook.lastChild.editor.value = '// ' + key + '\\n' + cell.content
              }
            })
          }
        }

        const content = { title: 'ALL-NOTEBOOKS', cells: [] }
        notebook.querySelectorAll('.cell').forEach((cell) => {
          if (cell.classList.contains('code-cell')) {
            content.cells.push({ type: 'code', content: cell.editor.value })
          }
        })

        try {
          const response = await fetch('/jsnb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content, null, 2),
          })
          if (response.status === 401) {
            showAlert({ BgColor: '#f403fc', Text: '\u2716 Login First' })
            return
          } else if (response.ok) {
            showAlert({ BgColor: '#1bd13d', Text: \`\u2714 Notebook Saved\` })
          } else {
            alert('Error from server:', await response.text())
          }
        } catch (error) {
          console.error('Error sending Notebook to Vercel KV:', error)
        }
      }

      // Fetch Notebook from Vercel KV.
      async function getNotebook() {
        const response = await fetch('/jsnb')
        if (response.status === 401) {
          showAlert({ BgColor: '#f403fc', Text: '\u2716 Login First' })
          return
        }

        const data = await response.json()
        const content = JSON.parse(data.result)
        document.getElementById('notebook-title').value = content.title
        notebook.innerHTML = ''
        console.log('JSON File: ', content)
        content.cells.forEach((cell) => {
          if (cell.type === 'code') {
            createCodeCell()
            notebook.lastChild.editor.value = cell.content
          }
        })
      }
    <\/script>
  </body>
</html>
`;var m=`;(() => {
  var De = Object.create
  var te = Object.defineProperty
  var Xe = Object.getOwnPropertyDescriptor
  var ze = Object.getOwnPropertyNames
  var We = Object.getPrototypeOf, Je = Object.prototype.hasOwnProperty
  var B = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports)
  var Ge = (e, t, r, n) => {
    if (t && typeof t == 'object' || typeof t == 'function') {
      for (let s of ze(t)) {
        !Je.call(e, s) && s !== r && te(e, s, { get: () => t[s], enumerable: !(n = Xe(t, s)) || n.enumerable })
      }
    }
    return e
  }
  var q = (
    e,
    t,
    r,
  ) => (r = e != null ? De(We(e)) : {},
    Ge(t || !e || !e.__esModule ? te(r, 'default', { value: e, enumerable: !0 }) : r, e))
  var ae = B((Vt, oe) => {
    oe.exports = function (t) {
      return t != null && t.constructor != null && typeof t.constructor.isBuffer == 'function' &&
        t.constructor.isBuffer(t)
    }
  })
  var ie = B((Ft, se) => {
    function g(e, t) {
      typeof t == 'boolean' && (t = { forever: t }),
        this._originalTimeouts = JSON.parse(JSON.stringify(e)),
        this._timeouts = e,
        this._options = t || {},
        this._maxRetryTime = t && t.maxRetryTime || 1 / 0,
        this._fn = null,
        this._errors = [],
        this._attempts = 1,
        this._operationTimeout = null,
        this._operationTimeoutCb = null,
        this._timeout = null,
        this._operationStart = null,
        this._timer = null,
        this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0))
    }
    se.exports = g
    g.prototype.reset = function () {
      this._attempts = 1, this._timeouts = this._originalTimeouts.slice(0)
    }
    g.prototype.stop = function () {
      this._timeout && clearTimeout(this._timeout),
        this._timer && clearTimeout(this._timer),
        this._timeouts = [],
        this._cachedTimeouts = null
    }
    g.prototype.retry = function (e) {
      if (this._timeout && clearTimeout(this._timeout), !e) return !1
      var t = new Date().getTime()
      if (e && t - this._operationStart >= this._maxRetryTime) {
        return this._errors.push(e), this._errors.unshift(new Error('RetryOperation timeout occurred')), !1
      }
      this._errors.push(e)
      var r = this._timeouts.shift()
      if (r === void 0) {
        if (this._cachedTimeouts) this._errors.splice(0, this._errors.length - 1), r = this._cachedTimeouts.slice(-1)
        else return !1
      }
      var n = this
      return this._timer = setTimeout(function () {
        n._attempts++,
          n._operationTimeoutCb && (n._timeout = setTimeout(function () {
            n._operationTimeoutCb(n._attempts)
          }, n._operationTimeout),
            n._options.unref && n._timeout.unref()),
          n._fn(n._attempts)
      }, r),
        this._options.unref && this._timer.unref(),
        !0
    }
    g.prototype.attempt = function (e, t) {
      this._fn = e, t && (t.timeout && (this._operationTimeout = t.timeout), t.cb && (this._operationTimeoutCb = t.cb))
      var r = this
      this._operationTimeoutCb && (this._timeout = setTimeout(function () {
        r._operationTimeoutCb()
      }, r._operationTimeout)),
        this._operationStart = new Date().getTime(),
        this._fn(this._attempts)
    }
    g.prototype.try = function (e) {
      console.log('Using RetryOperation.try() is deprecated'), this.attempt(e)
    }
    g.prototype.start = function (e) {
      console.log('Using RetryOperation.start() is deprecated'), this.attempt(e)
    }
    g.prototype.start = g.prototype.try
    g.prototype.errors = function () {
      return this._errors
    }
    g.prototype.attempts = function () {
      return this._attempts
    }
    g.prototype.mainError = function () {
      if (this._errors.length === 0) return null
      for (var e = {}, t = null, r = 0, n = 0; n < this._errors.length; n++) {
        var s = this._errors[n], a = s.message, o = (e[a] || 0) + 1
        e[a] = o, o >= r && (t = s, r = o)
      }
      return t
    }
  })
  var le = B((k) => {
    var Ye = ie()
    k.operation = function (e) {
      var t = k.timeouts(e)
      return new Ye(t, {
        forever: e && (e.forever || e.retries === 1 / 0),
        unref: e && e.unref,
        maxRetryTime: e && e.maxRetryTime,
      })
    }
    k.timeouts = function (e) {
      if (e instanceof Array) return [].concat(e)
      var t = { retries: 10, factor: 2, minTimeout: 1 * 1e3, maxTimeout: 1 / 0, randomize: !1 }
      for (var r in e) t[r] = e[r]
      if (t.minTimeout > t.maxTimeout) throw new Error('minTimeout is greater than maxTimeout')
      for (var n = [], s = 0; s < t.retries; s++) n.push(this.createTimeout(s, t))
      return e && e.forever && !n.length && n.push(this.createTimeout(s, t)),
        n.sort(function (a, o) {
          return a - o
        }),
        n
    }
    k.createTimeout = function (e, t) {
      var r = t.randomize ? Math.random() + 1 : 1, n = Math.round(r * Math.max(t.minTimeout, 1) * Math.pow(t.factor, e))
      return n = Math.min(n, t.maxTimeout), n
    }
    k.wrap = function (e, t, r) {
      if (t instanceof Array && (r = t, t = null), !r) {
        r = []
        for (var n in e) typeof e[n] == 'function' && r.push(n)
      }
      for (var s = 0; s < r.length; s++) {
        var a = r[s], o = e[a]
        e[a] = function (c) {
          var d = k.operation(t), l = Array.prototype.slice.call(arguments, 1), m = l.pop()
          l.push(function (y) {
            d.retry(y) || (y && (arguments[0] = d.mainError()), m.apply(this, arguments))
          }),
            d.attempt(function () {
              c.apply(e, l)
            })
        }.bind(e, o), e[a].options = t
      }
    }
  })
  var ue = B((Xt, ce) => {
    ce.exports = le()
  })
  var fe = B((zt, de) => {
    var Ke = ue()
    function je(e, t) {
      function r(n, s) {
        var a = t || {}, o
        'randomize' in a || (a.randomize = !0), o = Ke.operation(a)
        function i(l) {
          s(l || new Error('Aborted'))
        }
        function c(l, m) {
          if (l.bail) {
            i(l)
            return
          }
          o.retry(l) ? a.onRetry && a.onRetry(l, m) : s(o.mainError())
        }
        function d(l) {
          var m
          try {
            m = e(i, l)
          } catch (y) {
            c(y, l)
            return
          }
          Promise.resolve(m).then(n).catch(function (p) {
            c(p, l)
          })
        }
        o.attempt(d)
      }
      return new Promise(r)
    }
    de.exports = je
  })
  var z = B((Jt, pe) => {
    function Ze(e, t) {
      if (typeof e != 'function') {
        throw new TypeError('Expected the first argument to be a function.')
      }
      let r, n = 0
      return function (...a) {
        clearTimeout(r)
        let o = Date.now(), i = o - n, c = t - i
        c <= 0 ? (n = o, e.apply(this, a)) : r = setTimeout(() => {
          n = Date.now(), e.apply(this, a)
        }, c)
      }
    }
    pe.exports = Ze
  })
  function re() {
    if (typeof navigator < 'u' && navigator.product === 'ReactNative') return !0
    if (typeof process < 'u') {
      let e = process.type
      return e === 'renderer' || e === 'worker' ? !1 : !!(process.versions && process.versions.node)
    }
    return !1
  }
  var ne = {
    toWeb() {
      throw new Error(
        'Vercel Blob: Sorry, we cannot get a Readable stream in this environment. If you see this message please open an issue here: https://github.com/vercel/storage/ with details on your environment.',
      )
    },
  }
  var Te = q(ae(), 1), Pe = q(fe(), 1)
  var A = globalThis.fetch.bind(globalThis)
  var Ne = q(z(), 1),
    He = q(z(), 1),
    Qe = new Promise((e) => {
      try {
        let t = new Uint8Array([104, 101, 108, 108, 111])
        new Blob([t]).text().then((n) => {
          e(n === 'hello')
        }).catch(() => {
          e(!1)
        })
      } catch {
        e(!1)
      }
    })
  async function Ee(e) {
    if (e instanceof ReadableStream) return e
    if (e instanceof Blob) return e.stream()
    if (xe(e)) return ne.toWeb(e)
    let t
    return e instanceof ArrayBuffer ? t = new Uint8Array(e) : tt(e) ? t = e : t = et(e),
      await Qe ? new Blob([t]).stream() : new ReadableStream({
        start(r) {
          r.enqueue(t), r.close()
        },
      })
  }
  function xe(e) {
    return typeof e == 'object' && typeof e.pipe == 'function' && e.readable && typeof e._read == 'function' &&
      typeof e._readableState == 'object'
  }
  function et(e) {
    return new TextEncoder().encode(e)
  }
  function tt(e) {
    return (0, Te.default)(e)
  }
  var rt = /^((-|\\+)?(\\d+(?:\\.\\d+)?)) *(kb|mb|gb|tb|pb)$/i,
    nt = { b: 1, kb: 1024, mb: 1 << 20, gb: 1 << 30, tb: Math.pow(1024, 4), pb: Math.pow(1024, 5) }
  function w(e) {
    if (typeof e == 'number' && !isNaN(e)) return e
    if (typeof e != 'string') return null
    let t = rt.exec(e), r, n = 'b'
    if (!t) r = parseInt(e, 10)
    else {
      let [, s, , , a] = t
      if (!s) return null
      r = parseFloat(s), a && (n = a.toLowerCase())
    }
    return isNaN(r) ? null : Math.floor(nt[n] * r)
  }
  function Re(e) {
    if (e?.token) return e.token
    if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN
    throw new u(
      'No token found. Either configure the \`BLOB_READ_WRITE_TOKEN\` environment variable, or pass a \`token\` option to your calls.',
    )
  }
  var u = class extends Error {
    constructor(e) {
      super(\`Vercel Blob: \${e}\`)
    }
  }
  function G(e) {
    if (typeof e != 'object' || e === null) return !1
    let t = Object.getPrototypeOf(e)
    return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
  }
  var ot = ['#', '?', '//'],
    ke = (() => {
      if (re()) return !0
      let e = !1,
        t = new Request(Ue(), {
          body: new ReadableStream(),
          method: 'POST',
          get duplex() {
            return e = !0, 'half'
          },
        }).headers.has('Content-Type')
      return e && !t
    })()
  function Ue(e = '') {
    let t = null
    try {
      t = process.env.VERCEL_BLOB_API_URL || process.env.NEXT_PUBLIC_VERCEL_BLOB_API_URL
    } catch {}
    return \`\${t || 'https://blob.vercel-storage.com'}\${e}\`
  }
  var he = typeof TextEncoder == 'function' ? new TextEncoder() : null
  function Be(e) {
    return e
      ? typeof e == 'string'
        ? he ? he.encode(e).byteLength : new Blob([e]).size
        : 'byteLength' in e && typeof e.byteLength == 'number'
        ? e.byteLength
        : 'size' in e && typeof e.size == 'number'
        ? e.size
        : 0
      : 0
  }
  var at = (e, t) => {
    let r = new Uint8Array(0)
    return new TransformStream({
      transform(n, s) {
        queueMicrotask(() => {
          let a = new Uint8Array(r.length + n.byteLength)
          for (a.set(r), a.set(new Uint8Array(n), r.length), r = a; r.length >= e;) {
            let o = r.slice(0, e)
            s.enqueue(o), t?.(o.byteLength), r = r.slice(e)
          }
        })
      },
      flush(n) {
        queueMicrotask(() => {
          r.length > 0 && (n.enqueue(r), t?.(r.byteLength))
        })
      },
    })
  }
  function Se(e) {
    return globalThis.ReadableStream && e instanceof ReadableStream
  }
  function st(e) {
    return !!(Se(e) || xe(e))
  }
  var it = Object.prototype.toString,
    lt = (e) => it.call(e) === '[object Error]',
    ct = new Set([
      'network error',
      'Failed to fetch',
      'NetworkError when attempting to fetch resource.',
      'The Internet connection appears to be offline.',
      'Load failed',
      'Network request failed',
      'fetch failed',
      'terminated',
    ])
  function ut(e) {
    return e && lt(e) && e.name === 'TypeError' && typeof e.message == 'string'
      ? e.message === 'Load failed' ? e.stack === void 0 : ct.has(e.message)
      : !1
  }
  var Ae = !1, me, ye
  try {
    ;((me = process.env.DEBUG) != null && me.includes('blob') ||
      (ye = process.env.NEXT_PUBLIC_DEBUG) != null && ye.includes('blob')) && (Ae = !0)
  } catch {}
  function b(e, ...t) {
    Ae && console.debug(\`vercel-blob: \${e}\`, ...t)
  }
  var Ce = typeof A == 'function',
    dt = Ce && ke,
    ft = 64 * 1024,
    be = async ({ input: e, init: t, onUploadProgress: r }) => {
      b('using fetch')
      let n
      if (t.body) {
        if (r) {
          let a = await Ee(t.body),
            o = 0,
            i = at(ft, (c) => {
              o += c, r(o)
            })
          n = a.pipeThrough(i)
        } else n = t.body
      }
      let s = ke && n && st(n) ? 'half' : void 0
      return A(e, { ...t, ...t.body ? { body: n } : {}, duplex: s })
    },
    ge = typeof XMLHttpRequest < 'u',
    we = async ({ input: e, init: t, onUploadProgress: r }) => {
      b('using xhr')
      let n = null
      return t.body && (Se(t.body) ? n = await new Response(t.body).blob() : n = t.body),
        new Promise((s, a) => {
          let o = new XMLHttpRequest()
          if (
            o.open(t.method || 'GET', e.toString(), !0),
              r && o.upload.addEventListener('progress', (i) => {
                i.lengthComputable && r(i.loaded)
              }),
              o.onload = () => {
                var i
                if ((i = t.signal) != null && i.aborted) {
                  a(new DOMException('The user aborted the request.', 'AbortError'))
                  return
                }
                let c = new Headers()
                o.getAllResponseHeaders().trim().split(/[\\r\\n]+/).forEach((m) => {
                  let y = m.split(': '), p = y.shift(), _ = y.join(': ')
                  p && c.set(p.toLowerCase(), _)
                })
                let l = new Response(o.response, { status: o.status, statusText: o.statusText, headers: c })
                s(l)
              },
              o.onerror = () => {
                a(new TypeError('Network request failed'))
              },
              o.ontimeout = () => {
                a(new TypeError('Network request timed out'))
              },
              o.onabort = () => {
                a(new DOMException('The user aborted a request.', 'AbortError'))
              },
              t.headers && new Headers(t.headers).forEach((c, d) => {
                o.setRequestHeader(d, c)
              }),
              t.signal && (t.signal.addEventListener('abort', () => {
                o.abort()
              }),
                t.signal.aborted)
          ) {
            o.abort()
            return
          }
          o.send(n)
        })
    },
    pt = async ({ input: e, init: t, onUploadProgress: r }) => {
      if (r) {
        if (dt) return be({ input: e, init: t, onUploadProgress: r })
        if (ge) return we({ input: e, init: t, onUploadProgress: r })
      }
      if (Ce) return be({ input: e, init: t })
      if (ge) return we({ input: e, init: t })
      throw new Error('No request implementation available')
    },
    _e,
    ht = (_e = globalThis.DOMException) != null ? _e : (() => {
      try {
        atob('~')
      } catch (e) {
        return Object.getPrototypeOf(e).constructor
      }
    })(),
    ve = 950,
    mt = class extends u {
      constructor() {
        super('Access denied, please provide a valid token for this resource.')
      }
    },
    yt = class extends u {
      constructor(e) {
        super(\`Content type mismatch, \${e}.\`)
      }
    },
    bt = class extends u {
      constructor(e) {
        super(
          \`Pathname mismatch, \${e}. Check the pathname used in upload() or put() matches the one from the client token.\`,
        )
      }
    },
    gt = class extends u {
      constructor() {
        super('Client token has expired.')
      }
    },
    wt = class extends u {
      constructor(e) {
        super(\`File is too large, \${e}.\`)
      }
    },
    _t = class extends u {
      constructor() {
        super('This store does not exist.')
      }
    },
    vt = class extends u {
      constructor() {
        super('This store has been suspended.')
      }
    },
    Ie = class extends u {
      constructor() {
        super('Unknown error, please visit https://vercel.com/help.')
      }
    },
    Tt = class extends u {
      constructor() {
        super('The requested blob does not exist')
      }
    },
    V = class extends u {
      constructor() {
        super('The blob service is currently not available. Please try again.')
      }
    },
    Et = class extends u {
      constructor(e) {
        super(
          \`Too many requests please lower the number of concurrent requests \${
            e ? \` - try again in \${e} seconds\` : ''
          }.\`,
        ), this.retryAfter = e ?? 0
      }
    },
    xt = class extends u {
      constructor() {
        super('The request was aborted.')
      }
    },
    Rt = 8
  function kt() {
    let e = null
    try {
      e = process.env.VERCEL_BLOB_API_VERSION_OVERRIDE || process.env.NEXT_PUBLIC_VERCEL_BLOB_API_VERSION_OVERRIDE
    } catch {}
    return \`\${e ?? Rt}\`
  }
  function Ut() {
    try {
      let e = process.env.VERCEL_BLOB_RETRIES || '10'
      return parseInt(e, 10)
    } catch {
      return 10
    }
  }
  function Bt(e) {
    let t = e.headers.get('retry-after')
    return new Et(t ? parseInt(t, 10) : void 0)
  }
  async function St(e) {
    var t, r, n
    let s, a
    try {
      let i = await e.json()
      s = (r = (t = i.error) == null ? void 0 : t.code) != null ? r : 'unknown_error',
        a = (n = i.error) == null ? void 0 : n.message
    } catch {
      s = 'unknown_error'
    }
    a?.includes('contentType') && a.includes('is not allowed') && (s = 'content_type_not_allowed'),
      a?.includes('"pathname"') && a.includes('does not match the token payload') &&
      (s = 'client_token_pathname_mismatch'),
      a === 'Token expired' && (s = 'client_token_expired'),
      a?.includes('the file length cannot be greater than') && (s = 'file_too_large')
    let o
    switch (s) {
      case 'store_suspended':
        o = new vt()
        break
      case 'forbidden':
        o = new mt()
        break
      case 'content_type_not_allowed':
        o = new yt(a)
        break
      case 'client_token_pathname_mismatch':
        o = new bt(a)
        break
      case 'client_token_expired':
        o = new gt()
        break
      case 'file_too_large':
        o = new wt(a)
        break
      case 'not_found':
        o = new Tt()
        break
      case 'store_not_found':
        o = new _t()
        break
      case 'bad_request':
        o = new u(a ?? 'Bad request')
        break
      case 'service_unavailable':
        o = new V()
        break
      case 'rate_limited':
        o = Bt(e)
        break
      case 'unknown_error':
      case 'not_allowed':
      default:
        o = new Ie()
        break
    }
    return { code: s, error: o }
  }
  async function F(e, t, r) {
    let n = kt(),
      s = Re(r),
      a = Pt(),
      [, , , o = ''] = s.split('_'),
      i = \`\${o}:\${Date.now()}:\${Math.random().toString(16).slice(2)}\`,
      c = 0,
      d = 0,
      l = 0,
      m = r?.onUploadProgress || At()
    t.body && m && (d = Be(t.body)), r?.onUploadProgress && r.onUploadProgress({ loaded: 0, total: d, percentage: 0 })
    let y = await (0, Pe.default)(async (p) => {
      let _
      try {
        _ = await pt({
          input: Ue(e),
          init: {
            ...t,
            headers: {
              'x-api-blob-request-id': i,
              'x-api-blob-request-attempt': String(c),
              'x-api-version': n,
              ...m ? { 'x-content-length': String(d) } : {},
              authorization: \`Bearer \${s}\`,
              ...a,
              ...t.headers,
            },
          },
          onUploadProgress: r?.onUploadProgress
            ? (h) => {
              var S
              let E = d !== 0 ? d : h
              l = h
              let x = d > 0 ? Number((h / E * 100).toFixed(2)) : 0
              x === 100 && d > 0 || (S = r.onUploadProgress) == null ||
                S.call(r, { loaded: h, total: E, percentage: x })
            }
            : void 0,
        })
      } catch (h) {
        if (h instanceof ht && h.name === 'AbortError') {
          p(new xt())
          return
        }
        if (ut(h)) throw h
        if (h instanceof TypeError) {
          p(h)
          return
        }
        throw h
      }
      if (_.ok) return _
      let { code: U, error: T } = await St(_)
      if (U === 'unknown_error' || U === 'service_unavailable' || U === 'internal_server_error') throw T
      p(T)
    }, {
      retries: Ut(),
      onRetry: (p) => {
        p instanceof Error && b(\`retrying API request to \${e}\`, p.message), c = c + 1
      },
    })
    if (!y) throw new Ie()
    return r?.onUploadProgress && r.onUploadProgress({ loaded: l, total: l, percentage: 100 }), await y.json()
  }
  function Pt() {
    let e = {}
    try {
      'VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API' in process.env &&
        process.env.VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API !== void 0
        ? e['x-proxy-through-alternative-api'] = process.env.VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API
        : 'NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API' in process.env &&
          process.env.NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API !== void 0 &&
          (e['x-proxy-through-alternative-api'] = process.env.NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API)
    } catch {}
    return e
  }
  function At() {
    try {
      return process.env.VERCEL_BLOB_USE_X_CONTENT_LENGTH === '1'
    } catch {
      return !1
    }
  }
  var W = {
    cacheControlMaxAge: 'x-cache-control-max-age',
    addRandomSuffix: 'x-add-random-suffix',
    contentType: 'x-content-type',
  }
  function I(e, t) {
    let r = {}
    return e.includes('contentType') && t.contentType && (r[W.contentType] = t.contentType),
      e.includes('addRandomSuffix') && t.addRandomSuffix !== void 0 &&
      (r[W.addRandomSuffix] = t.addRandomSuffix ? '1' : '0'),
      e.includes('cacheControlMaxAge') && t.cacheControlMaxAge !== void 0 &&
      (r[W.cacheControlMaxAge] = t.cacheControlMaxAge.toString()),
      r
  }
  async function L({ pathname: e, options: t, extraChecks: r, getToken: n }) {
    if (!e) throw new u('pathname is required')
    if (e.length > ve) throw new u(\`pathname is too long, maximum length is \${ve}\`)
    for (let s of ot) if (e.includes(s)) throw new u(\`pathname cannot contain "\${s}", please encode it if needed\`)
    if (!t) throw new u('missing options, see usage')
    if (t.access !== 'public') throw new u('access must be "public"')
    return r && r(t), n && (t.token = await n(e, t)), t
  }
  function Le({ allowedOptions: e, getToken: t, extraChecks: r }) {
    return async (n, s, a) => {
      let o = await L({ pathname: n, options: a, extraChecks: r, getToken: t }), i = I(e, o)
      return Y({ uploadId: o.uploadId, key: o.key, pathname: n, headers: i, options: o, parts: s })
    }
  }
  async function Y({ uploadId: e, key: t, pathname: r, parts: n, headers: s, options: a }) {
    try {
      let o = await F(\`/mpu/\${r}\`, {
        method: 'POST',
        headers: {
          ...s,
          'content-type': 'application/json',
          'x-mpu-action': 'complete',
          'x-mpu-upload-id': e,
          'x-mpu-key': encodeURI(t),
        },
        body: JSON.stringify(n),
        signal: a.abortSignal,
      }, a)
      return b('mpu: complete', o), o
    } catch (o) {
      throw o instanceof TypeError && (o.message === 'Failed to fetch' || o.message === 'fetch failed') ? new V() : o
    }
  }
  function Me({ allowedOptions: e, getToken: t, extraChecks: r }) {
    return async (n, s) => {
      let a = await L({ pathname: n, options: s, extraChecks: r, getToken: t }), o = I(e, a), i = await K(n, o, a)
      return { key: i.key, uploadId: i.uploadId }
    }
  }
  async function K(e, t, r) {
    b('mpu: create', 'pathname:', e)
    try {
      let n = await F(\`/mpu/\${e}\`, {
        method: 'POST',
        headers: { ...t, 'x-mpu-action': 'create' },
        signal: r.abortSignal,
      }, r)
      return b('mpu: create', n), n
    } catch (n) {
      throw n instanceof TypeError && (n.message === 'Failed to fetch' || n.message === 'fetch failed') ? new V() : n
    }
  }
  function Oe({ allowedOptions: e, getToken: t, extraChecks: r }) {
    return async (n, s, a) => {
      let o = await L({ pathname: n, options: a, extraChecks: r, getToken: t }), i = I(e, o)
      if (G(s)) {
        throw new u(
          "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload.",
        )
      }
      return {
        etag: (await j({
          uploadId: o.uploadId,
          key: o.key,
          pathname: n,
          part: { blob: s, partNumber: o.partNumber },
          headers: i,
          options: o,
        })).etag,
        partNumber: o.partNumber,
      }
    }
  }
  async function j(
    {
      uploadId: e,
      key: t,
      pathname: r,
      headers: n,
      options: s,
      internalAbortController: a = new AbortController(),
      part: o,
    },
  ) {
    var i, c, d
    let l = F(\`/mpu/\${r}\`, {
      signal: a.signal,
      method: 'POST',
      headers: {
        ...n,
        'x-mpu-action': 'upload',
        'x-mpu-key': encodeURI(t),
        'x-mpu-upload-id': e,
        'x-mpu-part-number': o.partNumber.toString(),
      },
      body: o.blob,
    }, s)
    function m() {
      a.abort()
    }
    ;(i = s.abortSignal) != null && i.aborted ? m() : (c = s.abortSignal) == null || c.addEventListener('abort', m)
    let y = await l
    return (d = s.abortSignal) == null || d.removeEventListener('abort', m), y
  }
  var $e = typeof globalThis < 'u' ? 6 : 8, J = 8 * 1024 * 1024, C = $e * J * 2
  function Ct({ uploadId: e, key: t, pathname: r, stream: n, headers: s, options: a, totalToLoad: o }) {
    b('mpu: upload init', 'key:', t)
    let i = new AbortController()
    return new Promise((c, d) => {
      let l = [],
        m = [],
        y = n.getReader(),
        p = 0,
        _ = !1,
        U = 1,
        T = !1,
        h = 0,
        S = !1,
        E = 0,
        x = [],
        N = 0,
        D,
        Q = {}
      a.onUploadProgress && (D = (0, Ne.default)(() => {
        var f
        let v = Object.values(Q).reduce(($, H) => $ + H, 0),
          R = o || v,
          P = o > 0 ? Number(((v / o || v) * 100).toFixed(2)) : 0
        ;(f = a.onUploadProgress) == null || f.call(a, { loaded: v, total: R, percentage: P })
      }, 150)), ee().catch(O)
      async function ee() {
        for (
          b(
            'mpu: upload read start',
            'activeUploads:',
            p,
            'currentBytesInMemory:',
            \`\${w(h)}/\${w(C)}\`,
            'bytesSent:',
            w(E),
          ), _ = !0;
          h < C && !T;
        ) {
          try {
            let { value: f, done: v } = await y.read()
            if (v) {
              S = !0,
                b('mpu: upload read consumed the whole stream'),
                x.length > 0 &&
                (l.push({ partNumber: U++, blob: new Blob(x, { type: 'application/octet-stream' }) }), X()),
                _ = !1
              return
            }
            h += f.byteLength
            let R = 0
            for (; R < f.byteLength;) {
              let P = J - N, $ = Math.min(R + P, f.byteLength), H = f.slice(R, $)
              x.push(H),
                N += H.byteLength,
                R = $,
                N === J &&
                (l.push({ partNumber: U++, blob: new Blob(x, { type: 'application/octet-stream' }) }),
                  x = [],
                  N = 0,
                  X())
            }
          } catch (f) {
            O(f)
          }
        }
        b('mpu: upload read end', 'activeUploads:', p, 'currentBytesInMemory:', \`\${w(h)}/\${w(C)}\`, 'bytesSent:', w(E)),
          _ = !1
      }
      async function Fe(f) {
        p++,
          b(
            'mpu: upload send part start',
            'partNumber:',
            f.partNumber,
            'size:',
            f.blob.size,
            'activeUploads:',
            p,
            'currentBytesInMemory:',
            \`\${w(h)}/\${w(C)}\`,
            'bytesSent:',
            w(E),
          )
        try {
          let v = a.onUploadProgress
              ? (P) => {
                Q[f.partNumber] = P.loaded, D && D()
              }
              : void 0,
            R = await j({
              uploadId: e,
              key: t,
              pathname: r,
              headers: s,
              options: { ...a, onUploadProgress: v },
              internalAbortController: i,
              part: f,
            })
          if (
            b(
              'mpu: upload send part end',
              'partNumber:',
              f.partNumber,
              'activeUploads',
              p,
              'currentBytesInMemory:',
              \`\${w(h)}/\${w(C)}\`,
              'bytesSent:',
              w(E),
            ), T
          ) return
          if (
            m.push({ partNumber: f.partNumber, etag: R.etag }),
              h -= f.blob.size,
              p--,
              E += f.blob.size,
              l.length > 0 && X(),
              S
          ) {
            p === 0 && (y.releaseLock(), c(m))
            return
          }
          _ || ee().catch(O)
        } catch (v) {
          O(v)
        }
      }
      function X() {
        if (!T) {
          for (b('send parts', 'activeUploads', p, 'partsToUpload', l.length); p < $e && l.length > 0;) {
            let f = l.shift()
            f && Fe(f)
          }
        }
      }
      function O(f) {
        T ||
          (T = !0,
            i.abort(),
            y.releaseLock(),
            f instanceof TypeError && (f.message === 'Failed to fetch' || f.message === 'fetch failed')
              ? d(new V())
              : d(f))
      }
    })
  }
  async function It(e, t, r, n) {
    b('mpu: init', 'pathname:', e, 'headers:', r)
    let s = { ...n, onUploadProgress: void 0 },
      a = await K(e, r, s),
      o = Be(t),
      i = await Ee(t),
      c = await Ct({ uploadId: a.uploadId, key: a.key, pathname: e, stream: i, headers: r, options: n, totalToLoad: o })
    return await Y({ uploadId: a.uploadId, key: a.key, pathname: e, parts: c, headers: r, options: s })
  }
  function Z({ allowedOptions: e, getToken: t, extraChecks: r }) {
    return async function (s, a, o) {
      if (!a) throw new u('body is required')
      if (G(a)) {
        throw new u(
          "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload.",
        )
      }
      let i = await L({ pathname: s, options: o, extraChecks: r, getToken: t }), c = I(e, i)
      if (i.multipart === !0) return It(s, a, c, i)
      let d = i.onUploadProgress ? (0, He.default)(i.onUploadProgress, 100) : void 0,
        l = await F(\`/\${s}\`, { method: 'PUT', body: a, headers: c, signal: i.abortSignal }, {
          ...i,
          onUploadProgress: d,
        })
      return {
        url: l.url,
        downloadUrl: l.downloadUrl,
        pathname: l.pathname,
        contentType: l.contentType,
        contentDisposition: l.contentDisposition,
      }
    }
  }
  function qe({ allowedOptions: e, getToken: t, extraChecks: r }) {
    return async (n, s) => {
      let a = await L({ pathname: n, options: s, extraChecks: r, getToken: t }), o = I(e, a), i = await K(n, o, a)
      return {
        key: i.key,
        uploadId: i.uploadId,
        async uploadPart(c, d) {
          if (G(d)) {
            throw new u(
              "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload.",
            )
          }
          return {
            etag: (await j({
              uploadId: i.uploadId,
              key: i.key,
              pathname: n,
              part: { partNumber: c, blob: d },
              headers: o,
              options: a,
            })).etag,
            partNumber: c,
          }
        },
        async complete(c) {
          return Y({ uploadId: i.uploadId, key: i.key, pathname: n, parts: c, headers: o, options: a })
        },
      }
    }
  }
  function M(e) {
    return function (r) {
      if (!r.token.startsWith('vercel_blob_client_')) throw new u(\`\${e} must be called with a client token\`)
      if (r.addRandomSuffix !== void 0 || r.cacheControlMaxAge !== void 0) {
        throw new u(
          \`\${e} doesn't allow addRandomSuffix and cacheControlMaxAge. Configure these options at the server side when generating client tokens.\`,
        )
      }
    }
  }
  var hr = Z({ allowedOptions: ['contentType'], extraChecks: M('client/\`put\`') }),
    mr = Me({ allowedOptions: ['contentType'], extraChecks: M('client/\`createMultipartUpload\`') }),
    yr = qe({ allowedOptions: ['contentType'], extraChecks: M('client/\`createMultipartUpload\`') }),
    br = Oe({ allowedOptions: ['contentType'], extraChecks: M('client/\`multipartUpload\`') }),
    gr = Le({ allowedOptions: ['contentType'], extraChecks: M('client/\`completeMultipartUpload\`') }),
    Ve = Z({
      allowedOptions: ['contentType'],
      extraChecks(e) {
        if (e.handleUploadUrl === void 0) throw new u("client/\`upload\` requires the 'handleUploadUrl' parameter")
        if (e.addRandomSuffix !== void 0 || e.cacheControlMaxAge !== void 0) {
          throw new u(
            "client/\`upload\` doesn't allow addRandomSuffix and cacheControlMaxAge. Configure these options at the server side when generating client tokens.",
          )
        }
      },
      async getToken(e, t) {
        var r, n
        return Mt({
          handleUploadUrl: t.handleUploadUrl,
          pathname: e,
          clientPayload: (r = t.clientPayload) != null ? r : null,
          multipart: (n = t.multipart) != null ? n : !1,
        })
      },
    })
  var Lt = { generateClientToken: 'blob.generate-client-token', uploadCompleted: 'blob.upload-completed' }
  async function Mt(e) {
    let { handleUploadUrl: t, pathname: r } = e,
      n = Ot(t) ? t : Nt(t),
      s = {
        type: Lt.generateClientToken,
        payload: { pathname: r, callbackUrl: n, clientPayload: e.clientPayload, multipart: e.multipart },
      },
      a = await A(n, {
        method: 'POST',
        body: JSON.stringify(s),
        headers: { 'content-type': 'application/json' },
        signal: e.abortSignal,
      })
    if (!a.ok) throw new u('Failed to  retrieve the client token')
    try {
      let { clientToken: o } = await a.json()
      return o
    } catch {
      throw new u('Failed to retrieve the client token')
    }
  }
  function Nt(e) {
    return new URL(e, location.href).href
  }
  function Ot(e) {
    try {
      return !!new URL(e)
    } catch {
      return !1
    }
  }
  globalThis.upload = Ve
})()
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@vercel/blob/dist/chunk-JGHUXF3X.js:
  (*!
   * bytes
   * Copyright(c) 2012-2014 TJ Holowaychuk
   * Copyright(c) 2015 Jed Watson
   * MIT Licensed
   *)
*/
`;export{a as Blob,n as Index,u as JS_Notebook,t as Login,s as Notes,m as VercelUpload,d as Video};
