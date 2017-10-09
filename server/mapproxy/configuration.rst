.. index::
   double: LOD; Level of detail
   single: tileset
   single: resource
   double: VTS-Mapproxy; Mapproxy
   single: registry

.. _mapproxy-configuration:

=============
Configuration
=============

Configuration of VTS-Mapproxy is saved in simple text file, using `INI file
format <https://en.wikipedia.org/wiki/INI_file>`_. You can get extensive list of
configuration options, by running :command:`mapproxy --help-all` command  in the
command line. First, we create directory with first project configuration

.. code-block:: bash

    mkdir mapproxy-project
    cd mapproxy-project
    $EDITOR mapproxy.conf

You can now add following lines in the
:download:`../../tutorials/projects/nc/mapproxy.conf` configuration file.

.. literalinclude:: ../../tutorials/projects/nc/mapproxy.conf
   :linenos:

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
In store section, ``path`` option has to be defined - where does VTS-Mapproxy
store it's metadata about it's resources

[http]
^^^^^^
In ``[http]`` section, the HTTP server options are configured, like

* ``listen`` the TCP endpoint, where to listen at, e.g. ``0.0.0.0:3070`` (the
  default value), possible formats are ``IP:PORT, :PORT`` or ``PORT``.
* ``threadCount`` number of parallel HTTP threads
* ``enableBrowser`` - ``true`` or ``false`` to enable browsing of files and
  directories published by the server.

[resource-backend]
^^^^^^^^^^^^^^^^^^
Here is defined, how you configure you data resources with following options:

**Common options:**

``type``
    resource configuration type, this can be either ``file`` or ``python``    

``root``
    path to data files (GDAL data sources), stored on the server

**Per-type options:**

``path``
    applies to ``type=file``, path to resource configuration file (JSON),

See :ref:`resources` for reference.


[gdal]
^^^^^^
Various settings for `GDAL <http://gdal.org>`_ processing tools. 

