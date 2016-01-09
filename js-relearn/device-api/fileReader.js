/**
  File   : fileReader.js
  Author : IndexXuan(https://github.com/IndexXuan)
  Mail   : indexxuan@gmail.com
  Date   : 2016年01月09日 星期六 23时09分08秒
*/

var fileInput = document.getElementById('test-image-file')
var info = document.getElementById('test-file-info')
var preview = document.getElementById('test-image-preview')

// listen to
fileInput.addEventListener('change', function() {
  // clear preview background
  preview.style.backgroundImage = ''
  // check file type
  if (!fileInput.value) {
    info.innerHTML = '没有选择文件'
    return
  }

  // get file
  var file = fileInput.file[0]
  // get info
  info.innerHTML = '文件' + file.name + '<br>' + 
                   '大小' + file.size + '<br>' +
                   '修改' + file.lastModifiedDate
  if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
    alert('不是有效的图片')
    return
  }
  
  // read file data
  var reader = new FileReader()
  reader.onload = function(e) {
    var data = e.target.result // data:iamge/jpeg;base64,/9dsffl... (base64编码)
    preview = style.backgroundImage = 'url(' + data + ')'
  }
  reader.readAsDataURL(data)

}, false)


