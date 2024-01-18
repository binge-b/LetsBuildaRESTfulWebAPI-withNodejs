
const express = require("express");
const app = express();
// サーバーをつくる。
app.listen(3000, console.log("サーバーが開始されました"));

app.get("/", (req, res) =>{
    res.send("RestfulAPIを作ってみよう!");
});

// お客様情報をサーバーに置いておく。
// /api/customers/で取得できるようにしておくJson形式でかく
const customers = [
    { title: "田中", id: 1},
    { title: "斎藤", id: 2},
    { title: "佐藤", id: 3},
    { title: "鈴木", id: 4},
    { title: "加藤", id: 5},
];

// データを取得できるようにしよう(GETメソッド）
app.get("/api/customers", (req, res) => {
    res.send(customers);
})

// 固有のお客様情報を取得する
// お客様ひとりひとりに振られたidで1人分ずつのデータを取れるようにしておく
// paramsはパラメータの意味
app.get("/api/customers/:id",(req, res) => {
    const 
})