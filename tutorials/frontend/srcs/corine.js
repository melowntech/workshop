/**
 * Corine and Urban atlas example
 */

/**
 * Set some environment variables
 */
var browser;
var geodata;

/**
 * Register onChange events on the layerswitcher
 * @param {Element} panel Layerswitcher panel element
 */
var registerEvents = function(panel) {
  var inputs = panel.getElementsByTagName('input');
  for (var i = 0, ii = inputs.length; i < ii; i++) {
    inputs[i].onchange = onInputChange;
  }
};

/**
 * Switch surface bound layers
 * @param {Object} view View configuration
 * @param {Boolean} visibility set visibility
 * @param {String} id layer identification
 * @return {Object} view object
 */
var switchBoundLayer = function(view, visibility, id) {

    if (visibility) {
      view.surfaces['melown-dem'].push(id);
    } else {
      var idx = view.surfaces['melown-dem'].indexOf(id);
      if (idx > -1) {
        view.surfaces['melown-dem'].splice(idx, 1);
      }
    }
    return view;
};

/**
 * Check/uncheck layerswitcher event handler
 * @param {Event} evt change event
 */
var onInputChange = function(evt) {
  var view = browser.map.getView();

  if (evt.target.checked) {
    view.surfaces["openlanduse-dem"].push("openlanduse-"+evt.target.id)
  } else {
      var idx = view.surfaces['openlanduse-dem'].indexOf("openlanduse-"+evt.target.id);
      if (idx > -1) {
        view.surfaces['openlanduse-dem'].splice(idx, 1);
      }
  }
  browser.map.setView(view);
};


/**
 * Add control panel on the map canvas
 */
var addControl = function() {

    var panel = browser.ui.addControl('switch-panel',
        '<div class="switch-panel-div">' +
          '<input id="corine" type="checkbox">Corine land cover 2012</input><br />' +
          '<input id="openlanduse" type="checkbox">Open Landuse</input><br />' +
        '</div>');
    registerEvents(panel.element);

};

(function start() {

    browser = vts.browser('map-div', {
      map: 'http://127.0.0.1:8070/mapproxy/melown2015/surface/openlanduse/dem/mapConfig.json',
      view: {
        surfaces: {
          'openlanduse-dem': []},
        freeLayers: { }
      }
    });

    addControl();

})();
