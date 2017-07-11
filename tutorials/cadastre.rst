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
* GDAL WMTS configuration for `Mapy.cz <http://mapy.cz>`_ bound layer.
* GDAL WMS configuration for raster cadastre - particular layers from WMS available at `<http://services.cuzk.cz/wms/wms.asp>`_
* Vector cadastre of Jenstejn - available at http://services.cuzk.cz/shp/ku/epsg-5514/658499.zip

1. Preparation of static data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


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
  $ tippecanoe -o /var/vts/mapproxy/datasets/jenstejn-cadastre/parcels-all.mbtiles -z 16 -Z 16 -B 16 -ps parcel-all.geojson

Data:

SRTM 1 arc-sec for context - N50E014.hgt available either through EarthExplorer https://earthexplorer.usgs.gov/ or in our data package.
Finer DEM of Jenstejn surroundings - available in our data package
WMTS Mapy.cz bound layer - WMTS configuration available in our data package
WMS Raster cadastre from ČÚZK - available at WMS:http://services.cuzk.cz/wms/wms.asp . Preconfigured combination of layers is available in our data package.
Vector cadastre from ČÚZK - available at http://services.cuzk.cz/shp/ku/epsg-5514/658499.zip or in our data package. In Krovak projection.

