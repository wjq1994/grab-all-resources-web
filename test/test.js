var express = require('express');
var fs = require('fs');
var path = require('path');
var request = require('request');

let requestPaths = [
    'http://www.tencent.com/css/base.css',
    'http://www.tencent.com/css/base-2.css',
    'http://www.tencent.com/css/index.css',
    'http://www.tencent.com/css/rem.css',
    'http://www.tencent.com/css/rem-2.css',
    'http://pingjs.qq.com/h5/stats.js?v2.0.4',
    // '',
    'https://js.aq.qq.com/js/aq_common.js',
    'http://www.tencent.com/js/jquery.min.js',
    'http://www.tencent.com/js/js.js',
    'http://www.tencent.com/js/js-2.js',
    // '',
    // '',
    // 'http://127.0.0.1:3000/jquery-1.8.3.js',
    // 'http://127.0.0.1:3000/jquery-1.8.3.js',
    // 'http://127.0.0.1:3000/jquery-1.8.3.js',
    // 'http://127.0.0.1:3000/jquery-1.8.3.js',
    // 'http://127.0.0.1:3000/jquery-1.8.3.js',
    // 'http://127.0.0.1:3000/jquery-1.8.3.js',
    // 'http://127.0.0.1:3000/jquery-1.8.3.js',
    'http://www.tencent.com/data/index/index_detail_1.jpg',
    'http://www.tencent.com/data/index/index_detail_2.jpg',
    'http://www.tencent.com/data/index/index_detail_3.jpg',
    'http://www.tencent.com/img/index/wechat-code.jpg',
    'http://www.tencent.com/img/index/tencent_logo.png'
];

requestPaths.forEach(item => {
    if (item !== '') {
        var lastIndex = item.lastIndexOf('/'),
            fileName = item.substr(lastIndex + 1);
        console.log(fileName)
        var stream = fs.createWriteStream(path.join(__dirname,'./assets', fileName));
        request(item).pipe(stream).on('close', (err) => {
            console.log(11111)
            if (err) {
                console.log("报错信息", err);
            }
        });
    }
});
