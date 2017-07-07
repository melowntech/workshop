========================
WMTS Application example
========================

.. note:: This example assumes, you are on your own computer, having e.g. Apache
        web server at hand. It should be usable also on OSGeo-Live distribution.

.. note:: We shall now bring our :ref:`srtm-example` to life. Please make sure, you have
        VTS-Mapproxy up and running, serving the data and come back to continue with
        this client once you do so. Make sure
        http://localhost:3070/melown2015/surface/melown/dem/ is up and running

HTML Page
---------

You as shown in the :ref:`wmts-app` examle, first we add 2 files to your web
page, the CSS file and the ``VTS-Browser-JS`` library (minified version)

.. literalinclude:: srcs/wmts-app.html
   :lines: 7-9
   :language: html
   :linenos:

Then, target ``<div />`` element has to be set

.. literalinclude:: srcs/wmts-app.html
   :lines: 13-14
   :language: html
   :linenos:

And finally, the final JavaScript Application will be add to in separated file

.. literalinclude:: srcs/wmts-app.html
   :lines: 15
   :language: html
   :linenos:

You can download :download:`srcs/wmts-app.html` and test the file at your
server.

JavaScript Code
---------------

The code is straigt forward, you have to initialize the browser with two
parameters: 

#. Target ``<div />`` element ID
#. Map configuration JSON file

.. literalinclude:: srcs/wmts-app.js
    :lines: 5-7

You can download :download:`srcs/wmts-app.js` the javascript code too.

`See it in action <../../_downloads/wmts-app.html>`_

Setting up the proxy server
---------------------------
Even VTS-Mapproxy is running on your local machine, using the port 3070. We
need, that the server returns back the header::

    Access-Control-Allow-Origin: "*"

We have to proxy running Mapproxy using e.g. Apache HTTP server::


    Header set Acces-Control-Allow-Origin "*"
    ProxyPreserveHost On
    ProxyPass /melown http://localhost:3070/melown2015
    ProxyPassReverse /melown2015 http://localhost:3070/melown2015

You also have to enable the ``headers`` module of Apacahe::

    a2enmod headers

And restart Apache::

    sudo service apache2 restart

You should be now able to reach ``mapConfig.json`` using the proxy, check it
out: http://localhost/melown2015/surface/melown/dem/mapConfig.json

And also you should be able to visit `our example <../../_downloads/wmts-app.html>`_ and it should be working.

.. figure:: images/wmts-example.png
