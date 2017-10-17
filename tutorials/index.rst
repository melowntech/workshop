.. _learning-vts:

############
Learning VTS
############

The simplest way to get started with VTS is by following some of our tutorials and case studies. The tutorials are organized into two main sections and sorted by complexity starting with the simplest ones.

.. _backend-tutorials:

Backend
=======

Backend tutorials are focused on setting up the VTS Backend environment, preprocessing your data and configuring the VTS streaming servers to serve them to client. It is a must-read if you plan to serve your own data through VTS.

* :ref:`Setting up the VTS Backend environment <vts-backend>`: essential basic setup of VTS, most other backend tutorials build atop of it.
* :ref:`Mars: The Peaks and Valeys <mars-peaks-valleys>`: setting up an interactive 3D globe using local data on your drive (DEM and imagery) and :ref:`mapproxy <mapproxy>`.
* :ref:`Mars: Searchable Nomenclature <mars-peaks-and-valleys-searchable-nomenclature>: adding vector nomenclature labels and search functionality to the previous tutorial.


Some more VTS case studies and tutorials are provided below.

Tutorials are separated into two main sections

* :ref:`backend-examples` - They are covering mostly `VTS-Browser-JS JavaScript
  library <https://github.com/melown/vts-browser-js>`_ and how to get the most
  from the 3D rendering library as well as how to add some GUI components.
* :ref:`frontend-examples` - They do exaplain the usage of some of the back-end
  compoments, mainly (but ont only) `VTS-VTSD
  <https://github.com/melown/vts-vtsd>`_ and `VTS-Mapproxy
  <https://github.com/melown/vts-mapproxy>`_.


.. toctree::
   :maxdepth: 0
   :titlesonly:
   :hidden:

   backend
   frontend
