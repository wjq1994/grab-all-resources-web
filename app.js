var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var path= require('path');

var app = express();

app.use(bodyParser.json({limit: "2048kb"}));
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

//设置允许跨域访问该服务.
app.use((req, res, next) => {
    // 设置是否运行客户端设置 withCredentials
    // 即在不同域名下发出的请求也可以携带 cookie
    res.header("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    //预检需要返回
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})
app.use('/urlDownLoadFile', (req, res) => {
    //console.log(req)
    var filePaths = req.body.filepaths,
        dirPath = req.body.dirPath;
    console.log("filePaths", filePaths);
    console.log("dirPath", dirPath);
    var fileDirPath = path.join(__dirname, './static/', dirPath);
    if (!fs.existsSync(fileDirPath)) {
        fs.mkdirSync(fileDirPath);
    }
    filePaths.forEach(item => {
        if (item !== '') {
            var lastIndex = item.lastIndexOf('/'),
                fileName = item.substr(lastIndex + 1);
            console.log(fileName)
            var stream = fs.createWriteStream(path.join(fileDirPath, fileName));
            request(item).pipe(stream).on('close', (err) => {
                if (err) {
                    console.log("报错信息", err);
                }
            });
        }
    });
    res.send('');
});

app.use('/timeout', (req, res) => {
    console.log('timeout req', req);
    let str = 1;
    console.time("time out");
    for (let i=0; i < 10000000000; i++) {
        str += i;
    }
    console.timeEnd("time out");
    console.log('timeout res', res);
    res.send({data: str});
});

/* GET page. */
app.use('/index.html', function(req, res, next) {
    res.render('index');
});

/* GET page. */
app.use('/api.html', function(req, res, next) {
    res.render('api');
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen(3000);
