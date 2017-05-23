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
    applies to ``type=file``, path to resource configuration file (JSON)


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


.. _adding-resources:

Adding resources using configuration file
-----------------------------------------

The configuration file for resources uses JSON format. Each resource needs
following *common* options defined:

``comment``
    Human readable title of the resource
``credits``
    Attributions of the data source, see :ref:`credit`\s for more details.
``driver``
    Driver used for data reading
``group``
    Name of group, where this data source is added to.
``id``
    Resource custom id
``type``
    Resource data type - it can be one of ``surface, tms, geodata``, see
    :ref:`resource-types` for more details.
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
    :ref:`lod` range - you might know close term, used in some web mapping
    libraries the *zoom level*. This defines simple the range of *zoom levels*,
    where this concrete data source.
``tileRange``
    It defines range of tiles for the first ``lodRange`` (or, if you like, "zoom
    level 0"). It's an arry of two coordinate pairs. It basically defines *data
    bounding box* not using real coordinates, but tile index in X and Y axes.

.. _data-source-definition:

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

``mask``
    Reference to mask file. Mask is represented for each :ref:`lod` and each
    tile in separate file. See ref:`mask` for more details

.. _resource-types:

Configuring various ``types`` of resources
------------------------------------------

As mentioned in :ref:`adding-resources`, there are 3 types of resources
(configured using ``type`` option:

* ``surface``
* ``tms``
* ``geodata``

.. _tms-data:

Tile Map Service (TMS)
^^^^^^^^^^^^^^^^^^^^^^

`TMS <https://en.wikipedia.org/wiki/Tile_Map_Service>`_  (or, 
tiled maps in general, like `OGC WMTS <http://www.opengeospatial.org/standards/wmts>`_), 
Besides *common configuration options*, like ``comment, group, id, type`` etc,
you need to define :ref:`data-source-definition`.

.. _surface:

Surface
-------
Surface data are also represented using tiles. For each tile, 3 data tiles have
to be defined: minimum elevation value for the whole dataset, maximum elevation
value and the *actual* elevation value - so that the client
(:ref:`vts-browser-js` or :ref:`vts-browser-cpp` or alternative) can reconstruct
seem less elevation model.

.. note:: In the example, we are going to use ASTGTM2_N50E015_dem.tif Aster file
        name as model file name.

Assume, you  have DMT data, e.g. saved ad GeoTIFF file. In your ``datasets``
folder, create new folder for the data and copy the file in it

.. code-block:: bash

    mkdir datasets/aster1550
    cp ASTGTM2_N50E015_dem.tif datasets/aster1550/

Next, we have to create *overview* map data - something like GeoTIFF pyramids,
but since we need more metadata, ``gdaltindex`` can not be used. For this,
``generatevrtwo`` program is at your service. Overviews are important not just
for making data rendering more fast, but also it will make sure, that for small
datasets, the tiling will be ok.

As first step, we have do this for the dataset:

.. code-block:: bash

        generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem --resampling dem --tileSize 1024x1024
        
This will create new directory :file:`ASTGTM2_N50E015_dem` with tiled overview
maps and virtual dataset `VRTDataset file
<http://www.gdal.org/gdal_vrttut.html>`_ and reference to original data. You can
run ``gdalinfo`` on the :file:`dataset` file::

        $ gdalinfo -mm ASTGTM2_N50E015_dem/dataset

        Driver: VRT/Virtual Raster
        Files: ASTGTM2_N50E015_dem/dataset
               aster1550/ASTGTM2_N50E015_dem/original
               aster1550/ASTGTM2_N50E015_dem/0/ovr.vrt
               aster1550/ASTGTM2_N50E015_dem/1/ovr.vrt
               aster1550/ASTGTM2_N50E015_dem/2/ovr.vrt
        Size is 3601, 3601
        Coordinate System is:
        GEOGCS["WGS 84",
            DATUM["WGS_1984",
                SPHEROID["WGS 84",6378137,298.257223563,
                    AUTHORITY["EPSG","7030"]],
                AUTHORITY["EPSG","6326"]],
            PRIMEM["Greenwich",0],
            UNIT["degree",0.0174532925199433],
            AUTHORITY["EPSG","4326"]]
        Origin = (14.999861111111111,51.000138888888891)
        Pixel Size = (0.000277777777778,-0.000277777777778)
        Corner Coordinates:
        Upper Left  (  14.9998611,  51.0001389) ( 14d59'59.50"E, 51d 0' 0.50"N)
        Lower Left  (  14.9998611,  49.9998611) ( 14d59'59.50"E, 49d59'59.50"N)
        Upper Right (  16.0001389,  51.0001389) ( 16d 0' 0.50"E, 51d 0' 0.50"N)
        Lower Right (  16.0001389,  49.9998611) ( 16d 0' 0.50"E, 49d59'59.50"N)
        Center      (  15.5000000,  50.5000000) ( 15d30' 0.00"E, 50d30' 0.00"N)
        Band 1 Block=128x128 Type=Int16, ColorInterp=Gray
            Computed Min/Max=114.000,1594.000

You may see, that the file was opened with `Virtual raster driver
<http://www.gdal.org/gdal_vrttut.html>`_ and that the minimal and maximal values
are 114.000, 1594.000, what somehow corresponds to lowest and highest place in
Czech republic. 

Next we need to create *minimal* and *maximal* data files - files, which will
contain minimal and maximal values of the input :file:`ASTGTM2_N50E015_dem.tif`
file. We will just use resampling program ``generatevrtwo`` as before, with
``min`` and ``max`` resampling methods:

.. code-block:: bash
    
    generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem.min --resampling min --tileSize 1024x1024
    generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem.max --resampling max --tileSize 1024x1024

If you now have a look at generated overviews for minimal and maximal values,
using ``gdalinfo`` again::


    $ gdalinfo -mm ASTGTM2_N50E015_dem.max/0/ovr.vrt

    ...

    Min/Max=114.000,1588.000

    $ gdalinfo -mm ASTGTM2_N50E015_dem.min/0/ovr.vrt

    ...

    Min/Max=125.000,1594.000

.. note:: You can also create virtual dataset from multiple files and use it asi
    input for ``generatevrtwo``::

        $ cd aster
        $ ls 

        ASTGTM2_N46E009_dem.tif  ASTGTM2_N47E014_dem.tif  ASTGTM2_N49E009_dem.tif
        ASTGTM2_N46E010_dem.tif  ASTGTM2_N47E015_dem.tif  ASTGTM2_N49E010_dem.tif
        ASTGTM2_N46E011_dem.tif  ASTGTM2_N47E016_dem.tif  ASTGTM2_N49E011_dem.tif
        ...

        $ gdalbuildvrt aster.vrt *.tif
        $ generatevrtwo aster.vrt myaster --resampling dem --tileSize 1024x1024
        $ generatevrtwo aster.vrt myaster.min --resampling min --tileSize 1024x1024
        $ generatevrtwo aster.vrt myaster.max ...


Adding resources using Python script
------------------------------------

This options is here to have possibility to save configuration options to
database and being able to pick it back using Python script. 

.. todo:: This section is stub and needs more editing. 

.. _configure-mask:

Mask
----

.. todo:: Something more about masks and how are they generated.

Mask is saved in ``store`` Mapproxy configuration option, it's separated file,
containing mask for each tile for each :ref:`lod`. We have our mask prepared
previsously for our `basemap-at-ophoto` map.

