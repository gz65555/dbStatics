/**
 * Created by HuSong on 2016/9/24.
 */
var Store = (function () {
  function Store() {
    this.CHARGE_URL = "http://192.168.1.14:8800/api/jg-charge";
    this.ACCOUNT_URL = "http://192.168.1.14:8800/api/account-info";
    this.ROLE_URL = "http://192.168.1.14:8800/api/role_detail";
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
    var month = arr[1];
    var day = arr[2];
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
  return Store;
}());

var store = Store.getInstance();

module.exports = store;
