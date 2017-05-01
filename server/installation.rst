.. _installation:

************
Installation
************

.. note:: All VTS-tools are installed in :file:`/opt/vts/` directory. It is
        adviced, to add `/opt/vts/bin/` path to your :envvar:`$PATH` environment
        variable.

.. todo:: This section needs to be extended and updated

Melown server components are developed on (Debian) GNU/Linux systems mainly. It
should be possible to compile them on MS Windows as well, but this approach was
not tested sofar.

.. _installation-debian:

=================================
Ubuntu/Debian Linux distributions
=================================

.. todo:: move debian repository to public location

On Debian-based distributions, you should be able just to :command:`apt-get install`
the key components. First you should add Melown repository to your apt sources

.. code-block:: bash

    sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable
    add-apt-repository "http://packages/debian melown-xenial"

Now install `vts-mapproxy` and `vts-vtsd` packages, they should contain all
needed dependencies

.. code-block:: bash

    sudo apt-get update
    sudo apt-get install vts-mapproxy vts-vtsd

.. _installation-vagrant:

=======
Vagrant
=======

.. note:: This part is stub and needs more elaboration

`Vagrant <https://www.vagrantup.com/>`_  is the command line utility for managing
the lifecycle of virtual machines. With Vagrant, new VirtualBox virtual machine
will be started, where VTS tools can be installed.

.. todo:: Add missing provisioning to vagrant description, 

First you need to get Vagrant machine configuration file. Save following
configuration into file of name `Vagrantfile` in your project repository::

        Vagrant.configure(2) do |config|
          
          vm_ram = ENV['VAGRANT_VM_RAM'] || 2048
          
          config.vm.box = "xenial64"
          config.vm.hostname = "melown"
          config.vm.box_url = "https://cloud-images.ubuntu.com/xenial/current/xenial-server-cloudimg-amd64-vagrant.box"
          config.vm.synced_folder '.', '/vagrant'
          
          #config.ssh.forward_agent = true

          config.vm.define "melown" do |server|

            # port forwarding
            #config.vm.network "forwarded_port", guest: 8080, host: 8080
            config.vm.network "forwarded_port", guest: 3070, host: 3070

            ## deployment
            #server.vm.provision "install", type: "ansible" do |ansible|
            #  ansible.playbook = "provision/deployment.yml"
            #  ansible.force_remote_user = false
            #  ansible.verbose = "vv"
            #end

            # VirtualBox configuration
            server.vm.provider "virtualbox" do |vb, override|
              vb.customize ["modifyvm", :id, "--memory", vm_ram]
              vb.customize ["modifyvm", :id, "--nictype1", "virtio"]
              #vb.gui = true
            end  
          end
        end

Now run following command

.. code-block:: bash

    vagrant up

And once your machine is up, you should be able to go to your `localhost
port <http://localhost:8080/` 8080 and see running MapProxy server there.
    
.. _installation-docker:

======
Docker
======

`Docker <https://docker.com>`_ is the popular software container platform.
Developers use Docker to eliminate "works on my machine" problems when
collaborating on code with co-workers.

.. note:: We are about to create Docker containers with official VTS tools
        distribution in the future.

.. _installation-source:

======
Source
======

.. todo:: How to compile VTS server tools will be described in the future too.
