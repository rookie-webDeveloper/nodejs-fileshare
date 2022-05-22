/**
 * sleting all the check boxes of file name
 */
const fileCheckBoxQuery = `#table-body tr td:nth-child(2) 
  :nth-last-child(1) :nth-child(1) input`;

/**
 * rules for making of
 * open eye icon
 */
const eyeOpenSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>`;

/**
 * rules for making of
 * closed eye icon
 */
const eyeCloseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
<path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg>`;

/**
 * created navabar object
 */
class NavBar {
  constructor() {
    this.length = 0;
    this.navBarArray = [];
  }

  /**
   * inserts given path to the last of
   * navBararray
   * @param {string} filePath file path string
   */
  insertLast(filePath) {
    this.navBarArray.push(filePath);
    this.length += 1;
  }

  /**
   * inserts file path at the front
   * of navbar Array
   * @param {string} filepath file path
   */
  insertfirst(filepath) {
    this.navBarArray.unshift(filepath);
    this.length += 1;
  }

  /**
   * deletes last element at the
   * navbar array
   */
  poplast() {
    this.navBarArray.pop();
    this.length -= 1;
  }

  /**
   * deletes first element at the
   * navbar array
   */
  popfirst() {
    this.navBarArray.shift();
    this.length -= 1;
  }

  /**
   * return path at the last of
   * the navbar array
   * @returns {string} path string
   */
  getLast() {
    return this.navBarArray.at(-1);
  }

  /**
   * returns array of file path
   * @returns {Array} array
   */
  getArray() {
    return this.navBarArray;
  }

  /**
   * deletes all the elements in
   * the navbar array
   */
  reset() {
    this.navBarArray.slice(0, this.navBarArray.length);
    this.length = 0;
  }

  /**
   * returns second last element and
   * and deletes last element
   * @returns {string}
   */
  shiftToSecondLast() {
    if (this.navBarArray.length > 1) {
      // this.navBarArray.length = this.navBarArray.length - 1;
      this.navBarArray.pop();
      this.length -= 1;
      return this.navBarArray.at(-1);
    } else {
      return this.navBarArray.at(0);
    }
  }

  /**
   * return second last element
   * @returns {string} path like string
   */
  getSecondLast() {
    return this.navBarArray.at(-2);
  }
}

const myNavBar = new NavBar();

/**
 * unchecks the select all button
 */
function deselect() {
  document.querySelector('#select-all-btn').checked = false;
}
/**
 * shifts home, back, reload
 * buttons to bottom of the screen
 */
function shiftBtnsToBottom() {
  document
    .querySelector('footer')
    .appendChild(document.querySelector('.right-side-btns'));
}

/**
 * shifts home, back, reload
 * buttons to original position
 */
function shiftBtnsToTop() {
  document
    .querySelector('.btn-container')
    .appendChild(document.querySelector('.right-side-btns'));
}

/**
 * adds Event listner to the
 * window and shifts home,back,reload
 * buttons to bottom or top to
 * the screen
 */
window.addEventListener('resize', function (ev) {
  if (this.innerWidth < 541) {
    shiftBtnsToBottom();
  } else {
    shiftBtnsToTop();
  }
});

/**
 * adds click event listner to
 * upload button and when event is
 * triggred table vie is hidden and
 * upload page view is opened
 */
document
  .querySelector('#upload-btn')
  .addEventListener('click', function (ev) {
    document
      .querySelector('.upload-file-page')
      .classList.toggle('hide-element');
    document
      .querySelector('.table-view-page')
      .classList.toggle('hide-element');
    document.querySelector('footer').classList.toggle('hide-element');
  });

/**
 * adds click event listner to download button
 * and when triggred getDirDetailsBuildTable
 * is called to load previous folder
 */
document
  .querySelector('#back-btn')
  .addEventListener('click', function (ev) {
    if (myNavBar.length > 1) {
      //if 1 do not render the table
      getDirDetailsAndBuildTable(myNavBar.shiftToSecondLast());
    }
  });

/**
 * adds click event listner to reload button and
 * when triggred getDirDetailsAndBuildTable
 * is called to load current folder
 */
document
  .querySelector('#reload-btn')
  .addEventListener('click', function (ev) {
    getDirDetailsAndBuildTable(myNavBar.getLast());
  });

/**
 * adds click event listner to preview button
 * and when triggred preview conatiner element
 * hide-element class is added to classlist
 * and if preview container has video element
 * the video is paused
 */
document
  .querySelector('#preview-btn')
  .addEventListener('click', function (ev) {
    let temp = document.querySelector('.table-container');
    let t = document.body.querySelector('#preview-container');
    t.classList.toggle('hide-element');
    if (this.getAttribute('data-eye') == 'closed') {
      this.innerHTML = eyeOpenSvg;
      this.setAttribute('data-eye', 'opened');
      if (window.innerWidth < 541) {
        temp.style.maxHeight = '45vh';
        temp.style.minHeight = '45vh';
      }
    } else {
      if (window.innerWidth < 541) {
        temp.style.maxHeight = '73vh';
        temp.style.minHeight = '73vh';
      }
      this.innerHTML = eyeCloseSvg;
      this.setAttribute('data-eye', 'closed');
      try {
        t.firstChild.pause();
      } catch {} //if video element pause the video
    }
  });

/**
 * adds click event to homw btn and
 * when triggred getDirDetailsAndBuildTable
 * is called to build table from base Directory
 * and navbar object is reset()
 */
document.querySelector('#home-btn').addEventListener('click', ev => {
  myNavBar.reset();
  getDirDetailsAndBuildTable('', () => {
    myNavBar.insertLast('');
  }); //render base dir
});

/**
 * adds change event listner to select all button
 * and when triggred "checked" property of all the
 * elments of class 'filename-check-box' are set to
 * true
 */
document
  .querySelector('#select-all-btn')
  .addEventListener('change', ev => {
    document.body.querySelectorAll('.filename-check-box').forEach(item => {
      item.checked = ev.target.checked;
    });
  });

/**
 * adds click event listner on download-selected-file
 * button and when triggred and if single file then
 * downloadSingleFile is called but if multiple file are
 * seleted the all the seleted files details are
 * collected in this formate example :-
 *    [
 *      { path : "file path1",
 *        name : "file name1"
 *      },
 *      { path : "file path2",
 *        name : "file name2"
 *      },
 *    ]
 * and downloadMultipleFiles is called
 */
document
  .querySelector('#download-multiple-files-btn')
  .addEventListener('click', ev => {
    const filePathArray = Array.from(
      document.body.querySelectorAll('.filename-check-box')
    )
      .filter(item => {
        return item.checked;
      })
      .map(item => {
        return {
          path: item.getAttribute('data-filePath'),
          name: item.getAttribute('data-fileName'),
        };
      });
    if (filePathArray.length == 1) {
      downloadSingleFile(filePathArray[0].path);
    } else if (filePathArray.length > 1) {
      downloadMultiFiles(filePathArray);
    }
  });
