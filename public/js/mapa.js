var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];
var pontos;

function initialize() {
    var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);

    var options = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
}

initialize();

function colocarEventos(eventos){
    pontos = eventos
    carregarPontos();
}

function abrirInfoBox(id, marker) {
    if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
        infoBox[idInfoBoxAberto].close();
    }

    infoBox[id].open(map, marker);
    idInfoBoxAberto = id;
}

function carregarPontos() {
    //var pontos = [{"Id":1,"Latitude":-19.212355602107472,"Longitude":-44.20234468749999,"Descricao":"Conteudo do InfoBox 1"},{"Id":2,"Latitude":-22.618827234831404,"Longitude":-42.57636812499999,"Descricao":"Conteudo do InfoBox 2"},{"Id":3,"Latitude":-22.57825604463875,"Longitude":-48.68476656249999,"Descricao":"Conteudo do InfoBox 3"},{"Id":4,"Latitude":-17.082777073226872,"Longitude":-47.10273531249999,"Descricao":"Conteudo do InfoBox 4"},{"Id":5,"Latitude":-22.88936803353243,"Longitude":-47.03139838867173,"Descricao":"Conteudo do InfoBox 5"},{"Id":6,"Latitude":-22.88794472694071,"Longitude":-47.08066520385728,"Descricao":"Conteudo do InfoBox 6"},{"Id":7,"Latitude":-22.899488894308515,"Longitude":-47.06023749999986,"Descricao":"Conteudo do InfoBox 7"},{"Id":8,"Latitude":-22.882132704079144,"Longitude":-47.060530090490715,"Descricao":"Conteudo do InfoBox 8"},{"Id":9,"Latitude":-22.88045235311875,"Longitude":-47.05914315872184,"Descricao":"Conteudo do InfoBox 9"},{"Id":10,"Latitude":-22.87877194865705,"Longitude":-47.05783424072257,"Descricao":"Conteudo do InfoBox 10"}];

    var latlngbounds = new google.maps.LatLngBounds();

    $.each(pontos, function(index, ponto) {

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(ponto.latitudeChuva, ponto.longitudeChuva),
            title: ponto.localChuva,
            icon: 'img/marcador.png'
        });

        var myOptions = {
            content: "<p><b>Local:</b> " + ponto.localChuva + " <br/><b>Data</b>: "+ponto.dataChuva+" <br/> <b>Detalhes:</b> "+ponto.detalhesChuva+"</p>",
            pixelOffset: new google.maps.Size(-150, 0)
        };

        infoBox[ponto._id] = new InfoBox(myOptions);
        infoBox[ponto._id].marker = marker;

        infoBox[ponto._id].listener = google.maps.event.addListener(marker, 'click', function (e) {
            abrirInfoBox(ponto._id, marker);
        });

        markers.push(marker);

        latlngbounds.extend(marker.position);

    });

    var markerCluster = new MarkerClusterer(map, markers);

    map.fitBounds(latlngbounds);



}

