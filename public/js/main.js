var choveuaqui = angular.module('choveuaqui', []);

var url = 'http://localhost:3003/';

choveuaqui.controller('eventos', function($scope,$http){
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
    $scope.salvarNovoEvento = function(){
        $scope.novoEvento.localChuva = document.getElementById('txtEndereco').value;
        $scope.novoEvento.latitudeChuva = document.getElementById('txtLatitude').value;
        $scope.novoEvento.longitudeChuva = document.getElementById('txtLongitude').value;
        console.log($scope.novoEvento);
        $http.post(url+'registrarEvento',$scope.novoEvento)
            .success(function(retorno){
                if (retorno.status==0){
                    $scope.resposta = retorno.resposta;
                }else{
                    location.href = 'registrosucesso.html';
                }
            })
    };
    $scope.retornarTodosEventos = function(){
        $http.get(url+'retornarTodosEventos')
            .success(function(retorno){
                if (retorno.status==0){
                    alert(retorno.resposta);
                }else{
                    colocarEventos(retorno.objetos);
                }
            })
    };
    $scope.enviarContato = function(){
        document.getElementById('msg').style.display='block';
        document.getElementById('botao').style.display='none';
        $http.post(url+'enviarContato', $scope.contato)
            .success(function(retorno){
                $scope.resposta = retorno
                document.getElementById('msg').style.display='none';
                document.getElementById('botao').style.display='block';
            })
    };
});