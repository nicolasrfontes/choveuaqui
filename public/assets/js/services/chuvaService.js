angular.module('chuvaService', [])

    .factory('Chuvas', ['$http',function($http) {
        return {
            retornarTodosEventos : function() {
                return $http.get('/retornarTodosEventos');
            },
            salvarNovoEvento : function(todoData) {
                todoData.localChuva = document.getElementById('txtEndereco').value;
                todoData.latitudeChuva = document.getElementById('txtLatitude').value;
                todoData.longitudeChuva = document.getElementById('txtLongitude').value;
                return $http.post('/registrarEvento', todoData);
            },
            enviarContato : function(todoData) {
                document.getElementById('msg').style.display='block';
                document.getElementById('botao').style.display='none';
                return $http.post('/enviarContato', todoData);
            }
        }
    }]);