.. index::
        single: generatevrtwo
        single: mapconfig
        single: mapproxy
        single: mapproxy-calipers
        single: mapproxy-rf-mask
        single: mapproxy-sub-tiling
        single: mapproxy-tiling
        single: tilar
        single: tmptscp
        single: ts2vts0
        single: vts
        single: vts0
        single: vef2vts
        single: vts2dem
        single: vts2ophoto
        single: vts02vts
        single: vts2vts
        single: vtsd

.. _vts-cmd-tools:

VTS Command line tools
======================

Each program is distributed along with one of the packages :ref:`mapproxy`,
:ref:`vts-tools` or :ref:`vtsd`. They are overlapping often, but it actually
does not matter, from which project the final binary comes, since they are all
compiled from common libraries.

.. _generatevrtwo:

generatevrtwo
-------------
Generate virtual overviews from input DEM raster files. It's used as input to
:ref:`mapproxy`. One of the differences from ``gdalbuildvrt`` is, that you
can specify different ``resampling`` algorithms (needed for VTS-Mapproxy).

Configuration options
^^^^^^^^^^^^^^^^^^^^^
``input``
    Input raster file
``output``
    Output directory name
``resampling``
    Resampling method, one of ``dem``, ``min``, ``max`` and ``texture``
``tileSize``
    Specified as ``PIXELSxPIXELS``, e.g. ``1024x1024``
``minOvrSize``
    Minimum size of generated overview, default: ``256x256``
``overwrite``
    Overwrite existing dataset, 1 or 0 
``wrapx``
    Wrap dataset in X direction. Value indicates number of overlapping pixels.
    Useful in Pacific regions
``background``
  If whole warped tile contains this color it is left empty in the output. Solid
  dataset with this color is created and places as a first source for each band
  in all overviews.
``co`` 
    GTiff extra create option; can be used multiple times.
``nodata``
  Optional nodata value override. Can be NONE (to 
  disable any nodata value) or a (real) number. 
  Input dataset's nodata value is used if not used.


Example usage::

    generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem --resampling dem --tileSize 1024x1024
    generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem.min --resampling min --tileSize 1024x1024
    generatevrtwo ASTGTM2_N50E015_dem.tif ASTGTM2_N50E015_dem.max --resampling max --tileSize 1024x1024


.. _mapconfig:

mapconfig
---------
Map configuration file manipulator.

.. _mapproxy-tool:

mapproxy
--------
The :ref:`mapproxy` server.

.. _mapproxy-calipers:

mapproxy-calipers
-----------------
Calculates bounding box ranges and :ref:`lod` ranges of given dataset for
specified :ref:`reference-frame`. 

.. _mapproxy-dem2dataset:

mapproxy-dem2dataset
--------------------
Python script, which is combining :ref:`generatevrtwo`, :ref:`mapproxy-calipers`
and :ref:`mapproxy-tiling` to generate VTS dataset configuration from input DEM
file.

.. _mapproxy-rf-mask:

mapproxy-rf-mask
----------------
Converts OGR dataset into quadtree-represented mask used by :ref:`mapproxy`.

.. _mapproxy-sub-tiling:

mapproxy-sub-tiling
-------------------
Cuts DEM tiling subtree.

.. _mapproxy-tiling:

mapproxy-tiling
---------------
Analyzes input dataset and generates tiling information.

.. _tilar:

tilar
-----
Tile archive manipulator.

.. _tmptscp:

tmptscp
-------

.. todo:: More information about ``tmptscp``

.. _ts2vts0:

ts2vts0
-------
Tool for converting an existing old tileset dataset to new vts format.

.. _vts:

vts
---
Tile archive manipulator

.. _vts0:

vts0
----

.. todo:: More information about ``vts0``


.. _vef2vts:

vef2vts
-------

.. todo:: More information about ``vef2vts``

.. _vts2dem:

vts2dem
-------

.. todo:: More information about ``vts2dem``

.. _vts2ophoto:

vts2ophoto
----------

.. todo:: More information about ``vts2ophoto``

.. _vts02vts:

vts02vts
--------

.. todo:: More information about ``vts02vts``

.. _vts2vts:

vts2vts
-------

.. todo:: More information about ``vts2vts``

.. _vtsd-cmd:

vtsd
----

:ref:`VTSD` server daemon program.
