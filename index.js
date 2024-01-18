
const express = require("express");
const app = express();

// appにこれからjson形式を使いますよとお伝え
app.use(express.json());

// サーバーをつくる。
app.listen(3000, () => console.log("サーバーが開始されました"));

// expressにはミドルウェアとルートハンドラがある,ルートハンドラとはget,postなどに紐づく関数
// クライアントに返すバックエンド側の処理
app.get("/", (req, res) =>{
    res.send("RestfulAPIを作ってみよう!");
});

//クライアントに返すWebAPIを作る, お客様情報をサーバーに置いておく。
// /api/customers/で取得できるようにしておくJson形式{キー: 値}でかく
const customers = [
    { title: "田中", id: 1},
    { title: "斎藤", id: 2},
    { title: "佐藤", id: 3},
    { title: "鈴木", id: 4},
    { title: "加藤", id: 5},
];

// 統一インターフェースを作る、GET取得する、POST投稿する、PUT更新・アップロードする、DELETE削除するが統一さえたインターフェース
// データを/api/customersで取得できるようにしよう(GETメソッド）
// エンドポイントはconst customers = [];の中身、クライアントに返すもともとのデータのこと、アドレス可能性
app.get("/api/customers", (req, res) => {
    res.send(customers);
})

// 固有のお客様情報を取得する
// GET:お客様ひとりひとりに振られたidで1人分ずつのデータを取れるようにしておく
// find関数： custmerの変数に格納した配列の中身をint型としてパースして展開、paramsはパラメータの意味
app.get("/api/customers/:id",(req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    res.send(customer);
});

// POST：データを送信（作成）してみよう
// クライアントから/api/customersにデータを新しくPOST投稿する
// 配列の長さlengthに１つ新しいデータを足す
// 例えば、formボタンの送信ボタンから入力したデータをPOSTする方法など、今回はPOSTMANを使用する
app.post("/api/customers", (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "タイトルがああ"});
        return;
    }
    const customer = {
        id: customers.length + 1,
        title: req.body.title,
    };
    customers.push(customer);
    res.send(customers);
});

// PUT:データを更新してみよう
app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    res.send(customers);
});

// DELETE:データを削除してみよう
app.delete("/api/customers/", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
});