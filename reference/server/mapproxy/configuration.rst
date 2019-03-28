.. index::
   double: LOD; Level of detail
   single: tileset
   single: resource
   double: VTS-Mapproxy; Mapproxy
   single: registry

.. _mapproxy-configuration:

Configuration
=============

Configuration of VTS-Mapproxy is saved in simple text file, using `INI file
format <https://en.wikipedia.org/wiki/INI_file>`_. You can get exhaustive list of
configuration options, by running :command:`mapproxy --help-all` command  in the
command line. Here we describe the most important options you may want to tweak.

The best starting point for configuring mapproxy on your own is a `fully commented 
configuration file <https://github.com/melowntech/vts-backend/blob/master/vts-backend/etc/mapproxy/mapproxy.conf>`__ used in VTS Backend.

Mapproxy configuration options
------------------------------

[log]
^^^^^
In the ``[log]`` section, you can define where and how the server logs will be
stored. Two important options you can set are ``mask`` and ``file``. 

``file``
    file configuration option should be path, where the logfile is stored.

``mask``
   This option set's the verbosity level of VTS-Mapproxy. It consists from Info,
   Error, Warning (and Debug) triplet (with the Debug option, it's of course
   quadruplet). You for each option, you can also define verbosity level using
   numbers 1-4. For example, the default verbosity configuration is set as Info
   to level 3 and Warning together with Error options to level nr. 2:
   ``I3E2W2``.

   It might look a bit complicated, therefore, you can also use one of the
   pre-defined keywords, which do already have the levels set:

   * ``DEFAULT`` - I3E2W2
   * ``VERBOSE`` - I2E2W2
   * ``ALL`` -  I1E1W1DD (here we use the ``DD`` option for debug messages)
   * ``ND`` - I1E1W1

[store]
^^^^^^^

``path``
  Path where extra resource metadata are stored once the resource is sucessfully loaded for the first time.

[http]
^^^^^^
In ``[http]`` section, the HTTP server options are configured, like:

``listen``
  The TCP endpoint, where to listen at, e.g. ``0.0.0.0:3070`` (the
  default value), possible formats are ``IP:PORT, :PORT`` or ``PORT``.

``threadCount``
  Number of parallel HTTP threads, defaults to number of CPU cores.

``enableBrowser``
  If ``true``, direct listing and browsing of published resources is possible and ``introspection`` section in resource definitions takes effect. Not recommended for production.

[resource-backend]
^^^^^^^^^^^^^^^^^^
Here is defined, how you configure you data resources with following options:

``type``
  Resource configuration type, is either ``conffile`` or ``python``.

``root``
  Root path of datasets defined as relative path.

Depending on ``type`` there is one more parameter.

resource backend conffile: configuration file-based resource backend:
  ``--resource-backend.path`` arg Path to resource file (JSON).

resource backend python: mysql-based resource backend:
  ``--resource-backend.script`` arg Path pythong script. It must privide global 
                                function run().

Resources configuration reference can be found in `vts-mapproxy repository on GitHub <https://github.com/melowntech/vts-mapproxy/blob/master/docs/resources.md>`__.


[gdal]
^^^^^^

Settings pertaining to internal GDAL operations:

``processCount``
  Number of parallel GDAL processes, defaults to number of CPU cores. ``core.threadCount`` should be same or higher than this.

``rssLimit``
  Real memory limit of all GDAL processes (in MB). Directly influences memory footprint of whole mapproxy, should be adjusted with respect of available memory. Low values may slow mapproxy down (it will repetitively kill large GDAL processes).

