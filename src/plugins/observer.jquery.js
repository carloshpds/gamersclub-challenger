import jquery from 'jquery'

(function($) {
  $.fn.observe = function(cb, e) {
    e = e || { subtree:true, childList:true, characterData:true };
    $(this).each(function() {
      function callback(changes) { cb.call(node, changes, this); }
      var node = this;

      (new MutationObserver(callback)).observe(node, e);
    });
  };
})(jquery)