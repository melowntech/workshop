.. index::
   single: reference frame
   single: tileset
   single: glue
   single: storge

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

.. _reference-frame:

Reference Frame
---------------
Definition of a fixed `spatial reference
<https://en.wikipedia.org/wiki/Spatial_reference_system>`_ for all data within a
map defines how the space is split in a tile hierarchy provides geometrical
surface used for navigation within a map defines a spatial reference used for
the maps public (user facing) interface.

.. _lod:

Level od detail (LOD)
---------------------

Level of detail. In traditional GIS this might be similar to zoom scale.

.. _tileset:

Tileset
-------
A tiled surface (set of meshes with metadata)
meshes are textured: usually, but not necessarily
coresponding to a given reference frame
possibly taking advantage of external texture layers
containing credits (copyrights, attributions)

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


Storage
-------
Storage is a stack of :ref:`tileset` sharing the same :ref:`reference-frame`.
Surface display priority is defined by tileset stacking order (first in, last
out). It also contains :ref:`glue`\ s between it's constituent tilesets.
contains :ref:`glue`\ s. It's basicaly a database of all your tilesets.

Storage view
-------------
Storage view is subset of :ref:`storage`, with selected :ref:`tileset`\ s, so
that you are not going to render all your data in final application.
