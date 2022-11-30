let img, video, screenshot, tag;
let enable = false;
const canvas = document.createElement('canvas');

const init = () => {
  hasGetUserMedia()

  if (enable) {
    screenshot = document.getElementById('screenshot');

    img = document.getElementsByTagName('img')[0];
    video = document.getElementsByTagName('video')[0];

    screenshot.addEventListener('click', takeScreenshot);
  }

  startCamera();
}

const hasGetUserMedia = () => {
  if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
    alert('Unable to enable camera.');
  } else {
    enable = true;
  }
}

const startCamera = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream
      screenshot.disabled = false;
    })
    .catch(err => alert('Error occurred: ' + err));
}

const takeScreenshot = () => {
  canvas.width = 512;
  canvas.height = 512;
  // TODO: Hardcoded height/width crops off-center, use a better cropping tool
  // canvas.width = video.videoWidth;
  // canvas.height = video.videoHeight;

  canvas.getContext('2d').drawImage(video, 0, 0);
  img.src = canvas.toDataURL('image/jpg');
  img.style.display = 'block'

  downloadScreenshot();
}

const downloadScreenshot = () => {
  tag = document.createElement('a');
  tag.href = img.src
  tag.download = 'yourScreenshot.jpg';
  tag.style.display = 'none';

  document.body.appendChild(tag);
  tag.click();
  document.body.removeChild(tag);
};

document.addEventListener('DOMContentLoaded', init)
