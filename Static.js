export const Login = `<!DOCTYPE html>
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
          showAlert('#4CAF50', 'Login Successful')
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        } else {
          const errorMessage = await response.json()
          showAlert('#f44336', errorMessage.message)
          console.log('Error: ', errorMessage)
        }
      })
    </script>
  </body>
</html>
`

export const Index = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" sizes="192x192" href="https://1nrp.github.io/1/Images/N-Logo1.png">
  <meta charset="utf-8">
  <title>Websites</title>
</head>
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

<center>
    
    <h2>WEBPAGE LINKS</h2>

    <p><a href="/Notes" target="_self">Cloud Notes</a>
    <p><a href="/Login" target="_self">Sign In</a>
    <p><a href="/Blob">Blob</a></p>
    
</center>

</body> 
</html>`

export const Blob = `<!DOCTYPE html>
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
          ✖
        </button>
        <input id="uploadBox" type="file" multiple accept="*/*" required />
        <button id="uploadButton" type="submit">▲</button>
        <button id="getFilesBtn" type="button" onclick="getFiles()">▼</button>
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
    <script src="upload.js"></script>
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
                showAlert({ BgColor: '#1bd13d', Text: '✔ File Saved' })
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
              <button class="toggle-btn" onclick="toggleButtons(this)">☰</button>
              <p>\${count++}. \${name} [\${size}]</p>
                <div class="cell-buttons-div">
                  <button onclick="downloadFile('\${downloadLink}')">📥</button>
                  <button onclick="renameFile('\${Link}')">✏️</button>
                  <button onclick="deleteFile('\${Link}')">❌</button>
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
              showAlert({ BgColor: '#1bd13d', Text: \`✔ File Renamed\` })
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
              showAlert({ BgColor: '#f2074e', Text: \`✖ File Deleted\` })
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
    </script>
  </body>
</html>
`

export const VercelUpload = `;(() => {
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
        throw new TypeError(\`Expected the first argument to be a function.\`)
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
  var rt = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i,
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
                o.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach((m) => {
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
  var $e = typeof window < 'u' ? 6 : 8, J = 8 * 1024 * 1024, C = $e * J * 2
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
  window.upload = Ve
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
`