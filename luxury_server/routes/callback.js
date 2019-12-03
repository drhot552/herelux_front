module.exports = function(conn){
    var express = require('express');
    const router = express.Router();  //router하는 객체를 추출
    //개발
    //var client_id = 'qb4UvpZbIcIPB7AeHsg5';
    //var client_secret = 'kzt0l5bWRZ';
    //운영
    var client_id = 'Vwg5qvZi4T3pagL1ZASv';
    var client_secret = 'SVmJMveeTU';

    var api_url = "";
    //카테고리 set
    router.post('/', function(req, res){
      var code = req.body.code;
      var state = req.body.state;
      api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
       + client_id + '&client_secret=' + client_secret + '&code=' + code + '&state=' + state;
      var request = require('request');
      var options = {
          url: api_url,
          headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
       };
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
          res.end(body);
        } else {
          res.status(response.statusCode).end();
          console.log('error = ' + response.statusCode);
        }
      });
    })
    router.post('/member', function (req, res) {
     var api_url = 'https://openapi.naver.com/v1/nid/me';
     var request = require('request');
     var token = req.body.token;
     var header = "Bearer " + token; // Bearer 다음에 공백 추가
     var options = {
         url: api_url,
         headers: {'Authorization': header}
      };
     request.get(options, function (error, response, body) {
       if (!error && response.statusCode == 200) {
         res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
         res.end(body);
       } else {
         console.log('error');
         if(response != null) {
           res.status(response.statusCode).end();
           console.log('error = ' + response.statusCode);
         }
       }
     });
   });
   router.post('/naverlogin', function (req, res) {

   });
    return router;
}
