if [ "$1" == "run" ]; then
  kubectl apply -f teste-front-pod.yml
  kubectl apply -f teste-front-svc.yml
  kubectl apply -f teste-front-configMap.yml
fi

if [ "$1" == "del" ]; then
  kubectl delete -f teste-front-pod.yml
  kubectl delete -f teste-front-svc.yml
  kubectl delete -f teste-front-configMap.yml
fi
