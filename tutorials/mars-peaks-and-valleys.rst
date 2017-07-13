The Peaks and Valleys of Mars
-----------------------------

If you have encountered 3D interactive Mars websites such as `Mars in Google Earth <https://www.google.com/maps/space/mars>`_ or `NASA Mars Trek <https://marstrek.jpl.nasa.gov/index.html>`_ you probably stood in awe at how much work went into them. 

Yet with the help Melown Tech's VTS 3D map streaming and rendering stack and using only publicly available data sources, you can run a similar website in a couple of hours. And if you put some extra thought and work into it, your site might even be superior to its aforementioned respectable counterparts in some respects! This tutorial will walk you through the process.

Prerequisites
"""""""""""""

As a prerequisite, you need to have your VTS backend environment set up. You can :doc:`follow our earlier tutorial <vtsbackend>` to do so.

You also need at least 20GiBs of free disk space 

Make sure you use the ``vts`` system user for data manipulation commands in the rest of this tutorial::

    $ sudo -iu vts


As a good practice, create a resource directory and dataset subdirectory to configure and store our Mars-related resources

::
   $ sudo -iu vts
   $ mkdir /etc/vts/mapproxy/mars-case-study.d
   $ mkdir ~/mapproxy/datasets/mars-case-study

and extend your mapproxy resource configuration to include these resources:

::

    [
        { "include": "examples.d/*.json" }
        ,{ "include": "mars-case-study.d/*.json" }
    ]




The Global Mosaic
"""""""""""""""""
For a global model of any celestial body, you need a global mosaic. We choose the 232m/px `Mars Viking MDIM21 Color Mosaic <https://astrogeology.usgs.gov/search/map/Mars/Viking/MDIM21/Mars_Viking_MDIM21_ClrMosaic_global_232m>`_ available from USGS Astrogeology Science Center. Download it as follows::

    $ cd ~/mapproxy/datasets/mars-case-study
    $ wget https://planetarymaps.usgs.gov/mosaic/Mars_Viking_MDIM21_ClrMosaic_global_232m.tif

The file is uncompressed and takes almost 12GiBs. You might want to replace it with a deflated version (this will likely take quite some time)::

    $ gdal_translate  -co COMPRESS=DEFLATE -co PREDICTOR=2 -co ZLEVEL=9 -co NUM_THREADS=ALL_CPUS  Mars_Viking_MDIM21_ClrMosaic_global_232m.tif Mars_Viking_MDIM21_ClrMosaic_global_232m-deflate.tif
    $ mv Mars_Viking_MDIM21_ClrMosaic_global_232m-deflate.tif Mars_Viking_MDIM21_ClrMosaic_global_232m.tif

Alas, there are no overviews in these datasets. For large files, overviews are needed for VTS backend to handle them efficently. Use ``generatevrtwo`` utility to create a tiled virtual dataset with overviews. Depending on your CPU resources, overview generation may take some time::

   $ generatevrtwo --input Mars_Viking_MDIM21_ClrMosaic_global_232m.tif --output Mars_Viking_MDIM21_ClrMosaic_global_232m.average --resampling average --wrapx 1 --co PREDICTOR=2 --co ZLEVEL=9 --tileSize 4096x4096

The ``--wrapx`` parameter above indicates the number of overlapping pixels on the sides of the mosaic. You might want to use ``gdalinfo`` utility to check out that the first and last columns in this mosaic are indeed identical.    

The virtual dataset created is in fact in ``<generatewrtwo-output-dir>/dataset``. Creating a symbolic link to access it is practical::

   $ ln -s Mars_Viking_MDIM21_ClrMosaic_global_232m.average/dataset mars-viking-mdim21 
 
Take some measurements from the dataset using the ``mapproxy-calipers`` utility::

    $ mapproxy-calipers mars-viking-mdim21 --referenceFrame mars-qsc
    2017-07-13 14:57:43 I3 [17237(main)]: [mapproxy-calipers] Config:
	dataset = "/var/vts/mapproxy/datasets/mars-case-study/mars-viking-mdim21"
	referenceFrame = mars-qsc
    ... some low level errors you may safely ignore ...
    range<qsc-right-dmars2000>: 2,9 9/256,128:383,255
    range<qsc-back-dmars2000>: 2,9 9/384,128:511,255
    range<qsc-left-dmars2000>: 2,9 9/0,128:127,255
    range<qsc-front-dmars2000>: 2,9 9/128,128:255,255
    range<qsc-top-dmars2000>: 2,9 9/128,0:255,127
    range<qsc-bottom-dmars2000>: 2,9 9/128,256:255,383
    range: 2,9 0,0:3,2
    position: obj,0.007055,0.000000,float,0.000000,0.000000,-90.000000,0.000000,6792334.739508,55.000000

The important part of the information above is the tile and lod range, on the second line from bottom. You will use it in the next step. 

And finally, configure the mapproxy resource. Create a resource configuration file at ``/etc/vts/mapproxy/mars-case-study.d/mars-viking-mdim21.json`` with the following contents::

    [{
        "group" : "mars-case-study",
        "id" : "mars-viking-mdim21",
        "comment" : "Mars Viking MDIM21 Mosaic",
        "type" : "tms",
        "driver" : "tms-raster",
        "definition" :  {
            "dataset" : "mars-case-study/mars-viking-mdim21",
            "format" : "jpg",
            "transparent" : false
        },
        "referenceFrames" : {
            "mars-qsc" : {
                "lodRange" : [ 2, 9 ],
                "tileRange" : [
                    [ 0, 0 ],
                    [ 3, 2 ]
                ]
            }
        },
        "registry" : {
            "credits" : {
                "nasa-ames" : {
                    "id" : 201,
                     "notice" : "NASA Ames"
                }
            }
        },
        "credits" : [ "nasa-ames" ]
    }]


This resource configuration file creates a VTS mapproxy tiled map service resource based on the dataset provided. Among other things, it tells VTS mapproxy that the resource shall be known under "mars-case-study-mars-viking-mdim21" group/id combination and it uses the tile hierarchy defined by ``mars-qsc`` reference frame. The ``lodRange`` and ``tileRange`` are merely a transformation of the following line you've seen in the output of mapproxy-calipres above::

  range: 2,9 0,0:3,2

VTS Mapproxy will process this configuration automatically within five minutes. If you do not feel like waiting run

::
echo update-resources | socat -T2 - UNIX-CONNECT:/var/run/vts-backend-mapproxy.ctrl

A browsable, multi-resolution tiled color mosaic of Mars should be now available on your system. Point your browser to the following URL to play with it
::

 http://<yourserver>:8070/mapproxy/mars-qsc/tms/mars-case-study/mars-viking-mdim21/ 

You should something like this:

.. image:: mars-peaks-and-valleys-colormosaic.jpg

The `mars-qsc` reference frame represents Mars as a folded-out cube. Zoom and pan to see some of the details of your new VTS resource.

The Terrain
"""""""""""

For a global model of any celestial body, you need a global DEM modal. We choose the `463m/px Mars MGS MOLA Elevation Model <https://astrogeology.usgs.gov/search/map/Mars/GlobalSurveyor/MOLA/Mars_MGS_MOLA_DEM_mosaic_global_463m>`_, available from USGS Astrogeology Science Center. Download it as follows::

$ wget http://astropedia.astrogeology.usgs.gov/download/Mars/GlobalSurveyor/MOLA/ancillary/mola128_mola64_merge_90Nto90S_SimpCyl_clon0_LZW.tif    




The Nomenclature
""""""""""""""""

That's it! You now have a browseable, interactive 3D map of Mars, complete with labels. In some of our next tutorials, we're going to take a look at how to complement this map with even more visual detail and compelling features. 
 
