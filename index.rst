.. Melown 3D Stack - Workshop documentation master file, created by
   sphinx-quickstart on Fri Mar 10 21:33:38 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

**************************************
Documentation, Tutorials and Reference
**************************************

.. figure:: images/vts-geospatial-black-no-left-padding2.png
  :width: 400px

.. raw:: html

  <style>
    h1 {
      display: none;
    }
  </style>


VTS 3D Geospatial Software Stack is a state-of-the-art, full-stack
open source platform for 3D geospatial application development.  Consisting
of 3D streaming backend components and of JavaScript and C++ frontend
libraries, VTS provides for interactive 3D rendering of geospatial
content on the Web, on the desktop or on mobile.  VTS is designed
and engineered at `Melown Technologies <https://www.melown.com>`_.

..
  VTS 3D Stack works with data in various formats (see
  :ref:`supported-formats`), takes care of data fusion, streaming and rendering
  steps and provides an API to build interactive web or desktop applications.

The highlights of VTS 3D Stack are:

* complete open source system fro 3D maps streaming and rendering
* massively scalable and performance-oriented
* server-side data intergration tools
* dynamic DEM/DSM streaming
* GDAL raster and OGR vectors with stylesheets
* streams and renders photogrammetric 3D models (I3S, VEF, LODTree)
* WMS/WMTS and Mapbox vector tile support
* coordinate system agnostic with seamless polar caps
* reliance on existing open source libraries (GDAL, PROJ4) and standards

License
=======

The entire VTS 3D Stack is open source under the
`BSD 2-clause license <https://en.wikipedia.org/wiki/BSD_licenses#2-clause_license_.28.22Simplified_BSD_License.22_or_.22FreeBSD_License.22.29>`_.


Downloading VTS
===============

The sources are available at `GitHub/melowntech <https://github.com/melowntech>`_.
For easier instalation, Melown Technologies provide `binary packages of all
backend components <https://cdn.melown.com/packages/>`_ for latest Ubuntu LTS. There is also a convenience package
with basic configuration for all componets allowing to install the whole stack
using just a :ref:`single package <vts-backend>`.

Alternatively, the VTS 3D Stack components can be run using :ref:`docker-container`.

..
  do reference ke klientum, sem taky ne.

To obtain :ref:`mapconfig <map-configuration>` for development with VTS client APIs, you can:

* use one of the public URLs available from Melown Tech, or
* set up an account in :ref:`Melown Cloud <melown-cloud>`, or
* install and configure :ref:`VTS streaming servers <vts-backend>`.

..
  odtud dolu to sem uz uplne nepatri, jen rozumnejsi 'where to go next'.

.. _melown-cloud:

Melown Cloud
============

`Melown Cloud <https://www.melown.com/cloud>`_ is a cloud 3D map development platform operated by Melown Tech atop of VTS 3D Stack. It is a point-and-click interface to a subset of VTS functionality ideal for smaller projects and less technically savvy users.

It is also a great source of custom :ref:`mapconfigs <map-configuration>` for client application development.


Where to go next
================

.. toctree::
  :maxdepth: 1

  architecture
  tutorials/index
  reference/index


..
  Indices and tables
  ==================

  * :ref:`genindex`
  * :ref:`search`
