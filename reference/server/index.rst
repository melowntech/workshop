###########
VTS Backend
###########

Melown server and data tools consists of several components:

:ref:`registry`
    MapProxy is  HTTP server that converts non-VTS resources (raster or vector)
    to VTS resources (*surface, boundlayer, freelayer*) on the fly.

:ref:`Mapproxy`
    MapProxy is  HTTP server that converts non-VTS resources (raster or vector)
    to VTS resources (*surface, boundlayer, freelayer*) on the fly.

:ref:`vtsd`
    VTSD (VTS-Deamon) is HTTP server for surface and map configuration delivery.
    It's designed to server VTS resources (surface, boundlayer and freelayer)
    only.

:ref:`vts-tools`
    :command:`vts` tool is creatd to manipulate vts tilesets, storages and
    storageviews.

.. toctree::
    :hidden:

    registry/index
    mapproxy/index
    vtsd
    tools
    cmd-tools
    docker
