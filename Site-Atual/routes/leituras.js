// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 5;
    return banco.sql.query(`select top ${limite_linhas}
                            temp_sensor,
                            umid_sensor,
                            FORMAT(data_hora,'HH:mm:ss') as momento 
                            from Evento order by id_evento desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});




router.get('/receitas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 5;
    return banco.sql.query(`select
                            nome_receita as nome,
                            quantidade as qnt,
                            temp_minima as min,
                            temp_maxima as max,
                            modo_preparo as modo,
                            imagem as foto                        
                            from Receita order by nome_receita`);
  }).then(consulta => {

    console.log(`Resultado da consulta:  ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.get('/estatisticas', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temp_maxima: 0, 
    temp_minima: 0, 
    temp_media: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select 
          max(temp_sensor) as temp_maxima, 
          min(temp_sensor) as temp_minima, 
          avg(temp_sensor) as temp_media 
        from Evento
        `);
  }).then(consulta => {
    estatisticas.temp_maxima = consulta.recordset[0].temp_maxima;
    estatisticas.temp_minima = consulta.recordset[0].temp_minima;
    estatisticas.temp_media = consulta.recordset[0].temp_media;
    console.log(`Estatísticas: ${estatisticas}`);
    res.send(estatisticas);
  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.get('/tempo-real', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temperatura: 0,
    umidade: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select top 1 temp_sensor, umid_sensor from Evento order by id_evento desc
        `);
  }).then(consulta => {

    estatisticas.temperatura = consulta.recordset[0].temp_sensor;
    estatisticas.umidade = consulta.recordset[0].umid_sensor;
    console.log(`Tempo real: ${JSON.stringify(estatisticas)}`);

    res.send(estatisticas);

  }).catch(err => {

    var erro = `Erro na leitura dos Evento de tempo real: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});

router.get('/temporealmedia', (req, res, next) => {
  console.log(banco.conexao);
  banco.conectar().then(pool => {
      return pool.request().query(`select top 1 
                            temp_sensor,
                            umid_sensor,
                            FORMAT(data_hora,'HH:mm:ss') as momento
                            from Evento order by data_hora desc;`);
  }).then(consulta => {
      console.log(`Resultado da consulta : ${JSON.stringify(consulta.recordset)}`);
      res.send(consulta.recordset);
  }).catch(err => {
      var erro = `Erro na leitura dos últimos registros: ${err}`;
      console.error(erro);
      res.status(500).send(erro);

  }).finally(() => {
      banco.sql.close();
  });

})




// não mexa nesta linha!
module.exports = router;
