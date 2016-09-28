/**
 * Created by husong on 16/9/22.
 */
var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var settings = require('./settings');
var bodyParser = require('body-parser');

var uri = "mongodb://{user}:{pass}@60.205.168.192:27017/admin";
uri = uri.replace('{user}', settings.user).replace("{pass}", settings.pass);
var db = mongoose.createConnection(uri);
db.on('open', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("open");
//
    var charge_log = db.useDb("gm_log");
    var collection = charge_log.collection("buy_item");
    collection.aggregate([
        {
            $group: {
                _id:'$proto_id',
                charge:{$sum: 1}
            }
        },
        {
            $sort : {
                charge : -1
            }
        },
        {
            $limit: 10
        }
    ], function (err, result) {
        if(err) {
            return console.log(err);
        }
        console.log(result);
    });
    //jg_charge.count({}, function(err, count){
    //    console.log(count);
    //});
//
//    function useOfAggregate() {
//        jg_charge.aggregate([
//            {
//                $group: {
//                    _id: '$log_date',  //$region is the column name in collection
//                    count: {$sum: '$log_time'}
//                }
//            }
//        ], function (err, result) {
//            if (err) {
//                return console.log(err);
//            }
//
//            console.log(result);
//        });
//    }
//
//
//    jg_charge.find({}).exec(function(err, items) {
//       items.forEach(function(item){
//
//       })
//    });
//
//    db.close();
//    //charge_log.execCommand();
//    //jg_charge.mapReduce()
});

var app = express();

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

app.use(express.static(path.join(__dirname, 'stastics-vue', 'dist')));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "stastics-vue", "dist", "index.html"));
});

// app.get('/account', function (req, res) {
//     res.sendFile(path.join(__dirname, "account.html"));
// });
//
// app.get('/role', function (req, res) {
//     res.sendFile(path.join(__dirname, "role.html"));
// });
//
// app.get('/templateIndex', function (req, res) {
//     res.sendFile(path.join(__dirname, "templateIndex.html"));
// });


app.use(bodyParser.json());
app.get('/api/jg-charge', function (req, res, next) {
    var charge_log = db.useDb('charge_log');
    var jg_charge = charge_log.collection("jg_charge");
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

});

app.listen(8800);