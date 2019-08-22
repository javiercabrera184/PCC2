
#!/bin/bash

#Creamos un grupo de recursos y le indicamos nombre y localizacion
az group create --name Prueba --location francecentral

#Creamos un grupo de seguridad para la red del grupo de recursos creado previamente
az network nsg create --resource-group Prueba --location francecentral --name myNet
#Habilitamos el puerto 80 para las conexiones http
az network nsg rule create --resource-group Prueba --nsg-name myNet --name http --protocol tcp --priority 1000 --destination-port-range 80 --access allow
#Habilitamos el puerto 22 para las conexiones ssh
az network nsg rule create --resource-group Prueba --nsg-name myNet --name ssh --protocol tcp --priority 999 --destination-port-range 22 --access allow
#Creamos la maquina virtual dentro del grupo de recursos creado anteriormente, elegimos imagen y usuario.
az vm create --resource-group Prueba --name CCproyecto --image Canonical:UbuntuServer:18.04-LTS:latest --admin-username antonio --generate-ssh-keys --public-ip-address-allocation static --nsg myNet --size Standard_A0
#Creacion de otras maquinas virtuales para la prueba de rendimiento
#az vm create --resource-group Prueba --name CCproyecto2 --image credativ:Debian:10-DAILY:latest --admin-username antonio --generate-ssh-keys --public-ip-address-allocation static --nsg myNet
#az vm create --resource-group Prueba --name CCproyecto3 --image OpenLogic:CentOS-HPC:7.4:7.4.20180301 --admin-username antonio --generate-ssh-keys --public-ip-address-allocation static --nsg myNet
