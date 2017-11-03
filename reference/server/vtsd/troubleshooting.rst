.. _vtsd-troubleshooting:

Troubleshooting VTSD
====================

This section assumes you installed your VTSD as a part of :ref:`VTS Backend <vts-backend>`. If not, actual paths or commands may differ - e.g. if you are running VTSD from command line instead of with init-script.

VTSD log file
-------------

The VTSD log file is the best starting point whenever something goes wrong. If the VTSD is installed as a part of :ref:`VTS Backend <vts-backend>`, the file is located in ``/var/log/vts/vtsd.log``

Common problems
---------------

When I browse to my storage view I get 500 HTTP error
	There is a problem with storage view JSON. Either the JSON itself is invalid (syntax error) or the configuration inside it is invalid. It is good to check the VTSD log file if this is really the case. If so, use :ref:`vts tool <vts-cmdline>` to locate the problem within the file::

		vts --map-config <path/to/your/storage-view>

	This should point you to the problem. It is recommended to incrementally expand your storage view from a working one and testing it by the command above to avoid these errors.

I get 403 HTTP errors when trying to browse directories with VTSD
	``listing = true`` for location in question is missing in the VTSD configuration.

I cannot find my issue here
	Check the `the issues on GitHub <https://github.com/Melown/vts-vtsd/issues>`__ and connect with our development team.
