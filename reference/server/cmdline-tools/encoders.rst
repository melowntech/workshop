.. _encoders:

Encoders
========

VTS allows to covert external hierarchical mesh formats into VTS tilesets. These include so far ESRI SLPK (.spk) format, Bentley Context capture LODTree and Leica Citymapper DAE export (accepted by ``lodtree2vts``) and `VEF <https://github.com/Melown/true3d-format-spec>`__ open transport format proposed by Melown.

There are also two special encoders to concert from VTS tilesets and VEF.

External format to VTS encoders
-------------------------------

.. _vef2vts:
.. _slpk2vts:
.. _lodtree2vts:

vef2vts, slpk2vts, lodtree2vts
------------------------------

The most important options are common to all convertors to VTS.

``input``
    Path to input file/directory. All convertors can input as directory, zip archive or plain tar archive.
``output``
    Path to output VTS tileset.
``tilesetId``
    Output tilesetId.
``referenceFrame``
    Output tileset's :ref:`reference frame <reference-frame>`.
``zShift``
    Manual heigh adjustment of the output. Usefull for minor fixes of georeferencing.

.. _vef2slpk:

vef2slpk
--------



.. _vts2vts:

vts2vts
-------

Used to convert VTS tilesets between reference frames. If original data are available in some non-VTS format, it is always better to create tileset in desired reference frame by encoding directly from the original data. The use of ``vts2vts`` is advisible only if the original data is not available because of slight degradation of quality due to texture reencoding and tile-margin bloat.

