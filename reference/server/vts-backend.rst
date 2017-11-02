.. _vts-backend:

***********
VTS Backend
***********

VTS Backend is a convenience package for simple installation and configuration
of all VTS backend components.

* `Main GitHub repository <https://github.com/Melown/vts-backend>`__
* Step by step :ref:`tutorial <setting-vts-backend>` on how to set it up


.. _vts-backend-howitworks:

How it works
============

Installing VTS Backend takes care of:
  * installing, configuring and running (through init-scripts) of :ref:`VTS Mapproxy <mapproxy>` and :ref:`VTSD <vtsd>`
  * installing all :ref:`commandline tools <cmdline-tools>`
  * installing :ref:`VTS Registry <vts-registry>`
  * setting up caching reverse-proxy listening at localhost:8070
  * creates storage for every :ref:`reference frame <reference-frame>` in VTS Registry

Once installed, URL ``localhost:8070/mapproxy/`` points to mapproxy upstream, therefore mapproxy resources (see :ref:`mapproxy reference <mapproxy-howitworks>`) are served from ::

	localhost:8070/mapproxy/<reference-frame>/<resource-type>/<resource-group>/<resource-id>/

. Similarly, URL ``localhost:8070/store/`` points to VTSD upstream which supports directory listing allowing to browse to particular :ref:`storage <storage>`, :ref:`tileset <tileset>` or :ref:`storage view <storage-view>`.