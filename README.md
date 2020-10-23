# Istio - Workshop

Dans un précedent article nous avons pu voir ensemble une introduction à Istio. 
Voir par la théorie ce que peut apporter ce service mesh.

Aujourd'hui nous allons nous pencher sur des cas pratiques.

Pré-requis :

- Helm : 

    ```powershell
    choco install kubernetes-helm
    ```
- kubectl:

    ```powershell
    choco install kubernetes-cli
    ```

- az cli: 

    ```powershell
    choco install azure-cli
    ```
- Lens : Kubernetes IDE [lien](https://github.com/lensapp/lens/releases/latest)


Nous allons aborder ces differents sujets :

- Création d'un Cluster AKS
- L'Installation d'Istio
- Utilisation de Lens
- Qu'est ce qu'une Gateways ?
- Qu'est ce qu'un Virtual Service ?
- Qu'est ce qu'une Destination rule ?
- Scénario 1 Routing 
- Scénario 2 Repartir le traffic
- Scénario 3 Simuler une injection d'Erreur
- Scénario 4 Simuler un TimeOut



## Création d'un Cluster AKS

Commencons par la création d'un cluster AKS via ce script

```powershell
$resourcegroup="DV-AKS-RG"
$clusterAks="akscluster"

az login
az group create --name $resourcegroup --location westeurope
az aks create --resource-group $resourcegroup --name $clusterAks --node-count 3 --enable-addons monitoring --generate-ssh-keys

az aks get-credentials -n $akscluster -g $resourcegroup
```
Ce script nous a permis d'effectuer la création du cluster dans un ressource group et d'injecter la config de votre cluster en local. 

## Installation d'Istio

Cette étapes consiste à effectuer l'installation d'istio sur notre cluster.
Nous allons commencer par le télécharger du CLI (IstioCtl) et l'ajouter au path de votre environment :

```powershell
$ISTIO_VERSION="1.7.3"

[Net.ServicePointManager]::SecurityProtocol = "tls12"
$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -URI "https://github.com/istio/istio/releases/download/$ISTIO_VERSION/istioctl-$ISTIO_VERSION-win.zip" -OutFile "istioctl-$ISTIO_VERSION.zip"
Expand-Archive -Path "istioctl-$ISTIO_VERSION.zip" -DestinationPath .

New-Item -ItemType Directory -Force -Path "C:\Istio"
Move-Item -Path .\istioctl.exe -Destination "C:\Istio\"

$USER_PATH = [environment]::GetEnvironmentVariable("PATH", "User") + ";C:\Istio\"
[environment]::SetEnvironmentVariable("PATH", $USER_PATH, "User")
$env:PATH += ";C:\Istio\"
```

Nous ajoutons l'opérateur istio sur le cluster:

```powershell
istioctl operator init
``` 

Nous devons ajouter un namespace afin de faire les choses proprement et installer istio dans son propre namespace

```powershell
kubectl create ns istio-system
```
Et enfin nous déployons istio sur le cluster.

```powershell
kubectl apply -f istio.aks.yaml
``` 

## Qu'est ce qu'une Gateways ?

## Qu'est ce qu'un Virtual Service ?
## Qu'est ce qu'une Destination rule ?
## Scénario 1 Routing 
## Scénario 2 Repartir le traffic
## Scénario 3 Simuler une injection d'Erreur
## Scénario 4 Simuler un TimeOut




