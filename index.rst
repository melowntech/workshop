.. Melown 3D Stack - Workshop documentation master file, created by
   sphinx-quickstart on Fri Mar 10 21:33:38 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

###############################
What is VTS 3D Technology Stack
###############################

VTS 3D Technology Stack is an open source solution for streaming and interactive
rendering of 3D geospatial content over the internet developed by
`Melown Technologies <https://www.melown.com>`_. It is a client-server architecture
with C++ Linux backend components and JavaScript and C++ frontend libraries
for Web, Linux, MacOS and iOs development.

VTS 3D Stack consumes resources in various formats (see
:ref:`supported-formats`), takes care of data fusion, streaming and rendering
steps and provides an API to build interactive web or desktop applications.

The key imperatives that drive VTS evolution are:
* maintaining fast and lightweight frontend,
* offloading as much work as possible to the backend,
* reliance on existing open source libraries (GDAL, PROJ4) and standards
* scale independent and spatial coordinate system agnostic data model

How to get it
=============

The sources are available at `GitHub/Melown <https://github.com/Melown>`_.
For easier instalation, Melown Technologies provide binary packages of all
backend components for latest Ubuntu LTS. There is also a convenience package
with basic configuration for all componets allowing to install the whole stack
using just a single package - see :ref:`vts-backend` tutorial. Alternatively,
the VTS 3D Stack can be run using :ref:`docker`.

If you are interested merely in frontend development using JavaScript or C++
client, :ref:`melown-cloud` will provide you with needed base data.

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

