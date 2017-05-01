.. Melown 3D Stack - Workshop documentation master file, created by
   sphinx-quickstart on Fri Mar 10 21:33:38 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

###########################
Melown 3D Tetchnology Stack
###########################


The Melown (http://melown.com) API and open source library provides a technology
for interactive rendering of 3D maps across platofrms and form factors. It is
client-server architecture with back-end component (VTS) and JavaScript
front-end library.

The tutorial/workshop topic is complete Melown’s 3D open source stack
(https://github.com/melown/). First, we are are going to give the introduction
to the concepts and 3D visualisation principles and naming convention used in
Melown. In the second part, Melown server components (back-end) are introduced.
We are going to setup and configure
`VTS-Mapproxy <https://github.com/melown/vts-mapproxy>`_ and
`VTSD <https://github.com/melown/vts-vtsd>`_ and configure data sources from
public services and local datasets. We also will add custom vector data and
visualise them on top of digital elevation model. Next, we are going to create
web application consuming data from configured server and visualising them in
the web browser. We will demonstrate capabilities of the JavaScript library and
show the ways the map can be embed to existing web page. At the end, Melown web
administration console (https://www.melown.com/console) - service - will be
presented, where all the parts are ready-to-use in our cloud platform for less
technical skilled users.

**Contents:**

.. toctree::
    :maxdepth: 2

    introduction
    server/index
    clients/index
    console
    conclusion



Indices and tables
==================

* :ref:`genindex`
* :ref:`search`

