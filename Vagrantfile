Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "private_network", ip: "172.20.0.9"

  config.vm.provision "shell", inline: <<-SHELL
    sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
    wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
    apt-get update

    apt-get install -y postgresql postgresql-contrib phppgadmin

    su - postgres -c "psql -c \\"CREATE USER worldbuilder WITH PASSWORD 'w0rldbuilder';\\""
    su - postgres -c "createdb --owner worldbuilder worldbuilder"
    echo "listen_addresses = '*'" >> /etc/postgresql/9.5/main/postgresql.conf
    echo "host  all     all     all     md5" >> /etc/postgresql/9.5/main/pg_hba.conf
    service postgresql restart

    sed -i "s/\# allow from all/allow from all/" /etc/apache2/conf.d/phppgadmin
    service apache2 restart
  SHELL
end
