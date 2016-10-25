/**
 * Created by husong on 10/5/16.
 */
var request = require('request');
var settings = require('./settings');
var md5 = require('md5');

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

function sendToUrl(gm_url, data_list, callback) {
    data_list['request_time'] = Math.ceil(Date.now() / 1000);
    var no_md5 = "";
    var keys = Object.keys(data_list);
    keys.sort();
    keys.forEach(function (key) {
        no_md5 += data_list[key];
    });
    no_md5 += settings.secret;
    data_list['sign'] = md5(no_md5).toUpperCase();
    // console.log(data_list['sign']);
    console.log(data_list['sign']);
    request.post({url: gm_url, form: data_list}, function (err, res, body) {
        if(err) {
            callback(err);
        } else {
            callback(body);
        }
        console.log(body);
    });
}

exports.sendAwardByKey = sendAwardByKey = function(role_id, key, value, callback) {
    var url = "http://101.201.145.112:1888/game_manager/api";
    var params = {"gm_cmd": "reward", "role_id": role_id};
    params['key'] = key;
    params.value = value;
    sendToUrl(url, params, callback);
};

function sendAward(role_id, awards) {
    awards.forEach(function (item) {
        sendAwardByKey(role_id, item.key, item.value);
    });
}