.. index::
    single: free layer tiled
    single: tiled vector layer

.. _freelayer-tiled-example:

Publishing tiled vector data
----------------------------

Vector data as we know them in GIS, are called :ref:`free-layer` in terms of
VTS ecosystem. They can have their own coordinate reference system definition,
and they are tided to specific tiling schema - not related to used reference
frame. For configuration details, have a look at :ref:`geodata-vector-tiled`
configuration.

The main difference between vector data source (:ref:`free-layer`) and tiled
vector data is, that it allows us to display much larger datasets, adjusted to
specific :ref:`lod` (or zoom scale). 

.. note:: Mapproxy currently supports just lines and points. Polygons are not
    yet available for rendering.

In our example, we will continue with the :ref:`srtm-example` project (you can
also take what you have in the :ref:`freelayer-example` project), where we
have `SRTM <https://www2.jpl.nasa.gov/srtm/>`_ elevation data along with Czech
and Austrian WMTS aerial image layers.

We may now add some tiled vector layers.

.. note:: If you do not have ``resources.json`` and ``mapproxy.conf`` files yet,
    go to the :ref:`srtm-example` project and come back, after you have working
    project.

We may now add new resource of type :ref:`geodata-vector-tiled`.

Download the data
^^^^^^^^^^^^^^^^^
VTS supports tiled vectors stored in the
`MapBox vector tiles format`_ . One of
possible sources can be https://openmaptiles.org/, provided by `Klokan
Technologies <https://www.klokantech.com/>`_. We are going to download Austria
free tiles from https://openmaptiles.org/downloads/#country

Once you agree to the license, you can download the file
:file:`austria.mbtiles`.

Configure ``resources.json``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We now have our input data and can add new resource to
:download:`mapproxy-wmts-vector.json`

.. literalinclude:: mapproxy-wmts-vector-tiled.json
    :linenos:
    :lines: 2-36

The first part should be clear already, with exception for reference frame
definition. Vector dataset is tiled and we can find out it's optimal tile range
and :ref:`lod` range using :ref:`mapproxy-calipers`::

    $ mapproxy-calipers mapproxy-wmts/datasets/austria.mbtiles  --referenceFrame melown2015

    gsd: 6.43044
    range<pseudomerc>: 6,15 15/8621,5618:8977,5810
    range: 6,15 16,10:17,11
    position: obj,13.345765,47.696427,float,0.000000,0.000000,-90.000000,0.000000,603088.436364,55.000000

The ``range`` line is used for the ``referenceFrames`` attribute in layer
configuration.

Since we need to display copyright informations for `OpenStreetMap
<http://openstreetmap.org>`_ and `OpenMapTiles`_, we
need to extend :ref:`registry` database with this informations (see
``registry``).

Last part, the source ``definition`` is similar to :ref:`freelayer-example`.
You should be familiar with most
of the values, for reference have a look to :ref:`geodata-vector-tiled` documentation.
There is one important parameter ``dataset``, which is the reference the our
downloaded ``mbtiles`` file - you need to specify it's `x`, `y` and `lod`
parameters like it would be used in the URL.

Vector data styling
^^^^^^^^^^^^^^^^^^^
.. note:: Detailed reference for styling is behind scope of this example, please
    check `official styling documentation
    <https://github.com/Melown/vts-browser-js/wiki/VTS-Geodata-Format#geo-layer-styles-structure>`_.

Vector data styles are stored in JSON format. We shall discuss this in separate
example. In our case, we just use simple style file.

.. literalinclude:: mystyle.json

.. note:: styleUrl is not mandatory parameter - the vector data are going to be
    displayed anyhow.

Running
^^^^^^^
Once set, you can re-run ``mapproxy`` and see your vector map::

    $ mapproxy --config mapproxy.conf

.. figure:: austria-mbtiles.png

    Tiled vector layer using `MapBox vector tiles format`_ as :ref:`free-layer` displayed on surface with default style. Vector data tiles provided by `OpenMapTiles`_

.. _MapBox vector tiles format: https://www.mapbox.com/vector-tiles/
.. _OpenMapTiles: <http://openmaptiles.org>
