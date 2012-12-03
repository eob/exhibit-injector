console.log("Hi");

var CustomDataImporter = {
    _registryKey: "customDataImporter"
};

$(document).bind("registerStaticComponents.exhibit", function(evt, staticRegistry) {
  if (!staticRegistry.hasRegistry(CustomDataImporter._registryKey)) {
    staticRegistry.createRegistry(CustomDataImporter._registryKey);
    $(document).trigger("registerCustomDataImporter", staticRegistry);
  }
});

var CustomDataImporterImpl = function() {
  var self = this;
  this._type = "customDataImporterImpl";
  $(document).bind("registerCustomDataImporter", function(evt, staticRegistry) {
    staticRegistry.register(CustomDataImporter._registryKey, self._type, this);
  });

  self.LoadData = function(getDataFunc, convertFunc)  {
    getDataFunc(function(json) {
      var exhibitJSON = convertFunc(json);
      console.log("Adding to database", exhibitJSON);
      window.exhibit.getDatabase().loadData(exhibitJSON);
    });
  };
};

window.importJavascript = function(url) {
  var s = document.createElement('script');
  s.setAttribute('src', url);
  document.getElementsByTagName('body')[0].appendChild(s);
}

window.loadExhibit = function() {
  window.importJavascript("http://api.simile-widgets.org/exhibit/3.0.0/exhibit-api.js");
}

window.fetchCustomData = function(callback) {
  var json = {"ted": "foo"};
  callback(json);
}

window.convertCustomDataToJson = function(json) {
  return {"items":[
    {"label": "ted"},
    {"label": "ted1"}
  ]};
}

$(document).bind("exhibitConfigured.exhibit", function(evt, staticRegistry) {
  console.log("TED Loading");
  var loader = new CustomDataImporterImpl();
  loader.LoadData(window.fetchCustomData, window.convertCustomDataToJson);
});

window.loadExhibit();
