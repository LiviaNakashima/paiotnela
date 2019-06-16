// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/entrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    }
    return banco.sql.query(`select * from Usuario where email='${login}' and senha='${senha}'`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length==1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.post('/cadastrar', function (req, res, next) {

 // var nome;
  var login;
  var senha;
  var nome;
  var telefone;
  var cpf;
  var sexo;
  var data;
  var cep;
  var zona;
  var endereco;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    nome = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário de login
    telefone = req.body.telefone;
    cpf = req.body.cpf;
    cep = req.body.cep;
    endereco = req.body.endereco;
    zona = req.body.zona;
    data = req.body.data_nasc;
    sexo = req.body.sexo;
    login = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
    senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined ) {
	  // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados de cadastro não chegaram completos: ${login} / ${senha} `);
    }
    return banco.sql.query(`select count(*) as contagem from Usuario where email = '${login}'`);
  }).then(consulta => {

	if (consulta.recordset[0].contagem >= 1) {
		res.status(400).send(`Já existe usuário com o login "${login}"`);
		return;
    } else {
		console.log('válido!');
		cadastro_valido = true;
	}

  }).catch(err => {

    var erro = `Erro no cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
	  if (cadastro_valido) {		  
			  
		banco.sql.query(`insert into Usuario (nome_usuario, dt_nascimento, cpf, cep, endereco, zona, telefone, email, senha, sexo) values ('${nome}','${data}','${cpf}','${cep}','${endereco}','${zona}','${telefone}','${login}','${senha}','${sexo}')`).then(function() {
			console.log(`Cadastro criado com sucesso!`);
			res.sendStatus(201); 
			// status 201 significa que algo foi criado no back-end, 
				// no caso, um registro de usuário ;)		
		}).catch(err => {

			var erro = `Erro no cadastro: ${err}`;
			console.error(erro);
			res.status(500).send(erro);

		}).finally(() => {
			banco.sql.close();
		});
	  }
  });
  

});

router.post('/cadastro_receita', function (req, res, next) {

  // var nome;
   var nome;
   var quantidade;
   var minimo;
   var maximo;
   var preparo;
   var foto;
     var cadastro_valido = false;
 
   banco.conectar().then(() => {
     console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
     nome = req.body.nome_receita; // depois de .body, use o nome (name) do campo em seu formulário de login
     quantidade = req.body.quantidade;
     minimo = req.body.temp_minima;
     maximo = req.body.temp_maxima;
     preparo = req.body.modo_preparo;
     foto = req.body.foto;
     if (nome == undefined ) {
     // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
       throw new Error(`Dados de cadastro não chegaram completos: ${nome} `);
     }
     return banco.sql.query(`select count(*) as contagem from Receita where nome_receita = '${nome}'`);
   }).then(consulta => {
 
   if (consulta.recordset[0].contagem >= 1) {
     res.status(400).send(`Já existe essa receita com o nome "${nome}"`);
     return;
     } else {
     console.log('válido!');
     cadastro_valido = true;
   }
 
   }).catch(err => {
 
     var erro = `Erro no cadastro: ${err}`;
     console.error(erro);
     res.status(500).send(erro);
 
   }).finally(() => {
     if (cadastro_valido) {		  
         
     banco.sql.query(`insert into Receita (nome_receita, quantidade, temp_minima, temp_maxima, modo_preparo, imagem) values ('${nome}','${quantidade}','${minimo}','${maximo}','${preparo}','${foto}')`).then(function() {
       console.log(`Cadastro criado com sucesso!`);
       res.sendStatus(201); 
       // status 201 significa que algo foi criado no back-end, 
         // no caso, um registro de usuário ;)		
     }).catch(err => {
 
       var erro = `Erro no cadastro: ${err}`;
       console.error(erro);
       res.status(500).send(erro);
 
     }).finally(() => {
       banco.sql.close();
     });
     }
   });
   
 
 });
 

// não mexa nesta linha!
module.exports = router;
