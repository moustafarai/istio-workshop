istioctl operator init
istioctl profile dump default
kubectl create ns istio-system
kubectl apply -f istio.aks.yaml