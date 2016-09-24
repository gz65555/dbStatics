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
  return Store;
}());

var store = Store.getInstance();
