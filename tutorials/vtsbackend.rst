Setting up your own VTS backend environment
-------------------------------------------

VTS backend environment is a system of server-side components which allow you to run the backend portion of Melown Tech's open source VTS 3D map streaming and rendering stack. 

If you need to work with an existing VTS map configuration, such as one hosted at `Melown Cloud <https://melown.com/cloud>`_, you don't need VTS backend environment. If you need to stream from your own servers, on your Intranet, do not want to upload your data to the cloud, or want to make use of VTS features not avaialble in the cloud, here is what you need to do.

The tutorial presumes that you have a clean Ubuntu 16.04 installation and that your user that can obtain superuser privileges via sudo. You also need at least a couple of GiBs of free disk space, and a working C++/cmake build evironment.

VTS backend evironment consists of four components:

* the *registry*, which holds the deinition of coordinate systems and reference frames known to VTS,
* the *mapproxy*, which provides for on-the-fly generation and streaming of bound layers, surfaces and free layers,
* the *vtsd*, which is an HTTP server streaming static content from VTS storage
* the *tools*, which provide tools to create and maintain a VTS storage and interface with it
 
Alas, there is currently no binary distribution of VTS backend components, thus we need to compile them from source. There is a GitHub repository corresponding to each of the four components.

1. Compile and install VTS components
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Each of the components provides detailed build instructions in their respective GitHub repositories, but the following steps should work as a condensed version.

First add ubuntugis ppa to your apt system::

  $ sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable
  $ sudo apt-get update
  
Second, build and install the OpenMesh library::

  $ git clone https://www.graphics.rwth-aachen.de:9000/OpenMesh/OpenMesh.git
  $ cd OpenMesh
  $ mkdir build
  $ cd build
  $ cmake ..
  $ make -j2
  $ sudo make install

Now, clone the head revision of the master branch of each of the four repositories::
  
  $ git clone --recurse-submodules https://github.com/Melown/vts-registry.git
  $ git clone --recurse-submodules https://github.com/Melown/vts-mapproxy.git
  $ git clone --recurse-submodules https://github.com/Melown/vts-vtsd.git
  $ git clone --recurse-submodules https://github.com/Melown/vts-tools.git

Next compile and install the components one by one.

::

  $ for i in vts-registry vts-mapproxy vts-vtsd vts-tools; do \
    make set-variable VARIABLE=CMAKE_INSTALL_PREFIX=/usr/local && make install

If all went well, you now have a working build of all VTS components installed on your system. The `make set-variable` above is in fact unnecessary, since `/usr/local` is the default install prefix for manually built VTS backend.  

Configure and run vts-mapproxy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create mapproxy-related directories::

  $ mkdir -p /var/local/vts/mapproxy/{datasets,gdaltmp} /usr/local/etc/vts/mapproxy /var/local/log/vts

This is the main data directory, directory for configuration files, and log directory, respectively.

Use your favorite text editor to create the main mapproxy configuration file at `/usr/local/etc/vts/mapproxy/mapproxy.conf` with the following contents::

  [log]
  mask=DEFAULT
  file=/var/local/log/vts/mapproxy.log

  [store]
  path=/var/local/vts/mapproxy/store

  [http]
  listen=:3070
  enableBrowser=true

  [resource-backend]
  type=conffile
  path=/usr/local/etc/vts/mapproxy/resources.json
  root=/var/local/vts/mapproxy/datasets

  [gdal]
  tmpRoot=/var/local/vts/mapproxy/gdaltmp

Finally, we create an empty resource file for mapproxy::

   $ echo "[]" >> /usr/local/etc/vts/mapproxy/resources.json

Now we are ready to run the mapproxy instance as

::

  $ /usr/local/bin/vts-mapproxy -f /usr/local/etc/vts/mapproxy/mapproxy.conf -d
  ...
  2017-07-10 00:46:50 I4 [22930(main)]: [mapproxy] Service mapproxy/test running at background. {service.cpp:operator()():527}
  $ 

As a test, you may now point your web browser to
http://yourserver:3070/melown2015/surface/.system/surface-spheroid/ (make sure port 3070 is open from wherever you run your browser). If all went well, you should see something like this:

.. image:: vtsbackend-spheroid.png


Initialize VTS storage
^^^^^^^^^^^^^^^^^^^^^^

Configure and run vtsd
^^^^^^^^^^^^^^^^^^^^^^

Set up Nginx as reverse proxy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Test your installation
^^^^^^^^^^^^^^^^^^^^^^

All done. You now have a working VTS backend envronment.

