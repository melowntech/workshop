.. Melown 3D Stack - Workshop documentation master file, created by
   sphinx-quickstart on Fri Mar 10 21:33:38 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

###############################
What is VTS 3D Technology Stack
###############################


dle webu/ plakatu/ Ondrovy FOSS4G prezentace
kvuli spravnym formulace


VTS 3D Technology Stack is an open source solution for streaming and interactive
rendering of 3D geospatial content over a TCP/IP network developed by
`Melown Technologies <https://www.melown.com>`_. It is a client-server architecture
with C++ Linux backend components and JavaScript and C++ frontend libraries
for Web, Linux, MacOS and iOS development.

VTS 3D Stack works with data in various formats (see
:ref:`supported-formats`), takes care of data fusion, streaming and rendering
steps and provides an API to build interactive web or desktop applications.

The key imperatives that drive VTS evolution are:
* maintaining fast and lightweight frontend,
* ability to use existing geospatial web services like WMTS, WMS, OSM and WFS
* reliance on existing open source libraries (GDAL, PROJ4) and standards
* scale independent and spatial coordinate system agnostic data model
* no-downtime content adding, update or removal

License
=======



Downloading VTS
===============

The sources are available at `GitHub/Melown <https://github.com/Melown>`_.
For easier instalation, Melown Technologies provide binary packages of all
backend components for latest Ubuntu LTS. There is also a convenience package
with basic configuration for all componets allowing to install the whole stack
using just a single package - see :ref:`vts-backend` tutorial. Alternatively,
the VTS 3D Stack can be run using :ref:`docker`.

If you are interested merely in frontend development using JavaScript or C++
client, :ref:`melown-cloud` will provide you with needed base data.


Melown Cloud
============



Where to go next
================

.. toctree::
  :maxdepth: 1

  architecture
  concepts
  tutorials/index
  server/index
  client/index
  cloud/index


Indices and tables
==================

* :ref:`genindex`
* :ref:`search`

