.. index::
    single: bound layer
    single: credits
    single: SRS

.. _registry-configuration:

Registry configuration
----------------------

Registers are configured using JSON formatted text files. You can add or
customize the registry any time in your configuration files. Files can be stored
anywhere in your system, as long as 
:envvar:`VTS_LIBS_REGISTRY_PATH` environment variable is pointing at the parent
directory.

Registry is database containing pre-configured values, stored in separated
files:

:file:`boundlayers.json`
    This file contains configuration of default set of :ref:`bound-layer`\s. See
    :ref:`mapproxy-resource` for configuration details.

:file::`credits.json`
    This file contains configuration of default set of :ref:`credit`. See
    :ref:`mapproxy-credits` for configuration details.

:file:`referenceframes.json`
    File containing default set of :ref:`reference-frame`\s. See :ref:`mapproxy-ref-frame-definition` for details.

:file:`srs.json`
    File containing configuration of spatial reference system. See
    :ref:`srs-configuration` for configuration details.
