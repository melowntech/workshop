.. _learning-vts:

############
Learning VTS
############

The simplest way to get started with VTS is by following some of our tutorials. The tutorials are organized into two main sections and roughly sorted by complexity starting with the simplest ones.

.. _backend-tutorials:

Backend
=======

Backend tutorials are focused on setting up the VTS Backend environment, preprocessing your data and configuring the VTS streaming servers to serve the data to the client. It is a must-read if you plan to serve your own data through VTS.

* :ref:`vts-backend`: essential basic setup of VTS, most other backend tutorials build atop of it.
* :ref:`mars-peaks-valleys`: set up an interactive 3D globe using local data on your drive (DEM and imagery) and :ref:`mapproxy <mapproxy>`.
* :ref:`mars-peaks-and-valleys-searchable-nomenclature: add and style vector nomenclature labels and set up search functionality for the previous tutorial.
* :ref:`landuse-wms-dem`: combine maps available through WMS with open Copernicus DEM using :ref:`mapproxy <mapproxy>`.
* :ref:`landuse-wms-3d`: use :ref:`free layers <free-layer>` to combine 2D land use data with 3D city in eye-pleasing way.
* :ref:`bing-maps-tms`: leverage mapproxy drivers to use Bing Maps in your maps.
* :ref:`cadastre-raster-vector-3d`: fuse two 3D models of Jenstejn village in :ref:`storage <storage>` and overlay them with both raster and styled vector cadastre sourced from MBtiles archive.

.._frontend-tutorials:

Frontend
========

Frontend tutorials are focused on building apps on top of the VTS browser API, describing various parts of its functionality. Being the most accessible, most torials are focused on the :ref:`JavaScript API <vts-browser-js>`. A few tutorials are sequels of backend tutorials but most of them can be followed without setting up VTS Backend.

* :ref:`vtsjs-simple-app`: set up the most basic JavaScript web application possible to browse your maps.
* :ref:`vtsjs-gpx-viewer`: use VTS-Browser-JS `Geodata API <https://github.com/Melown/vts-browser-js/wiki/VTS-Browser-Map-API#geodata-creation>`_ to visualize GPX.
* :ref:`vtsjs-geojson-1`: import GeoJSON from arbitrary source and learn how to style geodata.
* :ref:`vtsjs-geojson-2`: display geodata programmatically generated at frontend, do more advanced styling.
* :ref:`vtsjs-geojson-3`: create interactive application by use of hover events and style switching.
* :ref:`vtsjs-landuse`: enhance the map with interactive layer control and a legend.
* :ref:`vtsjs-import-obj`: place OBJ models from arbitrary source into your map and get more in-depth view to the rendering pipeline.
* `List of JSFiddle live examples <https://github.com/Melown/vts-browser-js/wiki/Examples>`__: extensive list of live examples focused on single feature of VTS-Browser-JS. Some of them are referenced from previous tutorials but there is a lot more worth to check.

.. toctree::
   :maxdepth: 0
   :titlesonly:
   :hidden:

   backend
   frontend
