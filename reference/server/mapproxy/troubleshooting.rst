.. _mapproxy-troubleshooting:

Troubleshooting mapproxy
========================

This section assumes you installed your mapproxy as a part of :ref:`VTS Backend <vts-backend>`. If not, actual paths or commands may differ

Mapproxy log file
-----------------

The mapproxy log file is the best starting point whenever something goes wrong. If the mapproxy is installed as a part of :ref:`VTS Backend <vts-backend>`, the file is located in ``/var/log/vts/mapproxy.log``

Common problems
---------------

I cannot see my resource
	Mapproxy checks the resource definitions every five minutes (configurable). If you do not want to wait, you may force-update the definitions by ::

		sudo /etc/init.d/vts-backend-mapproxy force-update

	then, you should see at the end of the log file something like ::

		Updating resources.
		...
		Preparing <your/resource>
		...
		Ready to serve <your/resource>

	Then the resource will be ready. In case there is no ``Ready to serve <your/resource>``, there will be an error why your resource could not be loaded, that will give you a hint, where the problem is.

Resource is ``Ready to serve`` but tiles return 404/500
	When mapproxy prepares resource, it does not check all underlying data. Search log file for errors regarding your tiles, they will contain reason why tile generation failed. The paths you provided in resource definition may not exist or the data at that paths may be incomplete or corrupted. Check if all data preprocessing tools finished successfully.

I fixed my resource definition but I see no change
	When mapproxy initializes resource for the first time, it freezes its configuration in store located at ``/var/vts/mapproxy/store``. This is important in production environment and prevents 
	accidental corruption or deletion of live resources but may it be counter-intuitive for beginners.

	The resource is uniquely defined by its ``group`` and ``id`` combination. The easiest way to work around this configuration freezing is just to define a new (fixed) resource with slightly different ``id``. An alternative is to stop mapproxy, e.g. by ::
	
		sudo /etc/init.d/vts-backend-mapproxy stop

	then delete particular resource's directory in ``/var/vts/mapproxy/store`` (or the whole ``/var/vts/mapproxy/store``) and start mapproxy again.


I cannot find my issue here
	Check the `the issues on GitHub <https://github.com/Melown/vts-mapproxy/issues>`__ and connect with our development team.

