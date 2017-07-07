/**
 * WMTS fancy example
 */

/**
 * Set some environment variables
 */
var browser;

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
 * Switch vector free layers
 * @param {Object} view View configuration
 * @param {Boolean} visibility set visibility
 * @param {String} id layer identification
 * @return {Object} view object
 */
var switchFreeLayers = function(view, visibility, id) {

    if (visibility) {
      view.freeLayers[id] = {};
    } else {
      delete view.freeLayers[id];
    }
    return view;
};

/**
 * Check/uncheck layerswitcher event handler
 * @param {Event} evt change event
 */
var onInputChange = function(evt) {
  var view = browser.map.getView();

  switch (evt.target.id) {
    case 'czech':
      view = switchBoundLayer(view, evt.target.checked, 'ophoto-czech-ophoto');
      break;
    case 'austria':
      view = switchBoundLayer(
          view,
          evt.target.checked,
          'ophoto-austria-ophoto'
      );
      break;
    case 'roads':
      view = switchFreeLayers(view, evt.target.checked, 'vector-austria');
      break;
    case 'highways':
      view = switchFreeLayers(view, evt.target.checked, 'vector-roads');
      break;
    case 'gpx':
      view = switchFreeLayers(view, evt.target.checked, 'gpx');
      break;
    }

  browser.map.setView(view);
};

/**
 * Add GPX file
 * @param {XMLDom} data XML dom object - GPX representation
 */
var addGPXLayer = function(data) {
    var points = data.getElementsByTagName('wpt');
    var data_points = [];
    for (var i = 0, ii = points.length; i < ii; i++) {
      var pt = points[i];
      data_points.push([pt.getAttribute('lon'), pt.getAttribute('lat'), 0]);
    }

    var geodata = browser.map.createGeodata();
    geodata.addLineString(data_points);
    geodata.addPointArray(data_points);

    var freeLayer = geodata.makeFreeLayer({
      layers: {
        'line': {
          'line': true,
          'line-width': 10,
          'line-color': [255, 255, 0, 255],
          'zbuffer-offset': [-5, 0, 0]
        },
        'points': {
          'point': true,
          'point-radius': 15,
          'point-color': [0, 255, 255, 255],
          'zbuffer-offset': [-5, 0, 0]
        }
      }
    });

    browser.map.addFreeLayer('gpx', freeLayer);
};

/**
 * MapLoaded handler
 */
var onMapLoaded = function() {
  $.get('prague-insbruck.gpx', null, addGPXLayer, 'xml');
};

/**
 * Add control panel on the map canvas
 */
var addControl = function() {

    var panel = browser.ui.addControl('switch-panel',
        '<div class="switch-panel-div">' +
          '<input id="czech" type="checkbox">Czech</input><br />' +
          '<input id="austria" type="checkbox">Austria</input><br />' +
          '<input id="highways" type="checkbox">Highways</input><br />' +
          '<input id="roads" type="checkbox">Roads</input><br />' +
          '<input id="gpx" type="checkbox">GPX</input>' +
        '</div>');
    registerEvents(panel.element);
};

(function start() {

    browser = vts.browser('map-div', {
      map: 'http://localhost/melown2015/surface/melown/dem/mapConfig.json',
      view: {
        surfaces: {
          'melown-dem': []},
        freeLayers: { }
      }
    });

    addControl();
    browser.on('map-loaded', onMapLoaded);

})();
