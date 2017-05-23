.. index::
    single: bound layer
    single: credits
    single: SRS

.. _registry-configuration:

Registry configuration
----------------------

Registers are configured using JSON formatted text files. You can add or
customize the registry any time in your configuration files

.. _bound-layer-configuration:

Bound layers configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^
:ref:`bound-layer`\s are defined in :file:`boundlayers.json` (see `source`_)
is dictionary, where each layer is identified by key and following options:

``id`` (number)
    Layer id

``type`` (string)
    Layer type, one of ``[raster]``
    .. todo:: Are there more bound layer types?

``url`` (string)
    Reference to TMS server::

        http://ecn.t{ms_digit(locx,locy)}.tiles.virtualearth.net/tiles/a{quad(loclod,locx,locy)}.jpeg?g=441&mkt=en-us&n=z

``lodRange`` (Array(number))
    Upper and lower :ref:`lod` limit::
    
        lodRange:  [0, 21]

``tileRange`` (Array(Array(number)))
    Layer bounding box defined by tile numbers (of the first ``lodRange`` LOD)::

        tileRange: [[0, 0], [0, 0]]

``credits`` (Array(string))
    Reference to :ref:`credits-configuration`::

        credits: [ "seznamcz" ]

Example::
    
    {
            "heresat": {
                "id" : 100,
                "type" : "raster",
                "url" : "https://1.aerial.maps.cit.api.here.com/maptile/maptile/newest/satellite.day/{lod}/{x}/{y}/256/png8?app_id={here_app_id}&app_code={here_app_code}",
                "lodRange" : [0,18],
                "tileRange" : [[0,0],[0,0]],
                "credits" : [ "here" ]
            },
            ...
    }


.. _credits-configuration:

Credits configuration
^^^^^^^^^^^^^^^^^^^^^

:ref:`credit`\s are defined in :file:`credits.json` (see `source`_)
is dictionary, where each layer is identified by key and following options:

``id`` (number)
    Identification
``notice`` (string)
    What you want to appear on the map. Several placeholders can be defind (see
    lower) using ``{PLACEHOLDER}`` syntax.
``url`` (string, optional)
    Optional URL

**Placeholders**:

``{copy}``
    Will add copyright sign
``{Y}``
    Will add current year

.. _srs-configuration:

SRS configuration
^^^^^^^^^^^^^^^^^

:ref:`srs`\s are defined in :file:`srs.json` (see `source`_)
is dictionary, where each layer is identified by key and following options:

``comment`` (string)
    Description string
``srsDef`` (string)
    `Proj4 SRS definition <http://proj4.org>`_, e.g. you can use `epsg.io <http://epsg.io>`_
    service to get it done.::

        "srsDef": "+proj=qsc +units=m +datum=WGS84 +lat_0=90 +lon_0=0 +wktext",
        
``type`` (string)
    One of ``[cartesian, geographic, projected]``

*Optional parameters*:

``srsModifiers`` (Array(string))
    Modification options:

    * ``adjustVertical``

``periodicity`` (Object)
    Defined by ``type`` and ``period``::

        "periodicity" : { "type" : "X", "period": 40075016.685578 }

``geoidGrid`` (Object)
    `Geoid grid
    <https://en.wikipedia.org/wiki/Geoid#/media/File:Geoid_height_red_blue_averagebw.png>`_ can be attached
    as JPEG encoded file with ``extents, valueRange`` and ``srsDefEllps``
    definition::

        "geoidGrid": {
            "extents": {"ll": [-2009979, 3000861], "ur": [2999421, 8260731]},
            "valueRange": [-17.6, 67.3],
            "definition": "geoidgrid/utm33n-va-geoidgrid.jpg",
            "srsDefEllps" : "+proj=utm +zone=33 +datum=WGS84 +no_defs"
        }

.. _reference-frame-configuration:

Reference frame configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
:ref:`reference-frame` is defined by SRSs, LODs, extentds and other parameters.
Reference ranges are stored as *Array* (not dictionary, compared to previously
described data structures).
Basic reference frames are defined in :file:`referenceframes.json` (see `source`_)

``version`` (number)
    .. todo:: what does version mean
``id`` (string)
    Unique identifier
``description`` (string)
    Longer descriptive text
``model`` (Model)
    Definition of ``physicalSRS``, ``navigationSrs`` and ``publicSrs`` as
    reference to :ref:`srs-configuration`::

        "model": {
            "physicalSrs": "singapore-svy21-va",
            "navigationSrs": "singapore-svy21-va",
            "publicSrs": "geographic-wgs84-egm96"
        }

``division`` (Object)
    Division defintion

        ``extents`` (Dict)
            ``ll`` and ``ur`` bounding box definition::
             
                "extents" : {
                    "ll": [-496286.358, -485543.428, -500], "ur": [552289.642, 563032.572, 7000]
                },
            
        ``heightRange`` (Array(number))
            Heigh (above the ellipsoid), where the reference frame makes sense::

                heightRange: [-500, 7000]

        ``nodes`` (Array)
            Definition of nodes for various lod ranges and positions, see
            :ref:`nodes-configuration`

.. _nodes-configuration:

Nodes configuration
"""""""""""""""""""
Following options can define reference frame node:

``id`` (Object)
    It's dictionary with keys ``lod`` (level od detail) and ``position`` (tile
    position with the tile grid).
``srs`` (String)
    Reference to :ref:`srs-configuration`
``extents``
    ``ll`` and ``ur`` definition using coordinates
``partitioning``
    Either you can use the keyword ``bisection`` or you can use binary keys and
    bounding box definition::

            "partitioning": {
                "00" : {
                    "ll": [-20037508.3428,-9467848.3472],
                    "ur": [20037508.3428,9467848.3472] },
                "01" : {
                    "ll": [-20037508.3428,9467848.34716118],
                    "ur": [20037508.3428,10018754.1714] },
                "10" : {
                    "ll": [-20037508.3428,-10018754.1714],
                    "ur": [20037508.3428,-9467848.34716118] }
            }

.. _source: https://github.com/Melown/vts-registry/blob/master/registry/registry/boundlayers.json
