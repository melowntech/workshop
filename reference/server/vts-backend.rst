.. _vts-backend:

***********
VTS Backend
***********

VTS Backend is a convenience package for simple installation and configuration
of all VTS backend components. There is a :ref:`step by step tutorial <setting-vts-backend>`
on how to set it up.

Installation takes care of:
  * installing, configuring and running (through init-scripts) of :ref:`VTS Mapproxy <vts-mapproxy>` and :ref:`VTSD <vtsd>`
  * installing all :ref:`commandline tools <cmdline-tools>`
  * installing :ref:`VTS Registry <vts-registry>`
  * setting up caching reverse-proxy listening at localhost:8070 - a main entry point for browsing your map configurations

The source is available on `GitHub <https://github.com/Melown/vts-backend>`__.
