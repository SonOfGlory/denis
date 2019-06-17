//  TODO: Missing CoffeeScript 2
// НАЧАЛО ФУНКЦИИ НА САЙТЕ С ДЕМКОЙ FILESTACK
//<![CDATA[
var yourAPIKey = 'AoD7hdYBlRKK6XH0TXITOz';
var VanillaRunOnDomReady = function() {   
  // Set up the picker
  const client = filestack.init(yourAPIKey); //yourAPIKey
  const options = {
    onUploadDone: updateForm,
    maxSize: 10 * 1024 * 1024,
    accept: 'image/*',
    uploadInBackground: false,
  };
  const picker = client.picker(options);

  // Get references to the DOM elements

  const form = document.getElementById('pick-form');
  const fileInput = document.getElementById('fileupload');
  const pickerTrack = document.getElementById('picker');
  const nameBox = document.getElementById('nameBox');
  const urlBox = document.getElementById('urlBox');

  // Add our event listeners

  pickerTrack.addEventListener('click', function (e) 
  {
    e.preventDefault(); 
    picker.open();
  });

  form.addEventListener('submit', function (e) 
  {
    e.preventDefault(); 
    alert('Submitting: ' + fileInput.value);
  });

  // Helper to overwrite the field input value  

  function updateForm (result) {
    const fileData = result.filesUploaded[0];
    fileInput.value = fileData.url;

    // If file is resizable image, resize and embed it as a thumbnail preview
    if (['jpeg', 'png', 'gif', 'docx'].indexOf(fileData.mimetype.split('/')[1]) !== -1) {
      const container = document.getElementById('thumbnail-container');
      const thumbnail = document.getElementById('thumbnail') || new Image();
      thumbnail.id = 'thumbnail';
      thumbnail.src = client.transform(fileData.handle, { 
        resize: { 
          width: 50 
        }
      });

      if (!container.contains(thumbnail)) {
      container.appendChild(thumbnail);
      // container.appendChild(`<a href="${fileData.url}" target="_blank"><img src="${thumbnail.src}"></a>`);
        }
      }
    
    // Some ugly DOM code to show some data.

    const name = document.createTextNode('Selected: ' + fileData.filename);
    const url = document.createElement('a');
    url.href = fileData.url;
    url.appendChild(document.createTextNode(fileData.url));
    nameBox.appendChild(name);
    urlBox.appendChild(document.createTextNode('Uploaded to: '));
    urlBox.appendChild(url);
  };
}
// Конец функции которую можно увидеть на https://jsfiddle.net/aj2edh1c/?utm_source=website&utm_medium=embed&utm_campaign=aj2edh1c&fbclid=IwAR2ZSVgG2NBJRU-ABPIdymisuAF1cuErFu6ms7BbqzeTPRVIrFbcyxnpTYI
var alreadyrunflag = 0;

if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", function(){
    alreadyrunflag=1; 
    VanillaRunOnDomReady();
  }, false); 
}
else if (document.all && !window.opera) {
  document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
  var contentloadtag = document.getElementById("contentloadtag")
  contentloadtag.onreadystatechange=function(){
      if (this.readyState=="complete"){
        alreadyrunflag=1;
        VanillaRunOnDomReady();
      }
  }
}

// tell the embed parent frame the height of the content
if (window.parent && window.parent.parent){
  window.parent.parent.postMessage(["resultsFrame", {
    height: document.body.getBoundingClientRect().height,
    slug: "aj2edh1c"
  }], "*")
}

// always overwrite window.name, in case users try to set it manually
window.name = "result"

//]]>