var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/choveuaqui", {native_parser: true});////TROCAR IP QUANDO SUBIR PARA SERVIDOR

exports.registrarEvento = function(req,res){
    //validar campos em branco
    if ((req.body.cidade=='')||(req.body.dataChuva=='')||
        (req.body.detalhesChuva=='')||(req.body.email=='')||
        (req.body.estado=='')||(req.body.latitudeChuva=='')||
        (req.body.localChuva=='')||(req.body.longitudeChuva=='')||
        (req.body.nome=='')){
        res.send({status:0,resposta:'Todos os campos são obrigatórios'});
    }else{
        //validar data futura
        var dataHoje = new Date();
        var diaH = dataHoje.getDate();
        if (diaH<9){diaH='0'+diaH;}
        var mesH = dataHoje.getMonth()+1;
        if (mesH<9){mesH='0'+mesH;}
        dataHoje = dataHoje.getFullYear()+mesH+diaH;
        var dataEvento = req.body.dataChuva.charAt(6)+req.body.dataChuva.charAt(7)+req.body.dataChuva.charAt(8)+req.body.dataChuva.charAt(9)+
        req.body.dataChuva.charAt(3)+req.body.dataChuva.charAt(4)+req.body.dataChuva.charAt(0)+req.body.dataChuva.charAt(1);
        if (dataEvento>dataHoje){
            res.send({status:0,resposta:'Você não pode registrar um evento futuro!'});
        }else{
            req.body['dataPostagem'] = dataHoje;
            db.collection('eventos').insert(req.body,function(err,ev){
                if (err){
                    /////Enviar e-mail de erro
                    res.send({status:0,resposta:'Erro em nosso servidor. Tente novamente mais tarde'});
                }else{
                    res.send({status:1});
                }
            })
        }
    }
};

exports.retornarTodosEventos = function(req,res){
    db.collection('eventos').find().toArray(function(err,events){
        if (err){
            /////Enviar e-mail de erro
            res.send({status:0,resposta:'Erro em nosso servidor. Tente novamente mais tarde'});
        }else{
            delete req.body.nome;
            delete req.body.email;
            delete req.body.estado;
            delete req.body.cidade;
            delete req.body.dataPostagem;
            res.send({status:1,objetos:events});
        }
    })
};

