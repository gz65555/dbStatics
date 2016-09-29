/**
 * Created by HuSong on 2016/9/24.
 */
var Store = (function () {
  function Store() {
    this.CHARGE_URL = "http://192.168.1.14:8800/api/jg-charge";
    this.ACCOUNT_URL = "http://192.168.1.14:8800/api/account-info";
    this.ROLE_URL = "http://192.168.1.14:8800/api/role_detail";
    this.ONLINE_URL = "http://192.168.1.14:8800/api/online_count";
    this.TOP10_URL = "http://192.168.1.14:8800/api/charge_top";
    this.role_id = null;
  }
  Store.getInstance = function () {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  };
  Store.prototype.getTimeStamp = function (date) {
    var arr = date.split('-');
    var year = arr[0];
    var month = parseInt(arr[1]);
    var day = parseInt(arr[2]);
    var d = new Date();
    d.setDate(day);
    d.setYear(year);
    d.setMonth(month - 1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    var start = Math.floor(d.getTime() / 1000);
    d.setHours(24);
    var end = Math.floor(d.getTime() / 1000);
    return [start, end];
  };
  Store.prototype.getCurrentFormatDate = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if(month < 10) {
      month = "0" + month;
    }
    if(day < 10) {
      day = "0" + day;
    }
    return year.toString() + '-' + month + '-' + day;
  };
  Store.prototype.formatServerTime = function (time) {
    var date = new Date(time * 1000);
    var hour = date.getHours();
    hour = hour < 10 ? "0" + hour : hour.toString();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes.toString();
    return hour + ":" + minutes;
  };
  return Store;
}());

var store = Store.getInstance();

module.exports = store;
