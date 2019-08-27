az group create --name Hito6 --location uksouth

az container create --resource-group Hito6 --name database --image mongo --dns-name-label red-database --ports 27017

az container create --resource-group Hito6 --name app --image antojavi94/app:1.0 --dns-name-label red-app --ports 27017 80
