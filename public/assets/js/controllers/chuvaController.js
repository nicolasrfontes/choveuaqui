angular.module('chuvaController', [])
    .controller('eventos', ['$scope','$http','Chuvas', function($scope, $http, Chuvas) {
        $scope.novoEvento = {
            nome:'',
            email:'',
            estado:'',
            cidade:'',
            dataChuva:'',
            detalhesChuva:'',
            localChuva:'',
            latitudeChuva:'',
            longitudeChuva:''
        };
        $scope.contato = {
            nome:'',
            email:'',
            telefone:'',
            mensagem:''
        }
        Chuvas.retornarTodosEventos()
            .success(function(retorno){
                if (retorno.status==0){
                    alert(retorno.resposta);
                }else{
                    colocarEventos(retorno.objetos);
                }
            })
        function salvarNovoEvento(){
            Chuvas.salvarNovoEvento($scope.novoEvento)
                .success(function(retorno){
                    if (retorno.status==0){
                        $scope.resposta = retorno.resposta;
                    }else{
                        location.href = 'registrosucesso.html';
                    }
                })
        }
        function enviarContato(){
            Chuvas.enviarContato($scope.contato)
                .success(function(retorno){
                    $scope.resposta = retorno;
                    document.getElementById('msg').style.display='none';
                    document.getElementById('botao').style.display='block';
                })
        }
    }]);