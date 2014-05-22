var BigApple = BigApple || {};

(function(){

/***** Local Storage Helper functions for storing data ****/


 BigApple.NotesStore = function(){

  function NotesStore(){

  }

  NotesStore.prototype.setObject = function(key, value) {
    if (!key || !value) {return;}

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  };

  NotesStore.prototype.getObject = function(key) {
    var value = localStorage.getItem(key);
    if (!value) {return;}
    value = JSON.parse(value);
    return value;
  };

  NotesStore.prototype.getLength = function(key){
    var data = this.getObject(key);
    return data ? data.length : 0;
  };

  return NotesStore;

}();

}).call(this);

