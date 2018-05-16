const koa = require("koa");
const router = require("koa-router");

let server = new koa();

server.listen(8081);

let r1 = router();

server.use(async (ctx, next) => {
    console.log('aa');
    
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
});

server.use(r1.routes());

r1.get("/api", async ctx => {
  ctx.body = [
    { id:'1', name: "手机", sales: 1002, prace: 5880 },
    { id:'2', name: "衣服", sales: 100, prace: 1880 },
    { id:'3', name: "电脑", sales: 4502, prace: 580 },
    { id:'4', name: "零食", sales: 12, prace: 58810 },
    { id:'5', name: "饮料", sales: 4.0, prace: 70180 },
    { id:'6', name: "鼠标", sales: 9, prace: 87 },
    { id:'7', name: "玩具", sales: 69, prace: 809 }
  ];
});

