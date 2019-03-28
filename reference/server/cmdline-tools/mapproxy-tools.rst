.. index::
        single: generatevrtwo
        single: mapproxy-calipers
        single: mapproxy-tiling

.. _mapproxy-tools:

Mapproxy tools
==============

VTS Mapproxy generates the requested data on the fly but to do it fast it needs the input data to be suitably preprocessed - e.g. raster data should have overviews, there has to be a way to quickly tell if there are some data for given place at all (tiling metainformation) etc..  

.. _generatevrtwo:

generatevrtwo
-------------

Aka generate VRT With Overviews does the similar job to ``gdaladdo`` but is designed to efficiently handle large VRT datasets (worldwide DEMs, orthomosaics etc.). It is perfectly usable even for small
rasters but you can use ``gdaladdo`` there or use them straight away in case they already have appropriate overviews.

.. note::
    For DEMs and DSMs three sets of overviews with different resampling algorithm are required so even simple DEM with overviews will require additional preprocessing.

Options
^^^^^^^
``input``
    Path to input raster file.
``output``
    Output directory name.
``resampling``
    Resampling method, one of ``dem``, ``min``, ``max`` and ``texture``. ``texture`` is resampling suitable for textures (average for scales smaller than 0.5, cubic otherwise) and ``dem`` is suitable for terrain (average for scales smaller than 0.5, cubicspline otherwise)
``tileSize``
    Specified as ``PIXELSxPIXELS``, e.g. ``1024x1024``. Although the result of overview generation is an opaque VRT, each overview layer is physically split into tiles of specified size. This allows for work parallelization, shear ability to store the result in case of detailed world-wide datasets and for subtle optimizations like discarding all-sea tiles.
``minOvrSize``
    Minimum size of generated overview in pixels, default: ``256x256``.
``overwrite``
    If set, existing dataset will be overwritten
``wrapx``
    Wrap dataset in X direction. Necessary for world-wide datasets to obtain seamless results around +-180 latitude. Value indicates number of overlapping pixels (can be 0).
``background``
    If whole warped tile contains this color it is left empty in the output. Solid dataset with this color is created and places as a first source for each band in all overviews, acting as a fallback for this empty space. Suitable for datasets with large water bodies.
``co`` 
    GTiff extra create option; can be used multiple times. The default is DEFLATE compression.
``nodata``
    Optional nodata value override. Can be NONE (to disable any nodata value) or a (real) number. Input dataset's nodata value is used if not used.


Example usage::

    generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem --resampling dem --tileSize 1024x1024
    generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem.min --resampling min --tileSize 1024x1024
    generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem.max --resampling max --tileSize 1024x1024

This generates set of three rasters with overviews needed to use DEM in mapproxy. Min and max overviews are used to quickly determine height-range for each tile.

.. _mapproxy-calipers:

mapproxy-calipers
-----------------

Calculates recommended tile ranges and :ref:`LOD <lod>` ranges of given raster dataset for specified :ref:`reference frame <reference-frame>`. It furthermore provides VTS :ref:`position <position>` from which the dataset can be seen. These values are required in mapproxy `resource definition <https://github.com/melowntech/vts-mapproxy/blob/master/docs/resources.md>`__. 

The last two lines of output in case of successful run look like::

    range: minLod,maxLod xmin,ymin:xmax,ymax
    position: VTS-position-string

Options
^^^^^^^

``dataset``
    Path to analyzed dataset.
``referenceFrame``
    In which :ref:`reference frame <reference-frame>` should the resulting measurements be.
``datasetType``
    ``mapproxy-calipers`` will try guess if input raster is an imagery or terrain using number of channels and channel type. If it fails. It requires this hint to be set either to ``dem`` or ``ortho``.


.. _mapproxy-tiling:

mapproxy-tiling
---------------

Mapproxy tiling is the last step in raster preprocessing. It analyzes raster(s) with overviews and creates tiling metainformation telling which tiles are empty, partial or full (aka *watertight*). This information is needed (usually through :ref:`metatiles <metatile>`) in various parts of VTS.

The tiling operation can be time consuming, especially for datasets with long data-nodata border in combination with high max LOD.

Options
^^^^^^^

``input``
    Path to directory with preprocessed raster. The directory must contain ``opthoto`` symlink to orthomosaic with overviews or ``dem``, ``dem.min`` and ``dem.max`` symlinks to appropriate DEMs/DSMs with overviews. If no ``output`` parameter is set, the resulting tileindex file will be placed into the same directory. The directory may contain anything else, e.g. the resulting directories of ``generatevrtwo``.
``referenceFrame``
    :ref:`Reference frame <reference-frame>` in which the tiling should take place.
``lodRange``
    Range of :ref:`LODs <lod>` in which the tiling should take place. Usually, result of ``mapproxy-calipers`` is used.
``tileRange``
    Tile range in "xmin,ymin:xmax,ymax" format in which the tiling should take place. Usually, result of ``mapproxy-calipers`` is used.

When defining resource for mapproxy, the same or smaller LOD and tile ranges may be used.
