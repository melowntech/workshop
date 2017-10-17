Installation
============

.. note:: For installation instructions please refer to :file:`README.md` file
        in `source tree <https://github.com/Melown/vts-client-cpp/>`_.

Installation from source code
-----------------------------

Downloading source code
^^^^^^^^^^^^^^^^^^^^^^^

You have to download VTS-Mapproxy source code from GitHub repository. Do not
forget to add ``--recursive`` option to  ``git clone`` command::

    git clone --recursive https://github.com/Melown/vts-client-cpp.git

You have to download and install some required packages::

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
        libprotobuf-dev protobuf-compiler libprocps-dev libmagic-dev gawk sqlite3\
        libglfw3-dev

You should now have system ready for final compilation step::

    cd vts-browser-cpp
    cd browser
    make -j4

All binaries should be saved to ``vts-browser-cpp/browser/bin/`` directory.

.. note:: Before you run any of the VTS-Mapproxy tools ref:`registry` should
        be installed too.
