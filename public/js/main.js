var choveuaqui = angular.module('choveuaqui', []);

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
    }
    $scope.novoEvento.localChuva = document.getElementById('txtEndereco').value;
    $scope.salvarNovoEvento = function(){
        $scope.novoEvento.localChuva = document.getElementById('txtEndereco').value;
        $scope.novoEvento.latitudeChuva = document.getElementById('txtLatitude').value;
        $scope.novoEvento.longitudeChuva = document.getElementById('txtLongitude').value;
        console.log($scope.novoEvento);
    };
});