if [ "$1" == "run" ]; then
  kubectl apply -f teste-db-pod.yml
  kubectl apply -f teste-db-svc.yml
  kubectl apply -f teste-db-configMap.yml
fi

if [ "$1" == "del" ]; then
  kubectl delete -f teste-db-pod.yml
  kubectl delete -f teste-db-svc.yml
  kubectl delete -f teste-db-configMap.yml
fi
