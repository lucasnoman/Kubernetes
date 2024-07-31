Quando POD do DB está como ClusterIP, consigo conectar meu back-end que está como NodePort.
Para isso, devo usar no back-end, o IP Cluster do DB para me conectar. A porta é a definida pelo BD mesmo, no caso do PG: 5432.

Para fazer a conexão entre o front-end local e o back-end no POD como NodePort, é preciso colocar o host do back-end como `0.0.0.0` em vez de `localhost`.

Para que o browser do front-end se comunique com o back-end que está no POD, é preciso que esse back esteja como NodePort, para que seu acesso seja feito a partir de interfaces fora do POD (browser).

Comando para rodar tudo:

```bash
# Primeiro fazer o deploy do Dockerfile do back e front
sudo docker build -t lucasnoman/front-teste:v1 .

# Subir a imagem para algum registry para o K8S conseguir baixar
docker push lucasnoman/front-teste:v1


./run-db-k8.sh run  # Roda isso e pega o ClusterIP dele para usar no configMap do back-end
./run-back-k8.sh run
./run-front-k8.sh run
```
