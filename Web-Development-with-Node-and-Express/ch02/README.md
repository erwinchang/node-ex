## 範例說明

### helloWorld

* 程序
1. node helloWordl.js
2. 開啟網頁 localhost:3000

* 其它
    * wget localhost:3000    
```
$ wget localhost:3000
--2017-06-13 09:37:58--  http://localhost:3000/
Resolving localhost (localhost)... 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:3000... connected.
HTTP request sent, awaiting response... 200 OK
Length: unspecified [text/plain]
Saving to: ‘index.html’

    [ <=>                                                                                                                                            ] 11          --.-K/s   in 0s      

2017-06-13 09:37:58 (418 KB/s) - ‘index.html’ saved [11]

$ cat index.html
Hello world
```

* 說明
    * Content-Type属性指定请求和响应的HTTP内容类型。如果未指定 ContentType，默认为text/html
    * 200 OK 服务器成功处理了请求
    來源：[HTTP状态码][1]

### helloWorld-2-routing.js

* 輸入不同網址，回應不同內容3

* replace
    * url會回傳網頁localhost:3000/tt/tt/tt1?cmd=1其中"/tt/tt/tt1?cmd=1"部分
    * 去除後面帶參數部分(即?cmd=1)
'''
var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
'''

```
$ node helloWorld-2-routing.js 
Server started on localhost:3000; press Ctrl-c to terminate...
T00 url:##/tt/tt/tt1?cmd=1##
T01 path:##/tt/tt/tt1##
T00 url:##/tt/tt/tt1?cmd=1&cm1=2##
T01 path:##/tt/tt/tt1##
T00 url:##/about?dd=1##
T01 path:##/about##
T00 url:##/##
T01 path:####
```

### helloWorld-3-staticfile

* 輸入不同網址，回應不同html

__dirname為node執行位置

```
Server started on localhost:3000; press Ctrl-c to terminate...
dirname:/home/erwin/workspace/github/node-ex/Web-Development-with-Node-and-Express/ch02/ex3
path:/public/about.html
```


[1]:http://www.bkjia.com/headlines/491296.html
