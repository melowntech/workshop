.. _browser-js-installation:

===========================
VTS-Browser-JS installation
===========================

The build system uses `webpack module bundler <http://webpack.github.io/>`_.
Typical development cycle starts with ``npm install`` for installation of
dependenices. Then you usually run ``webpack-dev-server`` and build with ``webpack``.

Start with download::

    git clone https://github.com/melown/vts-browser-js.git


Dependencies
------------

For installing dependencies, just use ``npm``::

    npm install

Build for development use
-------------------------

Just run ``webpack`` command - it should be located in
``node_modules/.bin/webpack``::

    $ webpack

The files are stored in the ``build`` directory

Build for production use
------------------------

The compressed code is produced with the ``NODE_ENV`` variable is set to
``production``::

    $ NODE_ENV=production webpack

The files are stored in the ``dist`` directory

Development server
------------------
For testing and playing with ``vts-browser-js`` library, you just have to run
development server. Start it with ``webpack-dev-server`` command (again, it
should be available in the ``node_modules/.bin/`` directory::
    
    $ webpack-dev-server

And visit http://localhost:8080/ url.
