/**
 * rules for making
 * folder icon
 */
const folderSvg = `<svg xmlns="http://www.w3.org/2000/svg" 
width="18" height="18" fill="currentColor" class="bi bi-folder" 
viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 
0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 
2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99
1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 
.995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 
4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 
.981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
</svg>`,
  /**
   * rules for making
   * eye icon
   */
  eyeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
  fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 
  8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 
  1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 
  1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 
  0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 
  8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>`,
  /**
   * rules for making
   * download icon
   */
  downloadSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18"
 height="18" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5
 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 
10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg>`;

const previewBtn = document.body.querySelector('#preview-btn');

/**
 * calls the function for adding eye
 * icon if conditions are satisfied
 * @param {String} mimeType MimeType
 * @param {function} temp function to add eye icon
 */
function allowedMimeTypes(mimeType, temp) {
  //expample
  //application/javascript; charset=utf-8
  switch (mimeType.split(';')[0].split('/')[0]) {
    case 'video':
    case 'image':
    case 'text':
    case 'audio':
      temp();
      break;
    case 'application':
      switch (mimeType.split(';')[0].split('/')[1]) {
        case 'pdf':
        case 'javascript':
        case 'json':
          temp();
          break;
      }
      break;
    default:
      break;
  }
}

/**
 * adds Eye icon if file can be
 * opened in browser
 * @param {HTMLElement} i div element
 * @param {HTMLElement} label label element
 * @param {HTMLElement} div div element
 * @param {object} obj object containg file details
 */
function addEyeIcon(i, label, div, obj) {
  let temp = () => {
    i.innerHTML = eyeSvg;
    i.onclick = label.onclick = function () {
      getFilePreview(obj.filePath); //defined in getFilePreview.js
      if (previewBtn.getAttribute('data-eye') == 'closed') {
        //check if preview panel is closed
        previewBtn.click();
      }
    };
    div.append(i);
  };
  allowedMimeTypes(String(obj.mimeType), temp);
}

/**
 * added name and required icons
 * based on file type
 * @param {object} obj file details object
 * @param {HTMLElement} td td tag
 */
function addNameAndIcons(obj, td) {
  //adding label
  let label = document.createElement('label');
  label.innerText = obj.name;
  label.classList.add('text-break');
  let div = document.createElement('div');
  switch (obj.kind) {
    case 'folder':
      //folder icon
      let i1 = document.createElement('div');
      div.appendChild(i1);
      i1.innerHTML = folderSvg;
      i1.onclick = function () {
        getDirDetailsAndBuildTable(obj.filePath);
        myNavBar.insertLast(obj.filePath);
        deselect();
      };
      label.onclick = function () {
        getDirDetailsAndBuildTable(obj.filePath);
        myNavBar.insertLast(obj.filePath);
      };
      break;
    case 'file':
      //checkbox
      let divChk = document.createElement('div');
      let chkbox = document.createElement('input');
      chkbox.setAttribute('data-filePath', obj.filePath);
      chkbox.setAttribute('data-fileName', obj.name);
      chkbox.classList.add('form-check-input', 'filename-check-box');
      chkbox.type = 'checkbox';
      chkbox.onchange = ev => {
        fileCheckBoxClicked(ev);
      };
      divChk.appendChild(chkbox);
      //eye icon
      let i2 = document.createElement('div');
      addEyeIcon(i2, label, div, obj);
      //download icon
      let i3 = document.createElement('div');
      i3.innerHTML = downloadSvg;
      i3.onclick = function () {
        downloadSingleFile(obj.filePath); //defined in downloadFile.js
      };
      div.append(divChk, i3);
      break;
    default:
      break;
  }
  td.append(label, div);
}

/**
 * converts size to Bytes, KB, MB, GB
 * accordingly and addes to specified
 * <td> tag
 * @param {HTMLElement} td td tag
 * @param {number} size size of file
 */
function addFileSize(td, size) {
  if (size < Math.pow(10, 3)) {
    td.innerText = size + ' Bytes';
  } else if (size < Math.pow(10, 6)) {
    td.innerText = Math.round(size / Math.pow(10, 3)) + ' KB';
  } else if (size < Math.pow(10, 9)) {
    td.innerText = Math.round(size / Math.pow(10, 6)) + ' MB';
  } else if (size < Math.pow(10, 12)) {
    td.innerText = Math.round(size / Math.pow(10, 9)) + ' GB';
  } else if (size < Math(10, 15)) {
    td.innerText = Math.round(size / Math.pow(10, 12)) + ' TB';
  }
}

/**
 * creates a row and add data to the row
 * after that row is added to the specfied
 * table body
 * @param {number} index table row index
 * @param {HTMLelement} tableBodyTag table body tag
 * @param {Object} obj details of file
 */
function addTableRowToTableBody(index, tableBodyTag, obj) {
  let tr = document.createElement('tr'),
    td0 = document.createElement('td'),
    td1 = document.createElement('td'),
    td2 = document.createElement('td');
  tr.append(td0, td1, td2);
  tableBodyTag.append(tr);
  //adding index
  td0.innerText = index + 1;
  //adding name
  addNameAndIcons(obj, td1);
  //adding info
  if (obj.kind == 'folder') {
    if (obj.fileCount == 'error') {
      td2.innerText = 'error';
    } else {
      td2.innerText = obj.fileCount + ' files';
    }
  } else if (obj.kind == 'file') {
    addFileSize(td2, obj.size);
  } else {
    td2.innerText = 'unknown';
  }
}

/**
 * Builds the table from the
 * given data
 * @param {Array} data contains object of file details
 * @param {HTMLelement} tableBodyTag table body tag
 * @param {function=} myCallback callback function
 */
function buildTable(data, tableBodyTag, myCallback) {
  let i = 0;
  for (let obj of data) {
    addTableRowToTableBody(i, tableBodyTag, obj);
    if (i + 1 == data.length) {
      if (myCallback) myCallback(null, data);
    }
    i++;
  }
}

/**
 * send request to server for
 * getting directory details of
 * given directory path
 * @param {HTMLelement} tableBodyTag table body tag
 * @param {Path} folderPath folder path
 * @param {function=} myCallback callback function
 */
function fetchDataFromServer(tableBodyTag, folderPath, myCallback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.response.hasOwnProperty('error')) {
      tableBodyTag.innerHTML = '<pre>Folder cannot be Read</pre>';
    } else {
      buildTable(xhr.response, tableBodyTag, myCallback);
    }
  };
  xhr.onerror = () => {
    myCallback('error during fetching records');
  };
  xhr.open('GET', '/get-dir-details');
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('get-folder-path', folderPath);
  xhr.send();
}

/**
 * delete all the data present
 * in table body
 * @param {HTMLelement} tableBodyTag table body tag
 * @param {Path} folderPath folder path
 * @param {function=} myCallback callback function
 */
function clearTableBody(tableBodyTag, folderPath, myCallback) {
  tableBodyTag.innerHTML = '';
  fetchDataFromServer(tableBodyTag, folderPath, myCallback);
}

/**
 * Builds table after fetching
 * details from the server
 * @param {Path} folderPath folder path
 * @param {function=} myCallback callback function
 */
function getDirDetailsAndBuildTable(folderPath, myCallback) {
  let tableBody = document.querySelector('#table-body');
  clearTableBody(tableBody, folderPath, myCallback);
}

let selectAllBtn = document.querySelector('#select-all-btn');
function fileCheckBoxClicked(ev) {
  if (selectAllBtn.checked) selectAllBtn.checked = false;
}

window.onload = () => {
  if (window.innerWidth < 541) {
    shiftBtnsToBottom();
  }
  getDirDetailsAndBuildTable('', () => {
    myNavBar.insertLast('');
  }); // get base Dir
};
