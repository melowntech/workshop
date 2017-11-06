.. _vts-cmdline:

Vts utility
===========

The ``vts`` is a versatile command line utility used to manage the :ref:`storage <storage>` and to do basic troubleshooting.

The ``vts`` supports multiple *commands*. The general call syntax when using ``vts`` looks like::

    vts --path <path to vts entity to work with> --command=<command-name> [command-specific-options]

As ``--path`` is also a first positional argument and ``--command=<command-name>`` can be abbreviated to ``--<command-name>``, the usual shortened call syntax is::

    vts <path to vts entity to work with> --<command-name> [command-specific-options]

For each command, ``--path`` has a different meaning specified in command description.

All known commands are listed in :command:`vts --help` or :command:`vts --help-all`. For command-specific help use :command:`vts --help-<command-name>`.


Storage related commands
------------------------

create
^^^^^^

Creates storage at given path.

``path``
    Path to where the :ref:`storage <storage>` should be created.
``referenceFramce``
    The :ref:`reference frame <reference-frame>` of created storage. All tilesets added to storage will have to be in this reference frame.

add
^^^

Adds tileset to storage. Generates necessary :ref:`glues <glue>` in the process.

``path``
    Path to storage.
``tileset``
    Path/URL of tileset to add. It may be:
    * *relative/absolute path*: tileset will be physically copied into storage.
    * local:*relative/absolute path*: plain tileset will be added through a :ref:`local <tileset>` tileset proxy, removing need to copy the data. Original tileset has to stay available.
    * *URL/scheme-less URL*: for adding surface from mapproxy as a remote tileset.
``tilesetId``
    Id (string) under the tileset will be visible in the storage. Defaults to id stored in tileset.
``above <tilesetId>, below <tilesetId>, top, bottom``
    Mutually exclusive options telling where in :ref:`storage stack <storage>` the tileset will be placed. E.g. ``top`` indicates that the tileset will be displayed over all other tilesets within storage. Usually the more detailed the tileset, the higher in the stack it should be placed.
``bumpVersion``
    Tilesets with the same ``tilesetId`` may be present in the storage with different versions. It is used to indicate that these tilesets are not expected to be displayed together and therefore they are not no glues between them are generated. E.g. multiple snapshots of the same location taken at different times. ``bumpVersion`` finds the highest version of given ``tilesetId`` and adds tileset with version one higher. The tileset is then referred to as *<tilesetId>@<version>*.

remove
^^^^^^

Removes tileset with given tilesetId from storage. All glues that contain this tileset will be removed too.

``path``
    Path to storage.
``tileset``
    TilesetId of tileset to remove.

aggregate
^^^^^^^^^

Create aggregated tileset which acts as a proxy to particular combination of tilesets in storage.
Suitable for creating logical groups of tilesets to be added into higher-level storage. E.g. parts of a city that were created separately can be be handled as the whole continuous city.

``path``
    Path to storage with to-be-aggregated tilesets.
``output``
    Path to resulting aggregated tileset.
``tilesetId``
    TilesetId of resulting tileset.
``tileset``
    (Multiple) tilesetIds of tilesets to aggregate.
``staticMetaLodRange``
    Lod range in which metatiles should be statically pre-generated. Pregenerating top of the metatile tree may speed up delivery if the aggregated tileset contains many tilesets.

relocate
^^^^^^^^

Recursively translates paths/URLs in storage. Useful when moving storage or its parts to different paths, or mapproxy to different URL (e.g. localhost -> some public URL). To use, physically move the files/URL and then run relocate to change paths/URLs in tileset configuration.

``path``
    Path to storage to be relocated.
``rule``
    Rule in form prefix=replacement. Can be use multiple times. First matching rule is applied. Can be omitted to display dependency tree.
``dryRun``
    Just simulate relocation. Strongly recommended before any live run.

Other commands
--------------

info
^^^^

Default ``vts`` command - *info* is assumed when calling :command:`vts <path>`.
Gives information about underlaying entity:
* *tileset*: number of various types of tiles with (with higher verbosity)
* *storage*: structure of the storage
* *storage view*: path to underlaying storage, used tilesets.

``path``
    Path to VTS entity to examine.
``V``
    Verbosity, may be used multiple times.

map-config
^^^^^^^^^^

Returns :ref:`map configuration <map-configuration>` of tileset/storage/storage view at ``path``. Useful for debugging invalid :ref:`storage views <storage-view>`.

``path``
    Path to VTS entity to dump map configuration for.
