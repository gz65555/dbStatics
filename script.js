/**
 * Created by HuSong on 2016/10/21.
 */
var uri = "mongodb://{user}:{pass}@60.205.168.192:27017/admin";
var settings = require('./settings');
var mongoose = require('mongoose');
uri = uri.replace('{user}', settings.user).replace("{pass}", settings.pass);
var db = mongoose.createConnection(uri);
db.on('open', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    var dbx = db.useDb('gm_log');
    var role_charge = dbx.collection("role_charge");
    var role_create = dbx.collection("role_create");
    role_charge.find({},function (err, items) {
        if (err) {
            return console.log(err);
        }
        items.forEach(function (item_charge) {
            if(item_charge.platform == "" || item_charge.platform == null || item_charge.platform == "wx"
                || item_charge.name == "" || item_charge.name == null
                || item_charge.server_id == "" || item_charge.server_id == null) {
                role_create.findOne({role_id:parseInt(item_charge.role_id)}, function (err, item_create) {
                    // console.log("11");
                    if(item_create == null) {
                        return;
                    }
                    console.log(item_charge.name);
                    item_charge.platform = item_create.platform;
                    item_charge.name = item_create.name;
                    item_charge.server_id = item_create.server_id;
                    role_charge.update({ "_id":item_charge._id }, item_charge, { upsert:true });
                })
            }
        }, function () {
            // db.close();
        })
    });
});