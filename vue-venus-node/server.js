const express=require('express');
const fs=require('fs');
const pathlib=require('path');

const echart=JSON.parse(fs.readFileSync('./waf.json'));
const list=JSON.parse(fs.readFileSync('./list.json'));
const report=JSON.parse(fs.readFileSync('./report.json'));
const mail=JSON.parse(fs.readFileSync('./mail.json'));
const bxy=JSON.parse(fs.readFileSync('./bxy.json'));
const bxyList=JSON.parse(fs.readFileSync('./bxy_list.json'));
const workList=JSON.parse(fs.readFileSync('./work_list.json')); // 安全通报
const workRole=JSON.parse(fs.readFileSync('./work_role.json')); // 安全通报

let server=express();
server.listen(8888);

console.log('running at 8888');

server.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

server.get('/api/data/query', (req, res)=>{
    let type = req.query['type']
    if(type == 'blacklist_waf'){
        res.send(echart);
    }
    if(type == 'blacklist_ips'){
        res.send(echart);
    }
    if(type == 'blacklist_soc'){
        res.send(echart);
    }
    if(type == 'statistic_info'){
        res.send(bxy);
    }
});

server.get('/api/data/search/page', (req, res)=>{
    let type = req.query['type'];
    if(type==='blacklist'){
        res.send(list);
    }
    if(type==='terminal_info_page'){
        res.send(bxyList);
    }
})

server.get('/api/block/scheduler/status', (req, res)=>{
    res.send({"return":true,"status":true});
})

server.get('/api/block/scheduler/interval', (req, res)=>{
    res.send({"action":"get","interval":10,"return":true});
})

server.get('/api/block/scheduler/start', (req, res)=>{
    res.send({"return":true});
})

server.get('/api/block/scheduler/stop', (req, res)=>{
    res.send({"return":true});
})

server.get('/api/block/usage', (req, res)=>{
    res.send({"text": "封堵说明", "return": "true"});
})

server.get('/api/valuemapping', (req, res)=>{
    res.send({"blacklist":{"status":[{"text":"取消封堵","value":"2"}, {"text":"已封堵","value":"1"}, {"text":"新记录","value":"0"}]}});
})


server.get('/api/dailyreport/page', (req, res) => {
    res.send(report)
})

// 邮箱
server.get('/api/dailyreport/config', (req, res) => {
    res.send(mail)
})

// 安全通报
server.get('/work/list', (req, res)=>{
    res.send(workList)
})
server.get('/work/role', (req, res)=>{
    res.send(workRole)
})

// server.get('/works/detail', (req, res)=>{
//     res.send(notifiedList)
// })
