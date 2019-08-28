#!/bin/bash

#Creamos un grupo de recursos en uksouth
az group create --name Hito6 --location uksouth

#Creamos el contendor a partir de la imagen de mongo, le indicamos el puerto
az container create --resource-group Hito6 --name database --image mongo --dns-name-label red-database --ports 27017

#Creamos el contenedor a partir de nuestra imagen, le indicamos los dos puertos a los que tiene que escuchar.
az container create --resource-group Hito6 --name app --image antojavi94/app:1.0 --dns-name-label red-app --ports 27017 80
