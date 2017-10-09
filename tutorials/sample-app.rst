
=========================================
Simple VTS-Browser-JS application example
=========================================

HTML Page
---------

You have to add 2 files to your web page, the CSS file and the
``VTS-Browser-JS`` library (minified version)

.. literalinclude:: srcs/sample-app.html
   :lines: 7-9
   :language: html
   :linenos:

Then, target ``<div />`` element has to be set

.. literalinclude:: srcs/sample-app.html
   :lines: 13-14
   :language: html
   :linenos:

And finally, the final JavaScript Application will be add to in separated file

.. literalinclude:: srcs/sample-app.html
   :lines: 15
   :language: html
   :linenos:

You can download :download:`srcs/sample-app.html` and test the file at your
server.

JavaScript Code
---------------

The code is straigt forward, you have to initialize the browser with two
parameters: 

#. Target ``<div />`` element ID
#. Map configuration JSON file

.. literalinclude:: srcs/sample-app.js
    :lines: 9-11

You can download :download:`srcs/sample-app.js` the javascript code too.

`See it in action <../../_downloads/sample-app.html>`_
