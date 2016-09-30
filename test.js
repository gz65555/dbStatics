/**
 * Created by HuSong on 2016/9/30.
 */
var md5 = require('md5');
var request = require('request');
var settings = require('./settings');
var mongoose = require('mongoose');

const COIN = 1;
//经验
const EXP = 2;
///元宝
const GOLD = 3;
//声望
const PRESTIGE = 4;
//荣誉
const HONOR = 5;
//军令
const ARMY_TOKEN = 6;
//装备碎片
const EQUIP_FRAGMENT = 7;
//武魂
const EQUIP_HERO_SOUL = 8;

function sendToUrl(gm_url, data_list) {
    data_list['request_time'] = Math.ceil(Date.now() / 1000);
    var no_md5 = "";
    var keys = Object.keys(data_list);
    keys.sort();
    keys.forEach(function (key) {
        no_md5 += data_list[key];
    });
    no_md5 += "&&**^&&*^&*^%^^%^%$$%$$##";
    data_list['sign'] = md5(no_md5).toUpperCase();
    // console.log(data_list['sign']);
    request.post({url: gm_url, form: data_list}, function (err, res, body) {
        // console.log(body);
    });
}

function sendAward(role_id, awards) {
    var url = "http://101.201.145.112:1888/game_manager/api";
    awards.forEach(function (item) {
        var params = {"gm_cmd": "reward", "role_id": role_id};
        params['key'] = item.key;
        params.value = item.value;
        sendToUrl(url, params);
    });
}
function sendToRoles(roleIds, awards) {
    roleIds.forEach(function (role_id) {
        sendAward(role_id, awards);
    })
}

var uri = "mongodb://{user}:{pass}@60.205.168.192:27017/admin";
uri = uri.replace('{user}', settings.user).replace("{pass}", settings.pass);
var db = mongoose.createConnection(uri);
var date = new Date();
date.setDate(date.getDate() - 1);
date.setHours(0);
date.setMinutes(0);
var start = Math.round(date.getTime() / 1000);
date.setHours(24);
var end = Math.round(date.getTime() / 1000);
db.on('open', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    var gm_log = db.useDb("gm_log");
    var collection = gm_log.collection("role_charge");
    collection.aggregate([
            {
                $match: {
                    log_time: {$gt: start, $lt: end}
                }
            },
            {
                $group: {
                    _id: '$role_id'  //$region is the column name in collection
                }
            }],
        function (err, result) {
            if (err) {
                return console.log(err);
            }
            send(result);
            db.close();
        }
    );
    // db.close();
    console.log("open");
    // var date = new Date();
});
function send(results) {
    // console.log(results);
    var awards = [];
    awards.push({"key": GOLD, "value": 100});
    awards.push({"key": ARMY_TOKEN, "value": 100});
    results.forEach(function (item) {
        var role_id = parseInt(item._id);
        sendAward(role_id, awards);
    })
}
// send();
