
.. _architecture-overivew:

*********************
Architecture Overview
*********************

VTS 3D Stack uses client-server architecture. The backend consists of two
webservers :ref:`mapproxy` and :ref:`vtsd` and a commandline tool suite. The
frontend consist of WebGL based :ref:`vts-browser-js` with JavaScript API and
:ref:`vts-browser-cpp` with C++ API. The main point of contact between backend
and frontend is a :ref:`map-configuration` represented by ``mapConfig.json``
file which is the first file the client asks for and which contains complete
configuration needed to render given map.

Typical production setup of the whole stack can be seen in the following schema.

.. _vts-architecture-schema:

.. figure:: images/VTS-architecture-final.png
    :width: 800px

    VTS 3D Stack architecture

Backend Components
==================

The :ref:`mapproxy` dynamically converts local or remote resources like DSMs,
orthopthotos and features into :ref:`tileset`\s, :ref:`bound-layer`\s and
:ref:`free-layer`\s that are directly usable by clients. It can be configured to
provide a ``mapConfig.json`` for some resources, thus serving as a
stand-alone backend for simple setups which is leveraged in few tutorials.

The :ref:`vtsd` is an nginx-like thin webserver capable of serving static VTS
resources. These are usually 3D models and corresponding :ref:`glue`\s from
storage. It also provides a map configurations for :ref:`storage`\s, :ref:`tileset`\s
and :ref:`storage-view`\s. Generally, if you intend to work with 3D models or you
want to create some complex map configurations, you will always need the VTSD
and a storage.

The command line tools come technically from two sources.
The :ref:`vts-tools` are responsible for converting 3D models into tilesets and
for managing the storage - adding tilesets into it, fusing them with tilesets
already present there or removing tilesets from storage.
The :ref:`vts-mapproxy-tools` perform raster data preprocessing for
:ref:`mapproxy` like dataset measurements, overview creation and generation of
metadata for tiling.

Frontend Components
===================

Both JavaScript and C++ clients consume the same data from backend, provide
sample browser and API allowing them to be plugged into existing
(web)applications or build applications on top of them.

