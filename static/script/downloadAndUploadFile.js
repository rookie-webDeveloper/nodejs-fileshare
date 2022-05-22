/**
 * downloads file from given 
 * file path
 * @param {string[]} filePath file path
 * @param {function=} myCallback callback function
 */
function downloadSingleFile(filePath, myCallback) {
  let a = document.createElement('a');
  a.style.display = 'none';
  a.href = '/download-single-file/' + filePath;
  a.target = '';
  a.click();
  a.remove();
  if (myCallback) myCallback();
}

/**
 * downloads all the requested files
 * @param {string[]} filePathArray array of file path strings
 * @param {function=} myCallback callbac function     
 */
function downloadMultiFiles(filePathArray, myCallback) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/download-multiple-files');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.responseType = 'blob';
  xhr.onload = function (ev) {
    if (this.readyState = 4) {
      let blob = new Blob([xhr.response], { type: "applicetion/zip" }),
        a = document.createElement('a'),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'files.zip';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      if (myCallback) myCallback();
    }
  }
  xhr.send(JSON.stringify(filePathArray));
}

let progressBar = document.querySelector('#progress'),
  progressBarTrack = document.querySelector('#progress-track'),
  progressBarCounter = document.querySelector('#progress-counter'),
  progressBarContainer = document.querySelector(
    '#upload-progressbar-container'
  );

//upload file
let uploadForm = document.getElementById('file-upload-form');
uploadForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload-files');

  xhr.upload.onloadstart = function (ev) {
    progressBarContainer.classList.remove('invisible');
    progressBar.style.width = '0%';
    progressBarCounter.textContent = '0%';
  };

  xhr.upload.onprogress = function (ev) {
    let t = (ev.loaded / ev.total) * 100;
    progressBar.style.width = t.toFixed(4) + '%';
    progressBarCounter.textContent = t.toFixed(2) + '%';
  };

  xhr.upload.onloadend = function (ev) {
    progressBar.style.width = '0px';
    progressBarCounter.textContent = '0%';
    progressBarContainer.classList.add('invisible');
    uploadForm.lastElementChild.click();
    alert('File upload complete')
  };

  xhr.upload.onerror = function (ev) {
    progressBar.style.width = '0px';
    progressBarTrack.classList.add('invisible');
    uploadForm.lastElementChild.click();
    alert('An error occured while uploading');
  };

  xhr.upload.onabort = function (ev) {
    console.log(ev);
    alert('File upload cancelled');
    progressBar.style.width = '0px';
    progressBarCounter.textContent = '0%';
    progressBarContainer.classList.add('invisible');
  };

  xhr.send(new FormData(uploadForm));
  document
    .querySelector('#cancel-btn')
    .addEventListener('click', function (ev) {
      xhr.abort();
    });
});
