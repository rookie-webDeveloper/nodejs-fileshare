const videoExt = ['mp4'];

/**
 * genrates video or embed tage and
 * attach src to tags 
 * @param {Path} filepath file path
 * @param {function=} myCallback callback function
 */
function getFilePreview(filepath, myCallback) {
  const getURL = '/stream-file-preview/' + filepath,
    previewContainer = document.querySelector('#preview-container'),
    fileExt = filepath.slice(
      (Math.max(0, filepath.lastIndexOf('.')) || Infinity) + 1
    );
  previewContainer.innerHTML = '';
  if (videoExt.indexOf(fileExt) > -1) {
    let video = document.createElement('video');
    video.src = getURL;
    video.controls = 'controls';
    video.autofocus = true;
    video.autoplay = true;
    video.style.width = video.style.height = '100%';
    video.style.objectFit = 'contain';
    video.classList.add('preview-video');
    video.load();
    previewContainer.append(video);
    if (myCallback) myCallback();
  } else {
    let embed = document.createElement('embed');
    embed.src = getURL;
    embed.style.width = embed.style.height = '100%';
    embed.style.objectFit = 'contain';
    previewContainer.append(embed);
    if (myCallback) myCallback();
  }
}
