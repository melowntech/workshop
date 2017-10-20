.. Melown 3D Stack - Workshop documentation master file, created by
   sphinx-quickstart on Fri Mar 10 21:33:38 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

################################################
What is VTS 3D Map Streaming and Rendering Stack
################################################


dle webu/ plakatu/ Ondrovy FOSS4G prezentace
kvuli spravnym formulacim


VTS 3D Map Streaming and Rendering Stack is an open source solution for streaming and interactive
rendering of 3D geospatial content developed by
`Melown Technologies <https://www.melown.com>`_. It is a client-server architecture
with C++ Linux backend components and JavaScript and C++ frontend libraries
for Web, Linux, MacOS and iOS development.

..
  VTS 3D Stack works with data in various formats (see
  :ref:`supported-formats`), takes care of data fusion, streaming and rendering
  steps and provides an API to build interactive web or desktop applications.

The key features of VTS are:
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

The sources are available at `GitHub/Melown <https://github.com/Melown>`_.
For easier instalation, Melown Technologies provide `binary packages of all
backend components <https://cdn.melown.com/packages/>`_ for latest Ubuntu LTS. There is also a convenience package
with basic configuration for all componets allowing to install the whole stack
using just a :ref:`single package <vts-backend>`.

Alternatively, the VTS 3D Stack components can be run using :ref:`docker-container`.

To obtain :ref:`mapconfig <map-configuration>` for development
with VTS client APIs, you can:
* use one of the public URLs available from Melown Tech, or
* set up an account in :ref:`Melown Cloud <melown-cloud>`, or
* install and configure :ref:`VTS streaming servers <vts-backend>`.

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


Indices and tables
==================

* :ref:`genindex`
* :ref:`search`

