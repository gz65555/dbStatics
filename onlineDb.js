/**
 * Created by HuSong on 2016/10/23.
 */
var settings = require('./settings');
var mongoose = require('mongoose');

var uri = "mongodb://{user}:{pass}@60.205.168.192:27017/admin";
uri = uri.replace('{user}', settings.user).replace("{pass}", settings.pass);

var OnlineDb = (function () {
    function OnlineDb() {
        this.db = null;
        this.isConnecting = false;
    }
    OnlineDb.getInstance = function () {
        if (!OnlineDb.instance) {
            OnlineDb.instance = new OnlineDb();
        }
        return OnlineDb.instance;
    };
    OnlineDb.prototype.connect = function (callback) {
        var db = mongoose.createConnection(uri);
        this.db = db;
        db.on('open', function (err) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            callback();
            this.isConnecting = true;
            console.log("open");
        }.bind(this));

        db.on('close', function () {
            this.isConnecting = false;
            console.log("close");
        }.bind(this));
    };
    return OnlineDb;
}());

module.exports = OnlineDb.getInstance();
