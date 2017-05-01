.. index::
   single: reference frame
   single: tileset

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

.. _tileset:

Tileset
-------
A tiled surface (set of meshes with metadata)
meshes are textured: usually, but not necessarily
coresponding to a given reference frame
possibly taking advantage of external texture layers
containing credits (copyrights, attributions)
Storage
an array of tilesets
sharing the same reference frame
contains glue: a derived array of tilesets containing tiles originating from different tilesets
Storage view
is basically a masqueraded storage (as a different storage)
combines multiple tilesets into a single virtual tileset
storage view needs physical, local access to storage


