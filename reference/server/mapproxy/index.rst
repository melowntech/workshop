.. _mapproxy:

************
VTS-Mapproxy
************

`VTS Mapproxy <https://github.com/melown/vts-mapproxy>`_ is a HTTP server that
converts non-VTS resources (raster or vector) to VTS resources (:ref:`surface <surface>`,
:ref:`bound layer <bound-layer>` and :ref:`free layer <free-layer>`) on the fly.

For the first time setup it is recommended to install and run mapproxy as a part of :ref:`vts-backend` package or using :ref:`docker-container` container which relieve you from the server configuration.

* `Main GitHub repository <https://github.com/Melown/vts-mapproxy>`__
* `Build and install instructions <https://github.com/Melown/vts-mapproxy#download-build-and-install>`__ (GitHub)
* :ref:`Server configuration <mapproxy-configuration>`
* `Resource configuration`_ (GitHub)
* :ref:`mapproxy-troubleshooting`

.. _mapproxy-howitworks:

How it works
============

Once run as a binary with a configuration file or using init-script as in :ref:`VTS Backend <vts-backend>`, mapproxy periodically checks for newly defined resources in resource definition file or by asking a python script. This way new resources can be defined without need to restart or shut down mapproxy.

Once it comes across a new resource, mapproxy parses its definition and if the definition is valid, it creates a *generator* for the resource and freezes its configuration in mapproxy's *store*. 

.. note::
	Freezing configuration is meant as a failsafe in production environment, should the resource configuration file become corrupted. It also prevents user from changing some vital parameters of the resource that would result in client receiving incompatible mix of cached and fresh data.

	See :ref:`mapproxy-troubleshooting` on how to deal with mistakes in the resource configuration.

Mapproxy serves all valid resources on following URLs (see `Resource configuration`_ and :ref:`Server configuration <mapproxy-configuration>`)::

	<server>:<port>/<reference-frame>/<resource-type>/<resource-group>/<resource-id>/


.. toctree::
  :maxdepth: 1
  :hidden:

  configuration
  troubleshooting

.. _Resource configuration: https://github.com/Melown/vts-mapproxy/blob/master/docs/resources.md