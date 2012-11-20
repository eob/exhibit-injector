/**
 * Exhibit Injector.
 * Injects an Exhibit into the HEAD element of a web site.
 * Dependencies: Sizzle
 */

var ExhibitInjector = {

  AddCssToHead: function(url) {
    var s = document.createElement('link');
    s.setAttribute('href', url);
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('type', 'text/css');
    document.getElementsByTagName('body')[0].appendChild(s);
  },

  AddJavascriptToHead: function(url) {
    var s = document.createElement('script');
    s.setAttribute('src', '" + url + "');
    document.getElementsByTagName('body')[0].appendChild(s);
  },

  RemapComponents: function() {
    for (elem in Sizzle("[data-remap=true]")) {
      var dest = elem.getAttribut("data-destination");
      var offset = elem.getAttribute("data-offset");
      if (typeof offset == "undefined") {
        offset = "after";
      }
      if (typeof dest == "undefined") {
        // ERROR
        return;
      }
      if (dest.size == 0) {
        // ERROR
        return;
      } else if (dest.size > 1) {
        // ERROR
        return;
      } else {
        dest = dest[0];
      }
      this.RemapComponent(elem, dest, offset);
    }
  },

  /*
   * relativePosition should be one of:
   *   replace, before, after, append, prepend
   */
  RemapComponent: function(srcElem, destElem, relativePosition) {
    if ((typeof srcElem != "undefined") &&
        (typeof destElem != "undefined")) {
      if (relativePosition == "replace") {
        destElem.parent.replaceChild(srcElem, destElem);
      } else if (relativePosition == "before") {
        destElem.parent.insertBefore(srcElem, destElem);
      } else if (relativePosition == "after") {
        destElem.parent.insertAfter(srcElem, destElem);
      } else if (relativePosition == "append") {
        destElem.insertAfter(srcElem, destElem.lastChild);
      } else if (relativePosition == "prepend") {
        destElem.insertBefore(srcElem, destElem.firstChild);
      } else {
        // ERROR
      }
    }
  },

  Boot: function() {
    // 1. Add Exhibit callback to RemapComponents

    // 2. Add Exhibit JS to head

    // 3. 

  }


};

