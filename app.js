/**
 * Created by husong on 16/9/22.
 */
var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');
var award = require('./sendAward');
var myDb = require('./onlineDb');
myDb.connect(function (err) {
    if(err) {
        console.log(err);
    }
});
var db = myDb.db;

var app = express();

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else  next();
});

app.use(express.static(path.join(__dirname, 'stastics-vue', 'dist')));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "stastics-vue", "dist", "index.html"));
});

app.use(function (req, res, next) {
    if(!myDb.isConnecting) {
        myDb.connect(function (err) {
            if(err) {
                return next(err);
            }
            next();
        });
        db = myDb.db;
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.get('/api/jg-charge', function (req, res, next) {
    var charge_log = db.useDb('gm_log');
    var logName = "role_charge";
    var jg_charge = charge_log.collection(logName);
    jg_charge.find({}, {_id: 0}, function (err, items) {
        if (err) {
            next(err);
            return;
        }
        var data = [];
        items.forEach(function (item) {
            data.push(item);
        }, function (err) {
            if (err) {
                next(err);
            }
            res.json(data);
        });
    })
});

app.get('/api/account-info', function (req, res, next) {
    var dbx = db.useDb('gm_log');
    var account = dbx.collection("role_create");
    account.find({}, function (err, items) {
        if (err) {
            next(err);
            return;
        }
        var data = [];
        items.forEach(function (item) {
            if (item.role_id) {
                data.push(item);
            }
        }, function (err) {
            if (err) {
                next(err);
            }
            res.json(data);
        });
    })
});

app.post('/api/role_detail', function (req, res, next) {
    var role_id = req.body.role_id;
    if (!role_id) {
        return next();
    }
    var dbx = db.useDb('gm_log');
    var collection = dbx.collection("role_create");
    var role_data = {};
    collection.findOne({role_id: parseInt(role_id)}, function (err, item) {
        if (err) {
            return next(err);
        }
        role_data['role'] = item;

        collection = dbx.collection("create_city");
        collection.findOne({role_id: parseInt(role_id)}, ["x", "y"], function (err, city) {
            if (err) {
                return next(err);
            }
            role_data['create_city'] = city;

            collection = dbx.collection("role_charge");
            collection.find({role_id: role_id.toString()}, ["rmb", "log_time"], function (err, charges) {
                if (err) {
                    next(err);
                }

                var charge_logs = [];
                charges.forEach(function (charge_i) {
                    charge_logs.push(charge_i);
                }, function () {
                    role_data['charges'] = charge_logs;
                    res.json(role_data);
                });
            });
            //res.json(role_data);
        });
    });
});

app.post('/api/online_count', function (req, res, next) {
    var date = req.body.date;
    var server_id = req.body.server_id;
    if (!date) {
        return next();
    }
    var dbx = db.useDb('gm_log');
    var collection = dbx.collection("online_count");
    var data = [];
    collection.find({date_time: new RegExp(date), server_id: parseInt(server_id)}, {
        "count": 1,
        "log_time": 1,
        "_id": 0
    }, function (err, items) {
        if (err) {
            return next(err);
        }
        items.forEach(function (item) {
            data.push(item);
        }, function () {
            res.json(data);
        })
    })
});

app.post('/api/charge_top', function (req, res, next) {
    var type = req.body.type;
    var charge_log = db.useDb("gm_log");
    var match = {};
    var groupId = "$proto_id";
    var c_name = "buy_item";
    if(type == 0) {
    } else if(type == 1) {
        match = {coin: { $gt: 1}}
    } else if(type == 2) {
        match = {gold: { $gt: 1}}
    } else if(type == 3) {
        c_name = "sub_gold";
        groupId = "$reason";
    }
    var collection = charge_log.collection(c_name);
    collection.aggregate([
        {
            $match: match
        },
        {
            $group: {
                _id: groupId,
                count: {$sum: 1}
            }
        },
        {
            $sort: {
                count: -1
            }
        },
        {
            $limit: 10
        }
    ], function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

app.post("/api/send-award", function(req, res, next) {
    var role_id = req.body.role_id;
    var type = req.body.type;
    var value = req.body.value;
    award.sendAwardByKey(role_id, type, value, function(body) {
        if(body == "success") {
            res.json({result: 1});
        } else {
            res.json({result: 0});
        }
    });
});

app.listen(8800);