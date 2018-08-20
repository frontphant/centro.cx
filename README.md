# centro.cx

Criado no centro de São Paulo. [Licenciado em Creative Commons](https://github.com/egermano/centro.cx/blob/master/LICENSE)


## Configurando ambiente de desenvolvimento

### Pré-requisitos:

* Ruby 2.0.0
* Node.js 0.8+

#### RVM - Ruby version manager

Esse projeto funcina melhor com a ajuda do *RVM*. Para instalar siga [essas instruções](https://rvm.io/rvm/install).

### Instalação

```bash
$ bundle install
$ npm install
```
Essas instruções vão instalar todas as depedências do `Ruby`, `Node.js` e do `Bower`.

## Executando 

Existem alguns scripts pré-configurados no arquivo [package.js](./package.json), existem ainda outras tasks acionadas pelo bower que estão no arquivo [Gruntfile.js](./Gruntfile.js).

Para iniciar o ambiente local: 

```bash
$ npm start
```


