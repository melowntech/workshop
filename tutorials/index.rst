.. _learning-vts:

############
Learning VTS
############

The simplest way to get started with VTS is by following some of our tutorials. The tutorials are organized into two main sections and roughly sorted by complexity starting with the simplest ones.

.. _backend-tutorials:

Backend
=======

Backend tutorials are focused on setting up the VTS Backend environment, preprocessing your data and configuring the VTS streaming servers to serve them to client. It is a must-read if you plan to serve your own data through VTS.

* :ref:`vts-backend`: essential basic setup of VTS, most other backend tutorials build atop of it.
* :ref:`mars-peaks-valleys`: set up an interactive 3D globe using local data on your drive (DEM and imagery) and :ref:`mapproxy <mapproxy>`.
* :ref:`mars-peaks-and-valleys-searchable-nomenclature: add and style vector nomenclature labels and set up search functionality for the previous tutorial.
* :ref:`landuse-wms-dem`: combine maps available through WMS with open Copernicus DEM using :ref:`mapproxy <mapproxy>`.
* :ref:`landuse-wms-3d`: use :ref:`free layers <free-layer>` to combine 2D land use data with 3D city in eye-pleasing way.
* :ref:`cadastre-raster-vector-3d`: fuse two 3D models of Jenstejn village in :ref:`storage <storage>` and overlay them with both raster and styled vector cadastre.



Some more VTS case studies and tutorials are provided below.

Tutorials are separated into two main sections

* :ref:`backend-examples` - They are covering mostly `VTS-Browser-JS JavaScript
  library <https://github.com/melown/vts-browser-js>`_ and how to get the most
  from the 3D rendering library as well as how to add some GUI components.
* :ref:`frontend-examples` - They do exaplain the usage of some of the back-end
  compoments, mainly (but ont only) `VTS-VTSD
  <https://github.com/melown/vts-vtsd>`_ and `VTS-Mapproxy
  <https://github.com/melown/vts-mapproxy>`_.


.. toctree::
   :maxdepth: 0
   :titlesonly:
   :hidden:

   backend
   frontend
