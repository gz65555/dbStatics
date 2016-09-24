/**
 * Created by HuSong on 2016/9/24.
 */
var Store = (function () {
  function Store() {
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
