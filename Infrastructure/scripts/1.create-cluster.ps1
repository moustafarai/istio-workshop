$resourcegroup="DV-AKS-RG"
$clusterAks="akscluster"

az login
az group create --name $resourcegroup --location westeurope
az aks create --resource-group $resourcegroup --name $clusterAks --node-count 3 --enable-addons monitoring --generate-ssh-keys

az aks get-credentials -n $akscluster -g $resourcegroup
