.. index::
   double: LOD; Level of detail
   single: tileset
   single: resource
   double: VTS-Mapproxy; Mapproxy
   single: registry

.. _mapproxy:

************
VTS-Mapproxy
************

`VTS-Mapproxy <https://github.com/melown/vts-mapproxy>`_ is a HTTP server that
converts non-VTS resources (raster or vector) to VTS resources (surface,
boundlayer, freelayer) on the fly.

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

You can now add following lines in the :file:`mapproxy.conf` configuration
file.

.. literalinclude:: mapproxy.conf
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
   numbers 1-3. For example, the default verbosity configuration is set as Info
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
  default value)
* ``threadCount`` number of parallel HTTP threads
* ``enableBrowser`` - ``true`` or ``false`` to enable browsing of files and
  directories published by the server.

[resource-backend]
^^^^^^^^^^^^^^^^^^
Here is defined, how you configure you data resources with following options:

``type``
    resource configuration type, this can be either ``file`` or ``python``    

``path``
    path to resource configuration file

``root``
    path to data files (GDAL data sources), stored on the server

[gdal]
^^^^^^
Various settings for `GDAL <http://gdal.org>`_ processing tools. 

===================
Adding data sources
===================

In the section :ref:`mapproxy-configuration`, we provided VTS-Mapproxy with link
to resource configuration file in the ``[resource-backend]`` section. We now
have to edit the :file:`resources.json` file to add some :ref:`resource` there.
There are two possible ways, how to define resources - using configuration file
or using Python script.

The whole configuration can be seen in `resources.json <resources.json>`_ file
example. There are two resources being stored: The first one is of type *tms*
(aka tiled map service) and the second one is *surface*.

.. literalinclude:: resources.json
   :linenos:


Adding resources using configuration file
-----------------------------------------

The configuration file for resources uses JSON format. Each resource needs
following options defined:

``comment``
    Human readable title of the resource
``credits``
    Attributions of the data source
``driver``
    Driver used for data reading
``group``
    Name of group, where this data source is added to.
``id``
    Resource custom id
``type``
    Resource data type - it can be one of ``surface, tms, geodata``
``referenceFrames``
    :ref:`reference-frame` defines fixed `geospatial reference
    <https://en.wikipedia.org/wiki/Spatial_reference_system>`_ for all data
    within a map. There can be more reference frames defined for the resource.
    See :ref:`referenceframe-configuration` section for it's own options. The
    structure uses keys as reference frame ID (so it's dictionary, not simple
    list).
``registry``
    VTS-Mapproxy does have global registry of various values. The registry can
    be filled in with aditional data. In our example, we are extending the
    ``credist`` dictionary with definition of our attribution. You can find more
    registry informations in :file:`/opt/vts/etc/registry/` directory.
``definition``
    Data source definition, see :ref:`data-source-definition`

.. _referenceframe-configuration:

Reference frame configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Each :ref:`resource` can have one or more :ref:`reference-frame`
configurations. The :ref:`reference-frame` configuration options are

``lodRange``
    Level of detail range - you might know close term, used in some web mapping
    libraries the *zoom level*. This defines simple the range of *zoom levels*,
    where this concrete data source.
``tileRange``
    It defines range of tiles for the first ``lodRange`` (or, if you like, "zoom
    level 0"). It's an arry of two coordinate pairs. It basically defines *data
    bounding box* not using real coordinates, but tile index in X and Y axes.

.. data-source-definition:

Data source definition
^^^^^^^^^^^^^^^^^^^^^^
In our example, we ad GDAL resource of type `Tiled map service
<http://gdal.org/frmt_wms.html>`_, using GDAL's XML source defintion file. The
only other thing we define, is requested format of the images, which will be
JPEG.

``dataset``
    Path to the GDAL source data file (relative to ``resource-backend.root``
    configuration option in the :ref:`mapproxy-configuration` file.

``format``
    Data format (``jpg``) in our case.

Adding resources using Python script
------------------------------------

This options is here to have possibility to save configuration options to
database and being able to pick it back using Python script. 

.. todo:: This section is stub and needs more editing. 


    
.. _mapproxy-running:

=======
Running
=======

You should have now 3 files in your project directory (if you cloned from
`prepared sample project <https://github.com/melown/mapproxy-project>`_, there
might be the :file:`README.md` file too::

    ├── datasets
    │   └── basemap-at-ophoto.xml
    ├── mapproxy.conf
    └── resources.json

You can now run your VTS-Mapproxy server instance::

    $ mapproxy --config mapproxy.conf

    2017-05-01 14:20:56 I3 [2326(main)]: Loaded configuration from <mapproxy.conf>. {program.cpp:configureImpl():409}
    2017-05-01 14:20:56 I3 [2326(main)]: [mapproxy] Config:
	store.path = "/home/ubuntu/mapproxy/store/"
	http.listen = 0.0.0.0:3070
	http.threadCount = 2
	http.client.threadCount = 1
	http.enableBrowser = true
	core.threadCount = 2
	gdal.processCount = 2
    ...

After you run the server, first, since we have ``enableBrowser`` turned on, you
can now go to http://localhost:3070/ and browse our VTS-Mapproxy server
instance. What you can see at first sight, there are are lots of
:ref:`reference-frame` defined - we did not have to do this at all. Also, if you
have a look in the base directory, dir was added :file:`store`, where all those
reference frames were add. And the VTS-Mapproxy server is now serving them on
the port 3070.

The structure of the :file:`store` directory is following:

``/*``
    list of :ref:`reference-frame`. The list was generated automatically from
    VTS-Mapproxy. 

    * http://localhost:3070/

``/[REFERENCE-FRAME]/*``

    list of source *types* - in our case, there is ``tms`` and ``surface``
    resource types

``/[REFERENCE-FRAME]/[RESOURCE-TYPE]/*``

    list of :ref:`resource` *groups*, as they are defined in our :file:`resources.json` 
    in our configuration file. There are currently two resources groups defined:
    ``melown`` for the ``spheroid`` resource and ``basemap-at`` group for the
    ``basemap-at-ophoto`` resource.

    * http://localhost:3070/melown2015/surface/ - for the surface on the sphere
    * http://localhost:3070/melown2015/tms/ - for the surface on the sphere
    * http://localhost:3070/webmerc-projected/surface/ - for "Google Mercator" projection
    * http://localhost:3070/webmerc-projected/tms/ - for "Google Mercator" projection
    * and others

``/store/[REFERENCE-FRAME]/[REFERENCE-GROUP]/*``
    list of **resources** assinged to ``REFERENCE-GROUP`` - in our case, we have
    two:

    # ``basemap-at-photo`` of type ``tms``
    # ``spheroid`` of type ``surface``
   
    * http://localhost:3070/melown2015/surface/melown/spheroid/
    * http://localhost:3070/webmerc-projected/tms/basemap-at/basemap-at-ophoto/ 


.. note:: You can also hit into other resource types, like
        :file:`.system/tms-aster-patchwork`, which is generated tiled resource,
        with every tile having different color

        http://localhost:3070/webmerc-projected/tms/.system/tms-raster-patchwork/
    

We now should be able to see 2D map (using Leaflet) of Austrian orthophoto image
service http://localhost:3070/webmerc-projected/tms/basemap-at/basemap-at-ophoto/ 

And we should also see the same map, projected on sphere http://localhost:3070/melown2015/surface/melown/spheroid/ - the sphere might look empty, but you can always find "Vienna" in the search field and you should end up on URL similar to this: http://localhost:3070/melown2015/surface/melown/spheroid/?pos=obj,16.372504,48.208354,fix,0.00,0.00,-60.00,0.00,30000.00,55.00

.. figure:: spheroid-vienna.png
