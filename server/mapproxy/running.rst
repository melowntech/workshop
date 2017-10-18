.. _mapproxy-running:

=======
Running
=======

You should have now 3 files in your project directory (if you cloned from
`prepared sample project <https://github.com/melown/mapproxy-project>`_, there
might be the :file:`README.md` file too::

    ├── datasets
    │   └── basemap-at-ophoto.xml
    ├── mapproxy.conf
    └── resources.json

You can now run your VTS-Mapproxy server instance::

    $ mapproxy --config mapproxy.conf

    2017-05-01 14:20:56 I3 [2326(main)]: Loaded configuration from <mapproxy.conf>. {program.cpp:configureImpl():409}
    2017-05-01 14:20:56 I3 [2326(main)]: [mapproxy] Config:
	store.path = "/home/ubuntu/mapproxy/store/"
	http.listen = 0.0.0.0:3070
	http.threadCount = 2
	http.client.threadCount = 1
	http.enableBrowser = true
	core.threadCount = 2
	gdal.processCount = 2
    ...

After you run the server, first, since we have ``enableBrowser`` turned on, you
can now go to http://localhost:3070/ and browse our VTS-Mapproxy server
instance. What you can see at first sight, there are are lots of
:ref:`reference-frame` defined - we did not have to do this at all. Also, if you
have a look in the base directory, dir was added :file:`store`, where all those
reference frames were add. And the VTS-Mapproxy server is now serving them on
the port 3070.

The structure of the :file:`store` directory is following:

``/*``
    list of :ref:`reference-frame`. The list was generated automatically from
    VTS-Mapproxy. 

    * http://localhost:3070/

``/[REFERENCE-FRAME]/*``

    list of source *types* - in our case, there is ``tms`` and ``surface``
    resource types

``/[REFERENCE-FRAME]/[RESOURCE-TYPE]/*``

    list of :ref:`resource` *groups*, as they are defined in our :file:`resources.json` 
    in our configuration file. There are currently two resources groups defined:
    ``melown`` for the ``spheroid`` resource and ``basemap-at`` group for the
    ``basemap-at-ophoto`` resource.

    * http://localhost:3070/melown2015/surface/ - for the surface on the sphere
    * http://localhost:3070/melown2015/tms/ - for the surface on the sphere
    * http://localhost:3070/webmerc-projected/surface/ - for "Google Mercator" projection
    * http://localhost:3070/webmerc-projected/tms/ - for "Google Mercator" projection
    * and others

``/store/[REFERENCE-FRAME]/[REFERENCE-GROUP]/*``
    list of **resources** assinged to ``REFERENCE-GROUP`` - in our case, we have
    two:

    # ``basemap-at-photo`` of type ``tms``
    # ``spheroid`` of type ``surface``
   
    * http://localhost:3070/melown2015/surface/melown/spheroid/
    * http://localhost:3070/webmerc-projected/tms/basemap-at/basemap-at-ophoto/ 


.. note:: You can also hit into other resource types, like
        :file:`.system/tms-aster-patchwork`, which is generated tiled resource,
        with every tile having different color

        http://localhost:3070/webmerc-projected/tms/.system/tms-raster-patchwork/
    

We now should be able to see 2D map (using Leaflet) of Austrian orthophoto image
service http://localhost:3070/webmerc-projected/tms/basemap-at/basemap-at-ophoto/ 

And we should also see the same map, projected on sphere http://localhost:3070/melown2015/surface/melown/spheroid/ - the sphere might look empty, but you can always find "Vienna" in the search field and you should end up on URL similar to this: http://localhost:3070/melown2015/surface/melown/spheroid/?pos=obj,16.372504,48.208354,fix,0.00,0.00,-60.00,0.00,30000.00,55.00

.. figure:: ../../tutorials/images/austria.jpg

