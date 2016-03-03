exports.enviarContato = function(req,res){
    /////validar campos
    if ((req.body.nome=='')||(req.body.email=='')||(req.body.mensagem=='')){
        res.send('Há campos obrigatórios em branco!')
    }else{
        /////colocar funcionalidade de e-mail
        res.send('Seu contato foi enviado! Em breve te retornarei :)')
    }
};