# Istio - Workshop

Dans un précedent article nous avons pu voir ensemble une introduction à Istio. 
Voir par la théorie ce que peut apporter ce service mesh.

Aujourd'hui nous allons nous pencher sur des quelques cas pratiques.

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

- La mise en place d'istio
- Comment mettre en place une stratégie de routing dans votre application


## Création d'un Cluster AKS

Commencons par la création d'un cluster AKS via ce script.
Ce cluster AKS que nous allons déployer n'est pas ready to prod.
Cette configuration minimaliste n'est déstiné que pour cette démo.

```powershell
$resourcegroup="DV-AKS-RG"
$clusterAks="akscluster"

az login
az group create --name $resourcegroup --location westeurope
az aks create --resource-group $resourcegroup --name $clusterAks --node-count 3 --enable-addons monitoring --generate-ssh-keys

az aks get-credentials -n $akscluster -g $resourcegroup
```
Bilan : nous avons créer un cluster dans un ressource group et nous avons injecter la config de notre cluster sur notre machine. 
A partir de la nous pouvons dores et déja faire des appels kubectl sur notre nouveau cluster.

## Installation d'Istio

Cette étapes consiste à effectuer l'installation d'istio sur notre cluster.
Nous allons commencer par télécharger le CLI IstioCtl et l'ajouter au path de notre environment :

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

Istio fourni un operateur pour gérer ses installations et ses mises à jour dans le cluster.
Nous l'installons via cette commande:

```powershell
istioctl operator init
``` 

Nous devons ajouter un namespace afin de faire les choses proprement et installer istio dans son propre namespace

```powershell
kubectl create ns istio-system
```

Nous allons créer le fichier istio.aks.yaml qui décrit les specifications de l'opérateur Istio afin d'ajouter des composants utiles (grafana,prometheus,kiali)

```yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  namespace: istio-system
  name: istio-control-plane
spec:
  # Use the default profile as the base
  # More details at: https://istio.io/docs/setup/additional-setup/config-profiles/
  profile: default
  # Enable the addons that we will want to use
  addonComponents:
    grafana:
      enabled: true
    prometheus:
      enabled: true
    tracing:
      enabled: true
    kiali:
      enabled: true
  values:
    global:
      # Ensure that the Istio pods are only scheduled to run on Linux nodes
      defaultNodeSelector:
        beta.kubernetes.io/os: linux
    kiali:
      dashboard:
        auth:
          strategy: anonymous
``` 

Et enfin nous déployons la configuration de l'opérateur istio sur le cluster.

```powershell
kubectl apply -f istio.aks.yaml
``` 


## Quelques définitions

Avant de rentrer dans le vif du sujet voici une liste de definition de concept Istio:

| Concept | Definition |
| -- | -- |
| Gateways | La gateway est la passerelle de notre service mesh. Elle permet de controler le trafic entrant et sortant de notre service mesh.|
|Virtual Service| Un Virtual Service se compose d'un ensemble de règles de routage qui sont évaluées dans l'ordre, permettant à Istio de faire correspondre chaque demande donnée au service virtuel à une destination réelle spécifique dans le maillage|
|Destination Rule||


## Notre Application

Nous allons travailler sur une application simpliste :
Une application React qui appelle 4 webapi net core.
Les sources sont disponible sur github : [lien](https://github.com/moustafarai/istio-workshop)

![schéma](.\pictures\monapplication.png)

## Scénario 1 Starter 




## Scénario 2 Traffic Shiffting

## Scénario 3 Traffic conditionné




