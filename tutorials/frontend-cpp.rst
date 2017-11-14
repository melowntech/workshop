
.. _vtsfrontend-cpp:

Introduction to VTS-Browser-CPP
-------------------------------

This guide shows how to build a simple c++ frontend application build on VTS.

.. figure:: images/frontend-cpp.png

  What you should have in the end.


Dependencies
^^^^^^^^^^^^

VTS Browser
"""""""""""

The library is available as a package on some popular linux distributions.
Instructions to add the source-lists are at `OSS <https://cdn.melown.com/packages>`_.
After that, install the developer files for the library and optionally the debug symbols.

.. code-block:: sh

  apt-get install libvts-browser-dev libvts-browser-dbg

If the package is not available for your distribution you may build the library from source code.
See `Building <https://github.com/Melown/vts-browser-cpp/blob/master/BUILDING.md>`_ for more information.
After that just install the library locally.

.. code-block:: sh

  sudo cmake --build . --target install


SDL
"""

SDL is portable library for window creation, OpenGL context creation and event handling.

For instructions on installation see `SDL <https://libsdl.org>`_.


Cmake
"""""

Cmake is platform-independent project configuration tool that generates platform (or IDE) specific project files.

For installation instructions see `Cmake <https://cmake.org>`_.


Building
^^^^^^^^

First, we write a simple cmake script called *CMakeLists.txt*.
It will search for the actual paths to all the required libraries.
Than is specifies to build an executable program called *vts-example*.

The program uses single source file called *main.cpp* and is linked with all the libraries.

*CMakeLists.txt*:

.. literalinclude:: srcs/frontend-cpp/CMakeLists.txt
   :language: cmake

Afterwards, let us generate the platform specific build files (usually a makefile on linux).
This step is only done once.
After that, the build system will automatically check the *CMakeLists.txt* for changes.

Moreover, we do not want to clutter the directory with numerous temporary files, therefore, we instruct cmake to generate the build scripts in a separate directory.

.. code-block:: sh

  mkdir build
  cd build
  cmake ..

After that, just call the following command every time you want to rebuild the code (from inside the *build* directory).

.. code:: sh

  cmake --build .


Source Code
^^^^^^^^^^^

*main.cpp*:

.. literalinclude:: srcs/frontend-cpp/main.cpp
   :language: c++
   :lines: 26-
   :linenos:


Conclusion
^^^^^^^^^^

You may download the sources: :download:`srcs/frontend-cpp/main.cpp`
and :download:`srcs/frontend-cpp/CMakeLists.txt`.

For further reading about the browser library see our `Wiki <https://github.com/Melown/vts-browser-cpp/wiki>`_
or `GitHub <https://github.com/Melown/vts-browser-cpp>`_.





