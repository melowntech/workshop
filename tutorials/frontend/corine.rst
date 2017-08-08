.. index::
    single: Corine

.. _corine-javascript:

===============================
Corine land cover frontend side
===============================

In this example, we are going to create front-end JavaScript app using the
:ref:`corine-example`.

HTML Page
---------

We need simple HTML web page with JavaScript included and ``<div>`` element for
the map.

.. literalinclude:: srcs/corine.html
   :lines: 7-9
   :language: html
   :linenos:

We also add some CSS sugar, for styling the layerswitcher panel and legend div:

.. literalinclude:: srcs/corine.html
   :lines: 10-36
   :language: css
   :linenos:

At the end of the file, legend ``div`` element is add too

.. literalinclude:: srcs/corine.html
   :lines: 42-44
   :language: css
   :linenos:

Legend image
------------
You may know, that the `OGC WMS <http://opengeospatial.org/standards/wms>`_
supports ``GetLegendGraphic`` type of request. The legend image can be obtained
using following URL:  http://image.discomap.eea.europa.eu/arcgis/services/Corine/CLC2012/MapServer/WmsServer?request=GetLegendGraphic&version=1.3.0&format=image/png&layer=Corine%20Land%20Cover%202012%20raster

.. figure:: ../backend/images/corine-legend.png
    
JavaScript code
---------------

The code is straight forward and can be downloaded from
:download:`srcs/corine.js`, you have to initialize the browser with two
parameters: 

#. Target ``<div />`` element ID
#. Map configuration JSON file

.. literalinclude:: srcs/corine.js
    :lines: 84-97

In the initializing function, ``addControl()`` function is called, it ensures,
there will be layerswitcher panel in the map:

.. literalinclude:: srcs/corine.js
    :lines: 70-82

.. literalinclude:: srcs/corine.js
    :lines: 13-21

The resulting application can look like following pictures:

.. figure:: ../backend/images/corine-2012.png
    :width: 800px

.. figure:: ../backend/images/urban-atlas.png
    :width: 800px

