.. _mars-peaks-and-valleys-searchable-nomenclature:

The Peaks and Valleys of Mars Part 2: Searchable Nomenclature
-------------------------------------------------------------

In our :doc:`first Mars tutorial <mars-peaks-and-valleys>`, you used `VTS 3D geospatial software stack <https://melown.com/products/vts>`_ to  stream an interactive, browseable map of Mars from your own system using public domain data sources. That was fun.

But wait a minute - is your virtual Mars model a real *map*? A map should have labels, so that aliens (YOU in this case) can use it to get around. After all, Mars is one of the best researched and documented bodies in the solar system so its nomenclature is readily available. And by the long standing standard of digital cartography, a map nomenclature should be searchable.

Right on. In following this tutorial, you are going to turn your 3D model of Mars into a real map, complete with labels and search functionality.

Preparation
"""""""""""
As a prerequisite, you should complete our :doc:`first Mars tutorial <mars-peaks-and-valleys>`.

For search functionality, you need to have Node.js 8.x installed on your system. Run

::

    $ node --version 

to check your Node.js version. If the version you see is bellow 8.x or if you lack a Node.JS environment completely, run the following commands::

curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs


The Labels
""""""""""

Search
""""""


