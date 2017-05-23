.. index::
   single: bound layer
   single: reference frame
   single: tileset
   pair: level of detail; lod
   single: glue
   single: credits
   single: storge
   single: storge view
   pair: srs; spatial reference system
   single: mask
   single: texture
   single: mesh
   single: attribution

************
Introduction
************

Melown 3D technology stack uses server-client architecture. There are two server
applications :ref:`mapproxy` and :ref:`vtsd` and there are more client
applications too, namely the :ref:`vts-browser-js` and :ref:`vts-browser-cpp`
for now, but we do plan to add more in the future.

As already said, there are two server-side applications, :ref:`mapproxy` and
:ref:`vtsd`. The :ref:`mapproxy` is responsible for serving 3D data and bound
layers to client apps, while :ref:`vtsd` is responsible for creating the 3D data
meshes and *glueing* them together on edges.  

The javascript-based :ref:`vts-browser-js` client is then consuming data from
Mapproxy and visualizing them using WebGL in the window of web browser. It also
provides API, to help users create their own applications.

==============================
Getting data for this tutorial
==============================
This documentation/tutorial comes with basic VTS-Mapproxy configuration set,
which can be downloaded from `our GitHub
<https://github.com/melown/mapproxy-project/>`_.

===========
Basic terms
===========

There are two ways to onlook on Melown VTS: either from the client side
(interpreting existing data), or from the server side (composing or creating
data). We call the first perspective *analysis* and the second perspective
*synthesis*. In this part, we are focusing on *analysis*, since we are will be
describing, how the backe-end part works.

Typical analytical concepts in VTS are that of configuration, surface and
layers. 

.. _bound-layer:

Bound layer
-----------
Bound layer tiles always correspond (in :ref:`LOD` and index) to the active :ref:`surface`.
They do not need :ref:`metatile`\s, they share metatile information with the active surface.
Currently, a single type exist: ``raster``. ``Raster`` bound layers are external textures for surfaces
they may be directly used at tile level or they can be employed by map configuration or even interactively by user.

.. _credit:

Credits
-------
Each data source can have credits, or *attributions* defined. See
:ref:`credits-configuration` for more details.

.. _geogrid:

Geogrid
-------
Usually raster representation of height differences between used ellipsoid and
real Earth surface `Geoid <https://en.wikipedia.org/wiki/Geoid>`_ heights.

.. figure:: images/geoid-grid.png

.. _glue:

Glue
----

A glue is synthetised :ref:`tileset` from two or more original tilesets, to minimize
data transfare and rendering time of final representation. Glues are
pre-rendered on the server, so that client does not have to do the work multiple
times.

.. figure:: images/glue1.png
    :scale: 25%

    Green and white tiles are representing *glue* tiles between two tilesets,
    with representing different surfaces. Gray tiles "in the center" and gray
    tiles "on the permiter" are taken from original tilesets during final
    rendering.

.. figure:: images/glue-mesh.png
    :scale: 25%

    Final "glue mesh", used for one :ref:`lod` to represent tiles, which are
    both covered by two tilesets.

.. _lod:

Level od detail (LOD)
---------------------

Level of detail. In traditional GIS this might be similar to zoom scale. It can
be displayed as the "pyramid" in the upper picture.

.. _mask:

Mask
----
Mask is special file, which can be used as standard binary mask, which "masks
out" pixels out of region of interest.

.. figure:: images/GUID-51C6597B-FC21-4C25-B133-F01B589405E8-web.gif

    Raster mask, source: http://pro.arcgis.com/en/pro-app/tool-reference/environment-settings/mask.htm

.. _metatile:

Meta tile
---------
Tile, holding *meta informations* needed to construct 3D model from input
:ref:`mesh` and :ref:`texture` tiles.

.. _mesh:

Polygon mesh
------------
`Polygon mesh <https://en.wikipedia.org/wiki/Polygon_mesh>`_ is collection of
vertices, edges and faces that defines the shape of a polyhedral object in 3D
computer graphics and solid modeling. The faces usually consist of triangles
(triangle mesh), quadrilaterals, or other simple convex polygons, since this
simplifies rendering, but may also be composed of more general concave polygons,
or polygons with holes.

In VTS, meshes are used to construct final 3D surface, covered with
:ref:`texture`\s.

.. figure:: images/mesh-flatshade.png
    :scale: 50%
    
    Flatshaded mesh, rendered as surface

.. figure:: images/mesh-wireframe.png
    :scale: 50%

    Image mesh filled with :ref:`texture`\s

.. _reference-frame:

Reference Frame
---------------
Definition of a fixed `spatial reference
<https://en.wikipedia.org/wiki/Spatial_reference_system>`_ for all data within a
map defines how the space is split in a tile hierarchy provides geometrical
surface used for navigation within a map defines a spatial reference used for
the maps public (user facing) interface.

.. figure:: images/poster-coordinates.gif
    :scale: 50%
    
    Source: `Maptiler <http://www.maptiler.org/img/poster-coordinates.gif>`_

.. _texture:

Texture
-------
`Texture map <https://en.wikipedia.org/wiki/Texture_mapping>`_ is a method for
defining high frequency detail, surface texture, or color information on a
computer-generated graphic or 3D model. In VTS, earch surface tile contains also
ference to metainformation-tile, which further contains reference to textures
applied to the :ref:`mesh`. Textures are stored as simple JPEG images.

.. figure:: images/internal-texture.jpg
    :scale: 50%

    Image containing mesh textures

.. _tileset:

Tileset
-------
A tiled surface (set of meshes with metadata)
meshes are textured: usually, but not necessarily
coresponding to a given reference frame
possibly taking advantage of external texture layers
containing :ref:`credit`\s (copyrights, attributions)

.. _resource:

Resource
--------

Data sources defined in ``JSON`` encoded file, used in :ref:`mapproxy`. The data
sources can be DEMs or :ref:`bound-layer`\s with map.

.. _srs:

Spatial reference system
------------------------
`Spatial reference system
<https://en.wikipedia.org/wiki/Spatial_reference_system>`_ (SRS) is a
coordinate-based local, regional or global system used to locate geographical
entities. A spatial reference system defines a specific map projection, as well
as transformations between different spatial reference systems. In GIS, usually
use `EPSG <https://www.epsg-registry.org/>`_ datase, however, EPSG codes are
not used in VTS* tools. SRS is stored in internal :ref:`registry` database.

.. _storage:

Storage
-------
Storage is a stack of :ref:`tileset` sharing the same :ref:`reference-frame`.
Surface display priority is defined by tileset stacking order (first in, last
out). It also contains :ref:`glue`\ s between it's constituent tilesets.
contains :ref:`glue`\ s. It's basicaly a database of all your tilesets.

.. _storage-view:

Storage view
-------------
Storage view is subset of :ref:`storage`, with selected :ref:`tileset`\ s, so
that you are not going to render all your data in final application.

