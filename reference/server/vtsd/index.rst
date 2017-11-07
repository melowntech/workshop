
.. _vtsd:

****
VTSD
****

`VTSD (VTS-Deamon) <https://github.com/melown/vts-vtsd>`__ is an HTTP server for streaming static surfaces and map configuration delivery with nginx-like configuration

For the first time setup it is recommended to install and run VTSD as a part of :ref:`vts-backend` package or using :ref:`docker-container` container which takes care of configuring and running the server.

* `Main GitHub repository <https://github.com/melown/vts-vtsd>`__
* `Build and install instructions <https://github.com/Melown/vts-vtsd#download-build-and-install>`__
* `Commented sample configuration file <https://github.com/Melown/vts-backend/blob/master/vts-backend/etc/vtsd/vtsd.conf>`__. To get complete list of options, run :command:`vtsd --help-all`.
* :ref:`Troubleshooting <vtsd-troubleshooting>`

.. toctree::
  :maxdepth: 1
  :hidden:
  :titlesonly:

  troubleshooting

.. _vtsd-howitworks:

How it works
============

Once running, it behaves similarly as `nginx <https://www.nginx.com/>`__ webserver. If you access an URL matching *location* where ``dataset`` is set to ``true`` (which is the default), VTS will try to open underlaying filesystem path as:

* storage - looking for a ``storage.conf`` within a directory,
* tileset - looking for a ``tileset.conf`` within a directory,
* or storage view (parsing given path as JSON). 

VTSD will return :ref:`map configuration <map-configuration>` for the first entity it successfully opens. If none of above succeeds, VTSD will return a directory listing of underlaying path if configured to do so.
