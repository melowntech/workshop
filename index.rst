.. Melown 3D Stack - Workshop documentation master file, created by
   sphinx-quickstart on Fri Mar 10 21:33:38 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

##############################
Melown VTS 3D Technology Stack
##############################


Melown Technologies (http://melown.com) open source VTS 3D geospatial
software stack API provides a technology for interactive rendering of 3D
maps across platofrms and form factors.  It is client-server architecture
with backend components and JavaScript and C++ frontend libraries.

The tutorial/workshop topic is the complete VTS 3D open source stack
(https://github.com/melown/).  First, we are are going to give the
introduction to the concepts and 3D visualisation principles and naming
convention used in Melown.  In the second part, Melown server components
(back-end) are introduced.  We are going to setup and configure
`VTS-Mapproxy <https://github.com/melown/vts-mapproxy>`_ and `VTSD
<https://github.com/melown/vts-vtsd>`_ and configure data sources from
public services and local datasets.  We also will add custom vector data and
visualise them on top of digital elevation model.  Next, we are going to
create web application consuming data from configured server and visualising
them in the web browser.  We will demonstrate capabilities of the JavaScript
library and show the ways the map can be embed to existing web page.  At the
end, Melown Cloud (https://www.melown.com/cloud) service will be presented,
where all the parts are ready-to-use in a cloud platform for less
technically skilled users.

**Contents:**

.. toctree::
    :maxdepth: 1

    introduction
    server/index
    clients/index
    cloud/index
    tutorials/index
    conclusion



Indices and tables
==================

* :ref:`genindex`
* :ref:`search`

