#!/bin/bash
docker build -t allotr-react-frontend .
docker tag allotr-react-frontend rafaelpernil/allotr-react-frontend
docker push rafaelpernil/allotr-react-frontend

kubectl apply -f ./artifacts/deployment.yaml
kubectl apply -f ./artifacts/service.yaml

kubectl scale --replicas=0 deployment allotr-react-frontend -n openfaas-fn
kubectl scale --replicas=2 deployment allotr-react-frontend -n openfaas-fn