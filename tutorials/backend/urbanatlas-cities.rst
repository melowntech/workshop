.. _urbanatlas-cities-tutorial:

Displaying Open Landuse map over 3D data
----------------------------------------

In this tutorial we combine 3D data of Czech cities and the Corine Land Cover
/ Open Landuse datasets from the :ref:`corine-example`.

.. note:: Czech Cities 3D is proprietary dataset, provided by `Melown Technologies <https://melown.com>`_. Please contact Melown Technologies in order to get permission for the dataset usage.
  
This tutorial expects that you have already set up your VTS backend.

It is assumed, that your Mapproxy resources are set up and that your Mapproxy
instance is up and running, just as shown in the example :ref:`corine-example`.

Filling the storage
^^^^^^^^^^^^^^^^^^^

To work with static True3D data and/or fuse various surfaces together, we must
add them to the storage.  Storage is administered by tool ``vts`` that
takes care of adding tilesets to storage. The :ref:`glue`\s will not be
generated, since we are using just one surface.

.. code-block:: bash

  mkdir -p openlanduse/store

Adding tilesets into storage
""""""""""""""""""""""""""""

Now we are ready to merge everything in the storage - we just add our cities 3D
tileset as remote tileset. The browser will eventually draw the tiles from URL
you specify in ``vts --add`` command.

.. code-block:: bash

  vts openlanduse/storage --add \
      --tileset http://[SERVER]/store/melown2015/stage/tilesets/melown-cities-cz --bottom

Creating a storage view
"""""""""""""""""""""""

As the final step we need to create a :ref:`storage-view` that
combines tilesets from our storage and free and bound layer from the mapproxy.

Go to ``openlanduse/`` and create a directory ``map-config`` and the file ``cities`` with the
following contents.

.. literalinclude:: projects/corine/cities

For commented configuration file, have a look at the :ref:`cadastre-tutorial`
example.

.. code-block:: bash

  cd openlanduse/map-config
  vts --map-config cities

If everything is all right, a large JSON with client side map configuration will
be printed.

You may now start the ``vtsd`` program with given configuration file
:download:`projects/corine/vtsd.conf`:

.. figure:: images/urban-atlas-cities.png
  :width: 800px

  Urban atlas layer "draped" over the 3D cities map

.. figure:: images/urban-atlas-cities-2.png
  :width: 800px

  Corine DEM as **Free layer** with texture from Open Landuse service, layed
  over 3D cities with texture - using 50% transparency.

.. figure:: images/cities-x-urbanatlas.png
  :width: 800px

  Corine DEM as **Free layer** with texture from Open Landuse service, layed
  over 3D cities with texture - using 50% transparency.

