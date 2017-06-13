## 說明

* npm (node package manager)
    * node 模組套件管理器

### 指令

* 將套件安裝在全域
g 表示全域安裝
```
npm install <package name> -g 
```

* 將套件安裝在目錄的專案中
```
npm install <package name>
```

來源：[Npm 套件管理 & 常用開發工具介紹][1]
 

## ex1

* 1-1 安裝express

將會產生node_modules目錄
使用save將會更新package.json
```
1. npm install --save express
```

* 1-2 建立meadowlark.js


app.get為增加路由的方法
app.use是express添加中介軟体的方法，自定處理404及500的方式

---------

## ex2

* model-view-controller 
    * view為送給使用者的HTML
* Express支援許多不同的view引擎
    * Jade

將舊的路由換成這些view的新路由


* 1-1 express 3 handlebars

```
npm install --save express3-handlebars
```

* 不需要指定內容類型或狀態碼，預設情況下，view引擎會回傳 text/html及200 OK
* 建立views/layout目錄
```
$ tree
.
├── 404.handlebars
├── 500.handlebars
├── about.handlebars
├── home.handlebars
└── layouts
    └── main.handlebars
```

* main.handlebars中"{{{body}}}"，會被換成每一個view的HTML
defaultLayout:'main'，表示套用所有的view



### 說明

* [express api][2]



* app.use最後1個才能使用error-handling
You define error-handling middleware last, after other app.use() and routes calls; for example:
```
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(function (err, req, res, next) {
  // logic
})
```



[1]:https://www.slideshare.net/wantingj/npm-46801372
[2]:https://expressjs.com/en/4x/api.html#app.use
