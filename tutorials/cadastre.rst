.. _cadastre-tutorial:

Displaying cadastre over 3D data
--------------------------------

In this tutorial we shall combine 3D data from Bohemian village Jenstejn that we made available for this purpose with both raster
and vector cadastre provided by `State Administration of Land Surveying and Cadastre (ČÚZK) <http://www.cuzk.cz/en>`_ .

This tutorial expects that you have already set up your VTS backend. 

First download the pack with sample data from ... It contains:

* One tile of SRTM 1 arc second DEM for context - alternatively available from `Earth Explorer <https://earthexplorer.usgs.gov/>`_
* Finer DEM of Jenstejn surroundings for free layer heightcoding
* Whole Jenstejn village at 3cm/px in `VEF format <https://github.com/Melown/true3d-format-spec>`_
* Center of Jenstejn at 2.5cm/px in `VEF format <https://github.com/Melown/true3d-format-spec>`_
* GDAL WMTS configuration for `Mapy.cz <http://mapy.cz>`_ orthophoto bound layer.
* GDAL WMS configuration for raster cadastre - particular layers from WMS available at `<http://services.cuzk.cz/wms/wms.asp>`_
* Vector cadastre of Jenstejn - available at http://services.cuzk.cz/shp/ku/epsg-5514/658499.zip

Setting up mapproxy resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For this step, the most important locations are ``/var/vts/mapproxy/datasets/`` where all inputs for mapproxy are stored and
``/etc/vts/mapproxy/resource.json`` where you will place configuration snippet for each mapproxy resource.

During resource preparation it is advisible to turn off the mapproxy, so that you have time to correct mistakes in your
configuration::
  
  $ sudo /etc/init.d/vts-backend-mapproxy stop

As whole vts-backend runs under the vts user, it is advisible to switch to vts user so that all files are created with the 
right privileges and ownership::

  $ sudo -iu vts


Setting up dynamic surfaces
"""""""""""""""""""""""""""

We need to set up two surfaces - one from srtm 1 arc sec N50E014 tile for context and second from finer DEM of 
Jenstejn surroundings.

* SRTM can be obtained from `Earth Explorer <https://earthexplorer.usgs.gov/>`_ or from `our CDN <http://cdn.melown.com/public/cadastre/N50E014.hgt>`_ for convenience.
* Jenstejn DEM can be downloaded from `our CDN <http://cdn.melown.com/public/cadastre/jenstejn-dem.tif>`_

The SRTM must be converted away from hgt (e.g. to GeoTiff) prior to processing because hgt format draws georeferencing information from filename.::
  
  $ gdal_translate -of GTiff N50E014.hgt N50E014.tif

To set up surface resources based on DEM from both SRTM DEM and Jenstejn DEM, please follow instructions in 
`North carolina tutorial _north-carolina`_ . The data files should be placed in ``/var/vts/mapproxy/datasets/srtm`` and
``/var/vts/mapproxy/datasets/jenstejn-dem`` respectively.

Configuration snippets placed into ``/etc/vts/mapproxy/resource.json`` should look like (alter the comment, group and id fields)::

  [{
    "comment": "SRTM 1 arc sec",
    "group": "cadastre",
    "id": "srtm",
    "type": "surface",
    "driver": "surface-dem",
    "credits": [],
    "definition": {
        "dataset": "srtm"
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
        "dataset": "jenstejn-dem"
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

First we will set up boundlayer with orthophoto based on Czech `Mapy.cz maps <http://www.mapy.cz>`_ .
Because Mapy.cz work as WMTS ins suitable SRS (webemercator), the tiles need not to be processed by mapproxy.
We will therefore configure this bound layer to use ``tms-raster-remote`` driver, which will basically just 
tell the client to use tiles from some particular external URL and how to index them. Add following snippet
to the outermost array in ``/etc/vts/mapproxy/resource.json`` ::

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

Now we set up transparent bound layer with raster cadastre drawn from WMS at http://services.cuzk.cz/wms/wms.asp .
In ``/var/vts/mapproxy/datasets/cuzk-raster-cadastre`` create a file ``cadastre.xml`` with the 
following content::

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

The bound layer will have the same tile range as SRTM DEM because larger is not needed. Thus the mapproxy configuration
snippet will be as following::

  {
    "comment": "CUZK Raster cadastre",
    "group": "cadastre",
    "id": "raster-cadastre",
    "type": "tms",
    "driver": "tms-raster",
    "credits": ["cuzk"],
    "definition": {
        "dataset": "cuzk-raster-cadastre/cadastre.xml"
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
 
Tippecanoe:

Install - follow instructions from github:

  $ git clone https://github.com/mapbox/tippecanoe.git
  $ cd tippecanoe
  $ sudo apt-get install build-essential libsqlite3-dev zlib1g-dev
  $ make -j2
  $ sudo make install

Converting vector cadastre to MBTiles

As whole vts-backend runs under the vts user, it is advisible to switch to vts user before manipulating any data:

  $ sudo -iu vts

We are interested in parcel borders and parcel numbers. We will create one MBTiles containing both these layers but first we need to prepare the GeoJson
to create the MBTiles from. Because original data are in Krovak projection care must be taken when converting coordinates as system definition of Krovak
may come with too imprecise towgs84 parameter:

  $ unzip jenstejn-vector-cadastre-658499.zip
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

Now we will merge geojsons into one containing both linestrings and points using merge-geojsons.py from https://gist.github.com/migurski/3759608 :

  $ ./merge-geojson jenstejn-parcel-numbers.geojson jenstejn-parcel-borders.geojson jenstejn-parcel-all.geojson

Because simplification makes little sense for cadastre, we will use tippecanoe just to tile features on a single level of detail without any simplification:

  $ mkdir /var/vts/mapproxy/datasets/jenstejn-cadastre
  $ tippecanoe -o /var/vts/mapproxy/datasets/jenstejn-cadastre/parcels-all.mbtiles -z 16 -Z 16 -B 16 -ps jentejn-parcel-all.geojson

Data:

SRTM 1 arc-sec for context - N50E014.hgt available either through EarthExplorer https://earthexplorer.usgs.gov/ or in our data package.
Finer DEM of Jenstejn surroundings - available in our data package
WMTS Mapy.cz bound layer - WMTS configuration available in our data package
WMS Raster cadastre from ČÚZK - available at WMS:http://services.cuzk.cz/wms/wms.asp . Preconfigured combination of layers is available in our data package.
Vector cadastre from ČÚZK - available at http://services.cuzk.cz/shp/ku/epsg-5514/658499.zip or in our data package. In Krovak projection.

