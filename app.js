/**
 * Created by husong on 16/9/22.
 */
var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var settings = require('./settings');

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
//    var charge_log = db.useDb("charge_log");
//    var jg_charge = charge_log.collection("jg_charge");
//    //jg_charge.count({}, function(err, count){
//    //    console.log(count);
//    //});
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

app.use("/static", express.static(path.join(__dirname, 'static')));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/account', function(req, res){
    res.sendFile(path.join(__dirname, "account.html"));
});

app.get('/role', function (req, res) {
    res.sendFile(path.join(__dirname, "role.html"));
});

app.get('/templateIndex', function (req, res) {
    res.sendFile(path.join(__dirname, "templateIndex.html"));
});

app.get('/api/jg-charge', function(req, res, next) {
    var charge_log = db.useDb('charge_log');
    var jg_charge = charge_log.collection("jg_charge");
    jg_charge.find({}, {_id:0}, function(err, items){
        if(err) {
            next(err);
            return;
        }
        var data = [];
        items.forEach(function(item){
            data.push(item);
        }, function(err) {
            if(err) {
                next(err);
            }
            res.json(data);
        });
    })
});

app.get('/api/account-info', function(req, res, next) {
    var dbx = db.useDb('account');
    var account = dbx.collection("account");
    account.find({}, function(err, items) {
        if(err) {
            next(err);
            return;
        }
        var data = [];
        items.forEach(function(item){
            if(item.role_id) {
                data.push(item);
            }
        }, function(err) {
            if(err) {
                next(err);
            }
            res.json(data);
        });
    })
});

app.get('/api/role_detail', function(req, res, next) {
    var dbx = db.useDb('account');
    var account = dbx.collection("account");
    account.find({}, function(err, items) {
        if(err) {
            next(err);
            return;
        }
        var data = [];
        items.forEach(function(item){
            if(item.role_id) {
                data.push(item);
            }
        }, function(err) {
            if(err) {
                next(err);
            }
            res.json(data);
        });
    })
});

app.listen(8800);