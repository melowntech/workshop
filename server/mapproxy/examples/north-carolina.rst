.. index::
    single: tutorial
    single: example
    single: North Carolina

.. _north-carolina:

North Carolina dataset example
------------------------------

In this little tutorial, we are going to publish data from `North Carolina dataset`_
which is distributed along with `The Open Source GIS: A GRASS GIS Approach`_ book.

Download sample data
^^^^^^^^^^^^^^^^^^^^
First we have to download the sample data and unzip them. You can find them
under description *Data in common GIS formats (NC data set)*::

    $ mkdir nc-project
    $ cd nc-project
    $ wget http://grass.osgeo.org/sampledata/north_carolina/nc_rast_geotiff.tar.gz
    $ tar -xzf nc_rast_geotiff.tar.gz

Create datasets for publishing
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
For each raster file, 3 steps need to be performed, in order to get them
published:

#. Create `GDAL Virtual Format`_
#. Get :ref:`lod` range and tile ranges for given :ref:`reference-frame`
#. Generate tiles for the :ref:`lod` range and tile ranges.

We also have to make the decision: in which :ref:`reference-frame` are we going
to prepare the data? VTS (see :ref:`registry`) is distributed along with
some pre-defined :ref:`reference-frame`\s. We try to publish the data in two of
them:: ``melown2015``, which is represented as sphere of Earth's shape and
``webmerc-projected``, which is the popular web mapping projection.

Once we have this, we can finally ad the tiled dataset to the
:file:`resources-nc.json` configuration file.

First we create ``datasets`` directory, where all *to-be-published data* will be
stored. We will copy :file:`elevlid_D792_6m.tif`, :file:`elevlid_D793_6m.tif` and
:file:`ortho_2001_t792_1m.tif` to the ``datasets`` directory::

    $ mkdir datasets
    $ cp ../ncrast/ortho_2001_t792_1m.tif .
    $ cp ../ncrast/elevlid_D792_6m.tif .
    $ cp ../ncrast/elevlid_D793_6m.tif

.. note:: Following 3 steps - tiling virtual overviews, tiling information and
        adding layer definition to ``resources-nc.json`` file, can be done with
        only one helper script ``mapproxy-dem2dataset``

Step 1. Create virtual datasets
"""""""""""""""""""""""""""""""
Next, we will create virtual overviews (step nr. 1.) using `GDAL Virtual
Format`_. Let's start with the ortho photo, we will use :ref:`generatevrtwo`
program for that::

    $ mkdir ortho
    $ generatevrtwo ortho_2001_t792_1m.tif ortho/ortho_2001_t792_1m --resampling texture --tileSize 1023x1024

New directory ``ortho`` was created.

Next we first join the two elevation raster files together using GDAL::

    $ gdalbuildvrt elevlid_6m.vrt elevlid_D7*_6m.tif

New file :file:`elevlid_6m.vrt` was created and can be used as input to
:ref:`generatevrtwo`.

For elevation maps, 3 maps have to created: The DEM, it's minimums and
maximums, they are supposed to be stored in common directory::

    $ mkdir elev
    $ generatevrtwo elevlid_6m.vrt elev/elevlid_6m --tileSize 1024x1024 --resampling dem
    $ generatevrtwo elevlid_6m.vrt elev/elevlid_6m.min --tileSize 1024x1024 --resampling min
    $ generatevrtwo elevlid_6m.vrt elev/elevlid_6m.max --tileSize 1024x1024 --resampling max

It is expected, that there will be files called ``dem``, ``dem.min`` and
``dem.max`` in the target surface directory. It is also expected, that there
will be file called ``ophoto`` for the aerial image overlay. We will create
symlinks in the next step, pointing to the :file:`dataset` file in each virtual
dataset::

    $ ln -s elevlid_6m/dataset elev/dem
    $ ln -s elevlid_6m.min/dataset elev/dem.min
    $ ln -s elevlid_6m.max/dataset elev/dem.max
    $ ln -s ortho_2001_t792_1m/dataset ortho/ophoto

So as result, we should have following files in the ``datasets/elev``
directory::

    dem -> elevlid_6m/dataset
    dem.max -> elevlid_6m.max/dataset
    dem.min -> elevlid_6m.min/dataset
    elevlid_6m
    elevlid_6m.max
    elevlid_6m.min

Same for ``datasets/ortho``::

    ophoto -> ortho_2001_t792_1m/dataset
    ortho_2001_t792_1m
    

Step 2. Get LOD and Tile Ranges
"""""""""""""""""""""""""""""""

For this :ref:`mapproxy-calipers` is intended to be used. We have to run the
program twice, since need tile ranges and LOD ranges for two reference frames::

    $ mapproxy-calipers ortho/ophoto --referenceFrame melown2015
    gsd: 1.00009
    range<pseudomerc>: 14,20 20/147533,206320:147582,206369
    range: 14,20 2305,3223:2305,3224
    position: obj,-78.679859,35.741618,float,0.000000,0.000000,-90.000000,0.000000,3976.856825,55.000000

    $ mapproxy-calipers ortho/ophoto --referenceFrame webmerc-projected
    gsd: 1.00116
    range<pseudomerc>: 13,19 19/147533,206320:147582,206369
    range: 13,19 2305,3223:2305,3224
    position: obj,-8758601.820640,4265126.500780,float,0.000000,0.000000,-90.000000,0.000000,4914.944902,55.000000

Same applies for the elevation map::
    
    $ mapproxy-calipers elev/dem --referenceFrame melown2015
    2017-05-27 00:51:04 I3 [13965(main)]: [mapproxy-calipers] Config:
    gsd: 6.09655
    range<pseudomerc>: 13,17 17/18441,25783:18447,25796
    range: 13,17 1152,1611:1152,1612
    position: obj,-78.679784,35.755369,float,0.000000,0.000000,-90.000000,0.000000,7942.408707,55.000000
        
    $ mapproxy-calipers elev/dem --referenceFrame webmerc-projected
    gsd: 6.10308
    range<pseudomerc>: 12,16 16/18441,25783:18447,25796
    range: 12,16 1152,1611:1152,1612
    position: obj,-8758593.532230,4267013.234048,float,0.000000,0.000000,-90.000000,0.000000,9819.071479,55.000000
    
Step 3. Generate tiling information
"""""""""""""""""""""""""""""""""""
For tiling files generation :ref:`mapproxy-tiling` is used. As input, we need
:ref:`reference-frame`, :ref:`lod` and input dataset defined. As already pointed
out it is expected, that there is either `ophoto` or `dem` files in target
dataset directory.

Now we can tile the data for the reference frames, we will start with the
orthophoto. The ``--lodRange`` and ``--tileRange`` parameters are taken from the
output from :ref:`mapproxy-calipers` from the **Step 2** before.::

    $ mapproxy-tiling ortho --referenceFrame melown2015 --lodRange 13,19 --tileRange 19/147533,206320:147582,206369
    $ mapproxy-tiling ortho --referenceFrame webmerc-projected --lodRange 14,20 --tileRange 20/147533,206320:147582,206369

Same for our DEM::

    $ mapproxy-tiling elev --referenceFrame melown2015 --lodRange 13,17 --tileRange 17/18441,25783:18447,25796
    $ mapproxy-tiling elev --referenceFrame webmerc-projected --lodRange 12,16 --tileRange 16/18441,25783:18447,25796
    

Configure VTS-Mapproxy
^^^^^^^^^^^^^^^^^^^^^^
Two files have to be created: the :file:`resources-nc.json` and :file:`maproxy.conf` (the names do not
have to be like this, but we will stick to those names in frame of this
tutorial).

First, let's create :file:`mapproxy.conf` with following content:

.. literalinclude:: projects/nc/mapproxy.conf

.. note:: You can download the file directly :download:`projects/nc/mapproxy.conf`

The configuration values should be self-explaining. For more configuration
options, you can have a look at ``mapproxy --help-all`` output. Just few
comments:

    * Resources will be loaded from :file:`resources-nc.json`
    * It is assumed, that all the data are loaded from ``datasets`` directory
    * Generated cache tiles are stored in ``store`` directory
    * Since ``max-age`` is set to -1, nothing will be cached in the browser.

Next, we have to create :file:`resources-nc.json` file. It's an JSON file. There
will be 2 resources defined: the one with ``ortho`` data input and the other with
``elev`` data input. Let's start with ``ortho`` data input.

.. note:: You can download the file directly :download:`projects/nc/resources-nc.json`

.. literalinclude:: projects/nc/resources-nc.json
    :lines: 1-27
    :linenos:

``comment``, ``group``, ``id``
    options should be clear. 
``driver``
    is set to ``tms-raster`` value (for tiled-layer)
``credits``
    (or attributions) are not defined (but have to be present)
``referenceFrames``
    the values are output from :ref:`mapproxy-calipers` used previously
``definition``
    points to the directory name, where the data re stored (within ``datasets``
    directory configured in ``mapproxy.conf`` file previously)

Next, we add our ``elev`` data source:

.. literalinclude:: projects/nc/resources-nc.json
    :lines: 28-
    :lineno-start: 28
    :linenos:

``type``
    is ``surface`` here
``referenceFrames``
    are again result from :ref:`mapproxy-calipers` used earlier
``definition``
    is more tricky part. Beside to ``dataset``, there is ``geoidGrid`` file
    reference. It's the grid definition file, which should be applied on the
    spheroid to get better output.

    ``introspection``
        we can define initial viewer position for each :ref:`reference-frame`
        and again, this is the output from :ref:`mapproxy-calipers` earlier. In
        our case, we are assuming the ``melown2015`` reference frame is used.
    ``tms``
        is telling to mapproxy, that the surface layer should be covered by our
        ``ortho`` layer.

Running mapproxy
^^^^^^^^^^^^^^^^

It should be possible to run ``mapproxy --config mapproxy.conf`` and go to
http://localhost:3070::

        $ mapproxy --config mapproxy.conf 
        2017-05-27 20:23:11 I3 [23429(main)]: Loaded configuration from <mapproxy.conf>. {program.cpp:configureImpl():410}
        2017-05-27 20:23:11 I3 [23429(main)]: [mapproxy] Config:
            store.path = "/tmp/melown/store/"
            http.listen = 0.0.0.0:3070
            http.threadCount = 4
            http.client.threadCount = 1
            http.enableBrowser = true
            core.threadCount = 4
            gdal.processCount = 4
            gdal.tmpRoot = "tmp/"
            resource-backend.updatePeriod = 300
            resource-backend.root = "/tmp/melown/datasets/"
            resource-backend.type = conffile
            resource-backend.path = "resources-nc.json"
         {main.cpp:configure():259}
        2017-05-27 20:23:11 I4 [23429(main)]: [mapproxy] Service mapproxy/test starting. {service.cpp:operator()():476}
        2017-05-27 20:23:11 I3 [23429(updater)]: Ready to serve. {generator.cpp:update():745}
    
.. figure:: images/north-carolina.png

    North Carolina dataset displayed as 3D using :ref:`mapproxy`. The map is reachable at
    http://localhost:3070/melown2015/surface/surface/dem/

Final project directory structure::

    projects/nc
        datasets/
            ortho_2001/
            ncterrain/
            ortho_2001_t792_1m.tif
            elevlid_D792_6m-compressed.tif
        mapproxy.conf
        resources.json

.. _North Carolina dataset: https://grassbook.org/datasets/datasets-3rd-edition/
.. _The Open Source GIS\: A GRASS GIS approach: https://grassbook.org/
.. _GDAL Virtual Format: http://www.gdal.org/gdal_vrttut.html
