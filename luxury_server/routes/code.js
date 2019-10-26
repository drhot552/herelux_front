module.exports = function(conn){
    const express = require('express');
    const router = express.Router();  //router하는 객체를 추출

    //카테고리 set
    router.get('/:category', function(req, res){
      const category = req.params.category;

      var sql =`select minor_key, descript
                  from luxury.code
                  where major_key = ?
                  and minor_key > -1`;
      //category가 전체일때 부 카테고리 조회 (상품조회 시)
      if(category == 99){
        sql = `select minor_key, descript
                    from luxury.code
                    where major_key between 11 and ?
                    and minor_key > -1`;
      }

      conn.query(sql,[category], function(err, data){
        if(err){
          res.json(500);
        } else {
          console.log(data);
          res.json(data);
        }
      })
    })
    //브랜드 네임
    router.get('/forum/:major_key', function(req, res){
      const major_key = req.params.major_key;

      var sql =`select minor_key, descript, sub_descript
                  from luxury.code
                  where major_key = ?
                  and minor_key > -1
                  order by descript`;


      conn.query(sql,[major_key], function(err, data){
        if(err){
          res.json(500);
        } else {
          console.log(data);
          res.json(data);
        }
      })
    })
    return router;
}
