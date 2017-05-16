.. _registry-installation:

Registry Installation
---------------------

Using precompiled ``deb`` package
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It will be possible to use ``apt-get``, once we setup public repository.

Compiling from source code
^^^^^^^^^^^^^^^^^^^^^^^^^^
Fir you have to clone the code from `VTS-Registry
<httsp://github.com/melown/vts-registry>`_ repository::

    git clone --recursive https://github.com/melown/vts-registry.git

Then you have to call ``make`` program::

    cd vts-registry/registry/
    make    

There should be debian package created in :file:`vts-registry` directory, you
should be able to install it manually::

    sudo dpkg -i ../vts-registry_1.0_amd64.deb

Registry will be installed in :file:`/opt/vts/etc/registry`

