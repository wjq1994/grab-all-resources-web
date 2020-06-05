# 网页抓取所有资源

 - [启动服务器](#启动服务器)
 - [打开console控制台](#将要抓取的网页打开console控制台，复制以下代码)
 - [打开抓取后的html修改引用资源路径](#打开抓取后的html修改引用资源路径)
 - [还有些许问题的微调](#还有些许问题的微调)

### 启动服务器

### 将要抓取的网页打开console控制台，复制以下代码

```javascript
var dirPath = 'file/', // 资源目录（下载到服务器 static/里面的 哪个文件夹）
        allUrls = [window.location.href]; // 所有要下载的路径

    var scriptNode = document.createElement('script');
    scriptNode.src = 'http://127.0.0.1:3000/jquery-1.8.3.js';
    document.body.appendChild(scriptNode);
    scriptNode.onload = () => {
        $('link').each((index, ele) => {
            allUrls.push(ele.href);
        });
        $('script').each((index, ele) => {
            allUrls.push(ele.src);
        });
        $('img').each((index, ele) => {
            allUrls.push(ele.src);
        });

        var jsonStr = { filepaths: allUrls,dirPath: dirPath};
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/urlDownLoadFile',
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(jsonStr)
        });
    }
```

### 打开抓取后的html修改引用资源路径
```javascript
<script src="../jquery-1.8.3.js"></script>
<script>
  $('link').each((index, ele) => {
    var filePath = ele.href,
        lastIndex = filePath.lastIndexOf('/'),
        fileName = filePath.substr(lastIndex + 1);
    ele.href = fileName;
  });
  $('script').each((index, ele) => {
    var filePath = ele.src,
        lastIndex = filePath.lastIndexOf('/'),
        fileName = filePath.substr(lastIndex + 1);
    ele.src= fileName;
  });
  $('img').each((index, ele) => {
    var filePath = ele.src,
        lastIndex = filePath.lastIndexOf('/'),
        fileName = filePath.substr(lastIndex + 1);
    ele.src= fileName;
  });

```

### 还有些许问题的微调