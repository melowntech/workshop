.. _mapproxy-installation:

Installation
============

.. note:: For installation instructions please refer to :file:`README.md` file
        in `Mapproxy source tree <https://github.com/Melown/vts-mapproxy/>`_.

Installation from binary packages
---------------------------------

We will setup repository with ``.deb`` packages. As soon as the repo is ready,
we will be posting more instructions here.

Installation from source code
-----------------------------

Downloading source code
^^^^^^^^^^^^^^^^^^^^^^^

You have to download VTS-Mapproxy source code from GitHub repository. Do not
forget to add ``--recursive`` option to  ``git clone`` command::

    git clone --recursive https://github.com/Melown/vts-mapproxy.git

Dependencies
^^^^^^^^^^^^

For being able to build VTS-Mapproxy, C++ compilar and Cmake program has to be
available::

    sudo apt-get install cmake g++

You have to have `OpenMesh <https://www.openmesh.org/>`_ library installed in
your system::

    git clone https://www.graphics.rwth-aachen.de:9000/OpenMesh/OpenMesh.git
    cd OpenMesh
    mkdir build
    cd build
    cmake ..
    make -j4
    sudo make install

.. note:: To build mapproxy without debugging symbols (smaller library result),
    :envvar:`BUILDSYS_RELEASE_NDEBUG` environment variable::

        make set-variable VARIABLE=BUILDSYS_RELEASE_NDEBUG=1

You have to add `UbuntuGIS <https://wiki.ubuntu.com/UbuntuGIS>`_ repository
available in your `source.list`::

    sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable
    sudo apt-get update

Next you have to download and install some required packages::

    sudo apt-get install \
        libboost-dev \
        libboost-thread-dev \
        libboost-program-options-dev \
        libboost-filesystem-dev \
        libboost-regex-dev \
        libboost-iostreams-dev\
        libboost-python-dev \
        libopencv-dev libopencv-core-dev libopencv-highgui-dev \
        libopencv-photo-dev libopencv-imgproc-dev libeigen3-dev libgdal-dev \
        libproj-dev libgeographic-dev libjsoncpp-dev \
        libprotobuf-dev protobuf-compiler libprocps-dev libmagic-dev gawk sqlite3

You should now have system ready for final compilation step::

    cd vts-mapproxy
    cd mapproxy
    make -j4

All binaries should be saved to ``vts-mapproxy/mapproxy/bin/`` directory.

.. note:: Before you run any of the VTS-Mapproxy tools ref:`registry` should
        be installed too.
