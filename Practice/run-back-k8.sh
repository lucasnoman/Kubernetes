if [ "$1" == "run" ]; then
  kubectl apply -f teste-back-pod.yml
  kubectl apply -f teste-back-svc.yml
  kubectl apply -f teste-back-configMap.yml
fi

if [ "$1" == "del" ]; then
  kubectl delete -f teste-back-pod.yml
  kubectl delete -f teste-back-svc.yml
  kubectl delete -f teste-back-configMap.yml
fi
