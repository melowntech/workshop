.. index::
    single: registry
    signle: VTS_LIBS_REGISTRY_PATH

.. _registry:

VTS-Registry
============

`VTS-Registry <https://github.com/melown/vts-registry>`_ is basic database with
some default configuration options like

* basic :ref:`bound-layer`\s
* :ref:`credit`\s informations
* :ref:`reference-frame`\s definition
* :ref:`srs`\s registry
* images representing :ref:`geogrid`\s

By default, registry is expacted to be found in :file:`/usr/local/etc/registry`
directory. 

.. note:: If you've installed VTS-Registry from the ``.deb`` package, the
        registry will be located in :file:`/opt/vts/etc/registry`.

You can change the path, where VTS* tools are looking for the registry by the
:envvar:`VTS_LIBS_REGISTRY_PATH` environment variable.

Continue reading in chapters: 

.. toctree::
    :maxdepth: 1

    installation
    configuration
