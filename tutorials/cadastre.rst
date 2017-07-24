.. index::
    pair: HGT; SRTMHGT

.. _cadastre-tutorial:

Displaying cadastre over 3D data
--------------------------------

In this tutorial we combine 3D data of a Czech village Jenštejn that we made available for this purpose with both raster
and vector cadastre provided by `State Administration of Land Surveying and Cadastre (ČÚZK) <http://www.cuzk.cz/en>`_ .

This tutorial expects that you have already set up your VTS backend.

.. todo ref to VTS backend

Setting up mapproxy resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For this step, the most important locations are ``/var/vts/mapproxy/datasets/`` where all inputs for mapproxy are stored and
``/etc/vts/mapproxy/resource.json`` where you will place configuration snippet for each mapproxy resource.

During resource preparation it is advisible to turn off the mapproxy, so that you have time to correct mistakes in your
configuration::
  
  $ sudo /etc/init.d/vts-backend-mapproxy stop

As the whole vts-backend runs under the vts user, it is advisable to switch to the vts user so that all files are created with the right privileges and ownership::

  $ sudo -iu vts


Setting up dynamic surfaces
"""""""""""""""""""""""""""

We need to set up two surfaces - one from `SRTM <http://srtm.csi.cgiar.org/>`_ 1
arc sec :file:`N50E014` tile for context and second from finer DEM of `Jenstejn
surroundings <https://mapy.cz/zakladni?x=14.6194164&y=50.1445893&z=14&source=muni&id=4489&q=jenstejn>`_.

* SRTM can be obtained from `Earth Explorer <https://earthexplorer.usgs.gov/>`_ or from our CDN: http://cdn.melown.com/pub/vts-tutorials/cadastre/N50E014.hgt
* Jenstejn DEM can be downloaded from our CDN: http://cdn.melown.com/pub/vts-tutorials/cadastre/jenstejn-dem.tif

The SRTM must be converted away from `SRTMHGT format
<http://www.gdal.org/frmt_various.html#SRTMHGT>`_  e.g. to `GeoTiff
<http://www.gdal.org/frmt_gtiff.html>`_ prior to processing because `SRTMHGT` format
draws georeferencing information from filename.::
  
  $ gdal_translate -of GTiff N50E014.hgt N50E014.tif

To set up surface resources based on DEM from both SRTM DEM and Jenstejn DEM,
please follow more detailed instructions in :ref:`north-carolina` or
:ref:`mars-peaks-valleys` tutorials. In this
tutorial, it is expected, that you place the data in
``/var/vts/mapproxy/datasets/srtm`` and
``/var/vts/mapproxy/datasets/jenstejn-dem`` directoriers respectively.

.. code-block:: bash

    # create the SRTM DEM dataset
    cd ~/mapproxy/datasets/srtm
    generatevrtwo N50E014.tif /var/vts/mapproxy/datasets/srtm --resampling dem --tiliseSize 1024x1024
    generatevrtwo N50E014.tif /var/vts/mapproxy/datasets/srtm.min --resampling min --tiliseSize 1024x1024
    generatevrtwo N50E014.tif /var/vts/mapproxy/datasets/srtm.max --resampling max --tiliseSize 1024x1024
    cd ~/mapproxy/datasets/
    ln -s srtm/dataset srtm/dem
    ln -s srtm.min/dataset srtm/dem.min
    ln -s srtm.max/dataset srtm/dem.max
    
    # create Jensten dataset
    cd ~/mapproxy/datasets/jenstejn-dem
    generatevrtwo jenstejn-dem.tif /var/vts/mapproxy/datasets/jenstejn-dem --resampling dem --tiliseSize 1024x1024
    generatevrtwo jenstejn-dem.tif /var/vts/mapproxy/datasets/jenstejn-dem.min --resampling min --tiliseSize 1024x1024
    generatevrtwo jenstejn-dem.tif /var/vts/mapproxy/datasets/jenstejn-dem.max --resampling max --tiliseSize 1024x1024
    cd ~/mapproxy/datasets/
    ln -s jenstejn-dem/dataset jenstejn-dem/dem
    ln -s jenstejn-dem.min/dataset jenstejn-dem/dem.min
    ln -s jenstejn-dem.max/dataset jenstejn-dem/dem.max


We now need the configuration snippet for the ``/etc/vts/mapproxy/resource.json`` file.
The ``lodRange`` and ``tileRange`` values are taken from the ``mapproxy-calipers`` tool. Next we need to create tiling metadata based on mapproxy-calipers output.::

    mapproxy-calipers srtm/dem --referenceFrame melown2015
    > ...
    > gsd: 24.6774
    > range<pseudomerc>: 9,15 15/8829,5484:8874,5556
    > range: 9,15 137,85:138,86
    > position: obj,14.500069,50.500069,float,0.000000,0.000000,-90.000000,0.000000,144822.451449,55.000000
    
    mappproxy-tiling --input srtm --lodRange 9,15 --tileRange 137,85:138,86

    mapproxy-calipers jenstejn-dem/dem --referenceFrame melown2015
    > ...
    > gsd: 3.20576
    > range<pseudomerc>: 13,18 18/70840,44352:70871,44380
    > range: 13,18 2213,1386:2214,1386
    > position: obj,14.611388,50.150629,float,0.000000,0.000000,-90.000000,0.000000,7768.350285,55.000000
    
    mappproxy-tiling --input jenstejn-dem --lodRange 13,18 --tileRange 2213,1386:2214,1386

The final configuration snippets placed into
``/etc/vts/mapproxy/resources.json`` should look like (alter the comment, group
and id fields)::

  [{
    "comment": "SRTM 1 arc sec",
    "group": "cadastre",
    "id": "srtm",
    "type": "surface",
    "driver": "surface-dem",
    "credits": [],
    "definition": {
        "dataset": "srtm",
        "geoidGrid": "egm96_15.gtx"
    },
    "referenceFrames": {
        "melown2015": {
            "lodRange": [ 9, 15 ],
            "tileRange": [
                [ 137, 85 ],
                [ 138, 86 ]
            ]
        }
    }
  },
  {
    "comment": "Jenstejn DEM",
    "group": "cadastre",
    "id": "jenstejn-dem",
    "type": "surface",
    "driver": "surface-dem",
    "credits": [],
    "definition": {
        "dataset": "jenstejn-dem",
        "geoidGrid": "egm96_15.gtx"
    },
    "referenceFrames": {
        "melown2015": {
            "tileRange": [
                [ 2213, 1386 ],
                [ 2214, 1386 ]
            ],
            "lodRange": [ 13, 18 ]
        }
    }
  }]

Setting up bound layers
"""""""""""""""""""""""

First we will set up boundlayer with orthophoto based on Czech `Mapy.cz maps
<http://www.mapy.cz>`_ .  Because Mapy.cz work as WMTS ins suitable SRS
(webmercator), the tiles need not to be processed by VTS Mapproxy.  We will
therefore configure this bound layer to be used with the ``tms-raster-remote``
driver, which will basically just tell the client to use tiles from some
particular external service and how to index them. Add following snippet to the
outermost array in ``/etc/vts/mapproxy/resource.json`` ::

  {
    "comment": "Mapy.cz orthophoto",
    "group": "cadastre",
    "id": "mapy-cz-ophoto",
    "type": "tms",
    "driver": "tms-raster-remote",
    "credits": ["seznamcz"],
    "definition": {
        "remoteUrl": "//m{alt(1,2,3,4)}.mapserver.mapy.cz/ophoto-m/{loclod}-{locx}-{locy}"
    },
    "registry": {
        "credits" : {"seznamcz":{ "id": 103, "notice": "{copy}{Y} Seznam.cz, a.s." }}
    },
    "referenceFrames":
        {
            "melown2015": {
                "tileRange": [
                    [ 137, 85 ],
                    [ 138, 86 ]
                ],
                "lodRange": [
                    9,
                    21
                ]
            }
        }
  }

Now we set up transparent bound layer with raster cadastre drawn from WMS at
http://services.cuzk.cz/wms/wms.asp .  In
``/var/vts/mapproxy/datasets/cuzk-raster-cadastre`` create a file
``cadastre.xml`` with the following content::

 <GDAL_WMS>
  <Service name="WMS">
    <Version>1.1.1</Version>
    <ServerUrl>http://services.cuzk.cz/wms/wms.asp?SERVICE=WMS</ServerUrl>
    <Layers>hranice_parcel_i,obrazy_parcel_i,parcelni_cisla_i</Layers>
    <SRS>EPSG:3857</SRS>
    <ImageFormat>image/png</ImageFormat>
    <Transparent>TRUE</Transparent>
    <BBoxOrder>xyXY</BBoxOrder>
  </Service>
  <DataWindow>
    <UpperLeftX>1320000</UpperLeftX>
    <UpperLeftY>6693000</UpperLeftY>
    <LowerRightX>2113000</LowerRightX>
    <LowerRightY>6140000</LowerRightY>
    <SizeX>1073741824</SizeX>
    <SizeY>748775824</SizeY>
  </DataWindow>
  <BandsCount>4</BandsCount>
  <BlockSizeX>1024</BlockSizeX>
  <BlockSizeY>1024</BlockSizeY>
  <OverviewCount>20</OverviewCount>
 </GDAL_WMS>

This is further more discussed in the example :ref:`srtm-example`.

The bound layer will have the same tile range as SRTM DEM because larger is not
needed. Thus the mapproxy configuration snippet will be as following::

  {
    "comment": "CUZK Raster cadastre",
    "group": "cadastre",
    "id": "cuzk-raster-cadastre",
    "type": "tms",
    "driver": "tms-raster",
    "credits": ["cuzk"],
    "definition": {
        "dataset": "cuzk-raster-cadastre/cadastre.xml",
        "format": "png",
        "transparent": true
    },
    "registry": {
        "credits" : {"cuzk":{ "id": 104, "notice": "{copy}{Y} ČÚZK" }}
    },
    "referenceFrames": {
        "melown2015": {
            "lodRange": [ 9, 21 ],
            "tileRange": [
                [ 137, 85 ],
                [ 138, 86 ]
            ]
        }
    }
  }  

Alternatively, ``mapproxy-calipers`` tool can be used again to obtain for the ``lodRange`` and ``tileRange`` values.
 
Setting up vector free layer
""""""""""""""""""""""""""""

We will set up a geodata free layer with parcel borders and parcel numbers. We
will use an MBTiles file as the base resource for mapproxy to demotrate the
possibility of serving tiled geodata.

First we need to download a ZIP file with shapefiles of Jenstejn cadastal area from
ČÚZK website::

  $ wget http://services.cuzk.cz/shp/ku/epsg-5514/658499.zip
  $ unzip 658499.zip
  $ cd 658499

We are interested in parcel borders and parcel numbers. We will create one
MBTiles containing both these layers but first we need to prepare the GeoJSON to
create the MBTiles from. Because original data are in the `Krovak projection
<http://epsg.io/5514>`_ care must be taken when converting coordinates as system
definition of Krovak may come with insufficiently precise ``towgs84`` parameter::

  $ cd 658499
  $ ogr2ogr -f "GeoJson" \
            -s_srs "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=0 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel \
                    +towgs84=570.8,85.7,462.8,4.998,1.587,5.261,3.56 +units=m +no_defs" \
            -t_srs "+init=epsg:4326" \
            -dialect sqlite \
            -sql "SELECT geometry, TEXT_KM FROM PARCELY_KN_DEF" \
            jenstejn-parcel-numbers.geojson PARCELY_KN_DEF.shp

  $ ogr2ogr -f "GeoJson" \
            -s_srs "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=0 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel \
                    +towgs84=570.8,85.7,462.8,4.998,1.587,5.261,3.56 +units=m +no_defs" \
            -t_srs "+init=epsg:4326" \
            -dialect sqlite \
            -sql "SELECT geometry FROM HRANICE_PARCEL_L" \
            jenstejn-parcel-borders.geojson HRANICE_PARCEL_L.shp

Now we will merge geojsons into one containing both linestrings and points using
merge-geojsons.py from https://gist.github.com/migurski/3759608 ::

  $ python merge-geojsons.py jenstejn-parcel-numbers.geojson jenstejn-parcel-borders.geojson jenstejn-parcel-all.geojson

To create MBTiles we will use MapBox's opensource tool `tippecanoe
<https://github.com/mapbox/tippecanoe>`_. To install it, follow the instructions
on github::

  $ git clone https://github.com/mapbox/tippecanoe.git
  $ cd tippecanoe
  $ sudo apt-get install build-essential libsqlite3-dev zlib1g-dev
  $ make -j2
  $ sudo make install

We will place MBTiles into ``/var/vts/mapproxy/datasets/cuzk-raster-cadastre/``
directory. Because simplification makes little sense for cadastre, we will use
tippecanoe just to tile features on a single level of detail without any
simplification::

  $ mkdir /var/vts/mapproxy/datasets/jenstejn-cadastre
  $ tippecanoe -o /var/vts/mapproxy/datasets/jenstejn-cadastre/parcels-all.mbtiles -z 16 -Z 16 -B 16 -ps \
               <path-to-dir-with-vector-data>/658499/jentejn-parcel-all.geojson

And finally we create a configuration snippet for mapproxy::

 {
    "comment": "Data source",
    "group": "cadastre",
    "id": "cuzk-vector-cadastre",
    "type": "geodata",
    "driver": "geodata-vector-tiled",
    "credits": ["cuzk"],
    "definition": {
        "dataset": "cuzk-raster-cadastre/parcels-all.mbtiles/{loclod}-{locx}-{locy}"
        , "demDataset": "jenstejn-dem"
        , "geoidGrid": "egm96_15.gtx"
        , "format": "geodataJson"
        , "displaySize": 1024
    },
    "registry": {
        "credits" : {"cuzk":{ "id": 104, "notice": "{copy}{Y} ČÚZK" }}
    },
    "referenceFrames":
        {
            "melown2015": {
                "tileRange": [
                    [553, 346],
                    [553, 346]
                ],
                "lodRange": [11, 17]
            }
        }
 }

Now you can turn mapproxy back on::
  
  $ sudo /etc/init.d/vts-backend-mapproxy start

And examine the log::

  $ less /var/log/vts/mapproxy.log

You should see no errors, only a ``Ready to serve <resource>`` line for each defined resource.

Styling the vector cadastre
"""""""""""""""""""""""""""

To give the vector free layer the right look, we will create a style for it which we later apply to the layer
in storage view.

Go to ``/var/vts/store/stylesheet/`` and create ``cuzk-cadastre-style.json``
with the following contents::

 {
  "layers": {
    "parcel-labels": {
      "label": true,
      "label-size": 20,
      "label-source": "$TEXT_KM",
      "zbuffer-offset": [-11,-50,-50],
      "visibility": 350,
      "label-no-overlap" : false
    },
    "lines": {
      "line-width": 0.002,
      "line-width-units": "ratio",
      "line-flat": true,
      "line": true,
      "line-color": [255,255,0,255],
      "zbuffer-offset": [-1,0,-50]
    }
  }
 }

That will tell the browser that we want to see parcel borders yellow drawn by
line that looks flat (gets thinner when you tilt). Further, when you come close,
the parcel numbers will show up. Check the `free layers style documentation <https://github.com/Melown/vts-browser-js/wiki/VTS-Geodata-Format#geo-layer-styles-structure>`_
for further details.

Filling the storage
^^^^^^^^^^^^^^^^^^^

To work with static True3D data and/or merge various surfaces together, we must first add them to the storage. 
Storage is administered by tool ```vts``` that takes care of adding tilesets to storage and subsequent generation 
of required glues.

Important location for this step is ``/var/vts/store/stage.melown2015`` (stage
is a traditional name for the main storage). Furthermore, create following
directory to hold the 3D resources::

  $ mkdir -p /var/vts/store/resources/tilesets

Preparing True3D tilesets
"""""""""""""""""""""""""

VTS tileset format is suitable for streaming data over the internet but it is
firmly bound to given Reference Frame.  For True3D data exchange purposes we
specified an open, Reference Frame independent, `VEF format
<https://github.com/Melown/true3d-format-spec>`_ meant for storing hierarchical
georeferenced textured meshes. The VEF format is a preferable entry point for 3D
data into VTS.

To get the True3D data for this tutorial, please download `Jenstejn (the whole
village) <http://cdn.melown.com/pub/vts-tutorials/cadastre/jenstejn-village.vef.tar>`_ and
`Jenstejn (center) <http://cdn.melown.com/pub/vts-tutorials/cadastre/jenstejn.vef.tar>`_ in
VEF fromat to some working directory.

Now we will convert both datasets into VTS tileset::

  $ cd <work dir>
  $ vef2vts --input jenstejn.vef.tar --output /var/vts/store/resources/tilesets/jentejn-center \
            --tilesetId jenstejn-center --referenceFrame melown2015
  $ vef2vts --input jenstejn-village.vef.tar --output /var/vts/store/resources/tilesets/jentejn-village \
            --tilesetId jenstejn-village --referenceFrame melown2015

Adding tilesets into storage
""""""""""""""""""""""""""""

Now we are ready to merge everything in the storage, First we add the bottommost
surface from SRTM DEM as remote tileset::

  $ vts /var/vts/store/stage.melown2015 --add --tileset http://localhost:8070/mapproxy/melown2015/surface/cadastre/srtm --top

Then add the two Jenstejns as local tilesets - this way the data are only
referenced rather than copied into storage which makes the operation faster and
saves some space::

  $ vts /var/vts/store/stage.melown2015 --add --tileset local:/var/vts/store/resources/tilesets/jentejn-village --top
  $ vts /var/vts/store/stage.melown2015 --add --tileset local:/var/vts/store/resources/tilesets/jentejn-center --top

Creating a storage view
"""""""""""""""""""""""

As the final step we need to create a :ref:`storage-view` that
combines tilesets from our storage and free and bound layer from the mapproxy.

Go to ``/var/vts/store/map-config`` and create the file ``cadastre`` with the
following contents. The hashes are meant as commnets and need to be deleted
before saving the file to create a valid JSON.::

  {
        "storage": "../stage.melown2015",  # where is our storage
        "tilesets": [                      # tilesets we pick from the storage, all in our case
                "cadastre-srtm",
                "jenstejn-village",
                "jenstejn-center"
        ],
        "credits": { },                    # no additional credit definitions
        "boundLayers": {                   # where to find definition files for bound layers
                "mapy-cz": "/mapproxy/melown2015/tms/cadastre/mapy-cz-ophoto/boundlayer.json",
                "cadastre-raster": "/mapproxy/melown2015/tms/cadastre/cuzk-raster-cadastre/boundlayer.json"
        },
        "freeLayers": {                    # free layers - vector cadastre and tiles mesh as a base for raster cadastre
                "cadastre-vector": "/mapproxy/melown2015/geodata/cadastre/cuzk-vector-cadastre/freelayer.json",
                "jenstejn-dem" : "/mapproxy/melown2015/surface/cadastre/jenstejn-dem/freelayer.json"
        },
        "view": {                          # what combination will be seen when we open storage view with the browser
                "description": "",
                "surfaces": {
                        "cadastre-srtm": ["mapy-cz"],
                        "jenstejn-village": [],
                        "jenstejn-center": []
                },
                "freeLayers": {            # free layers to display - both, they can be toggled through diagnostic console
                        "cadastre-vector" :  { "style" : "/store/stylesheet/cuzk-cadastre-style.json" },
                        "jenstejn-dem" : { "boundLayers": ["cadastre-raster"],
                                            "depthOffset" : [-5, 0, -10] }
                }
        },
        "namedViews": {},
        "position": [                      # initial position of the map (Jenstejn)
                "obj",14.611103581926853,50.152724855605186,"float",0.00,3.16,-70.91,0.00,226.97,45.00
        ],
        "version": 1
  }

After saving you can test if the storage view is valid by running::

  $ cd /var/vts/store/map-config
  $ vts --map-config cadastre

If everything is all right, a large JSON with client side map configuration will
be printed.

In that case you can open your browser and go to
http://localhost:8070/store/map-config/cadastre to get nice view of Jenstejn. If
you press :kbd:`CTRL + SHIFT + D` and then :kbd:`SHIFT + V`, a console will open
when you can toggle various layers and play with other parameters.
