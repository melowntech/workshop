.. index::
    single: docker

.. _docker:

******
Docker
******

`Docker <https://www.docker.com/>`_ is popular container platform. With help of
Docker, we can easily distribute VTS* services and split the whole needed
infrastructure into more `microservices <http://microservices.io/patterns/microservices.html>`_

In this document, we are going to discuss, how to setup VTSD and Mapproxy
servers along with Nginx server for production.

.. note:: Before you start, you should be familiar with `basic concepts of
        Docker <https://docs.docker.com/>`_ and have Docker installed.

=========================
Getting the configuration 
=========================

Docker configuration is distributed along with the `vts-backend
<https://github.com/melown/vts-backend>`_ package. You have to ``git clone`` the
project and ``dpkg-buildpackage`` the content, after that, all needed files are
available in the ``vts-backend`` project directory and we can proceed to
generate the Docker images and start te Containers.

::

    git clone --recursive https://github.com/Melown/vts-backend.git 
    cd vts-backend
    make

.. note:: You may obtain ``dpkg-buildpackage: error: failed to sign .changes file`` error after your run ``make``. That is ok
    you can still continue

=======================================
Build and run the VTSD Docker Container
=======================================

To get :ref:`vtsd` container up and running, use.

```
docker build -t vts-vtsd:latest -f docker/vtsd/Dockerfile .
```

If you were trying to follow one of our tutorials at
:ref:`tutorials`, you may have the ``storage`` directory already in your host
computer. You can therefore start the container with existing directory mounted
as volume:

```
docker run -ti -p 3060:3060 -v /path/to/vtsd-storage:/var/vts/store:rw --name vtsd vts-vtsd
```

===========================================
Build and run the Mapproxy Docker Container
===========================================

First build the Docker image

```
docker build -t vts-mapproxy:latest -f docker/mapproxy/Dockerfile .
```

You can now run the container directly, there  are already examples being part
of the deployment.

But again, if you followed some Mapproxy tutorials :ref:`tutorials`, you have
have the ``datasets`` directory already available along with the
``resources.json`` file.::

    `- project/
          `- resources.json
          `- datasets/

You can mount it as `Bind volume <https://docs.docker.com/engine/admin/volumes/bind-mounts/>`_.

docker run -ti -p 3070:3070 -v /my/projects/project:/vts/datasets/project --name mapproxy vts-mapproxy

VTS-Mapproxy is configured, so that

* it is excpeting ``/vts/datasets/.../resources.json`` files to be at the image
  available.
* The ``resources.json`` shall cotain **absolute paths** to existing datasets.

