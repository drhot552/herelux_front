module.exports = function(conn){
    const express = require('express');
    const moment  = require("moment");
    const date = require('../module/date');
    const db = require('../module/db_query');

    const router = express.Router();  //router하는 객체를 추출

    //favorite 랜덤으로
    router.get('/:user', function(req, res){
      let user = req.params.user;
      //code b-> 대카테고리, code c->중카테고리
      const sql = `
      select id, name, category_large, b.descript category_large_name, category_middle, size, color, price
            from luxury.product a, luxury.code b
            where id not in (select id from luxury.productlist where userid = ?)
            and b.major_key = 1
            and a.category_large = b.minor_key
            order by rand() limit 1
            `;
      let select_query = db.query(conn, sql, user);
      select_query.then((data)=>{
        if(!data){
          res.json(501)
        } else{
          res.json(data);
        }
      })
    })
    //product imageget
    router.get('/image/:id', function(req, res){
      var product_id = req.params.id;
      const sql = `
        select url, source
        from luxury.productimg
        where product_id = ?
      `;
      let select_query = db.query(conn, sql, product_id);
      select_query.then((data)=>{
        if(!data){
          res.json(501)
        } else{
          res.json(data);
        }
      })
    })
    //상품상세 detail
    router.get('/detail/:id', function(req,res){
      let id = req.params.id;

      const sql = ` select id, a.category_large, c.descript as category_large_name, a.sub_name sub_name, category_middle,
                           d.descript category_middle_name, name,
                           size, color, price, star, url, count
        					  from luxury.product a, luxury.productimg b, luxury.code c, luxury.code d
        					  where a.id = b.product_id
        					  and c.major_key = 1
        					  and a.category_large = c.minor_key
        					  and d.major_key = a.category_large * 10 + 1
        					  and a.category_middle = d.minor_key
        					  and a.id = ?
                    `;
      let select_query = db.query(conn, sql, id);
      select_query.then((data)=>{
        if(!data){
          res.json(501)
        } else{
          res.json(data);
        }
      })
    })
    //상품 category select
    router.get('/ranking/:category/:key/:page', function(req,res){
      var key = req.params.key;
      var page = req.params.page;
      var category = req.params.category;
      var idx = parseInt(page);
      var startidx = idx * 20;
      var lastidx = 100;
      var range = 0;
      var sql = '';

      //전체일때
      if(key != 99){
        range = key;
      }
      //대 카테고리
      if(category == 1)
      {
        sql = `select id, descript as category_large_name, name, size, color, avg, url
                      from (
              						select @rownum:=@rownum+1 num, id, descript, name, size, color, avg, url
              						from (
              							select  a.id id, c.descript, a.name, a.size, a.color, a.price, round(a.star/a.count,2) avg, b.url
              							from luxury.product a, luxury.productimg b, luxury.code c, (select @rownum := 0) d
              							where a.id = b.product_id
                            and c.major_key = 1
                            and a.category_large = c.minor_key
                            and a.category_large between ? and ?
                            and a.star > 0
              							order by round(a.star/a.count,2) desc
              						) a
                      ) b
                      where b.num > ? and b.num <= ?
                    `;
      }
      //중카테고리
      else if(category == 2){
        sql =  `select id, descript as category_large_name, name, size, color, avg, url
                      from (
              						select @rownum:=@rownum+1 num, id, descript, name, size, color, avg, url
              						from (
              							select  a.id id, c.descript, a.name, a.size, a.color, a.price, round(a.star/a.count,2) avg, b.url
              							from luxury.product a, luxury.productimg b, luxury.code c, (select @rownum := 0) d
              							where a.id = b.product_id
                            and c.major_key = 1
                            and a.category_large = c.minor_key
                            and a.category_middle between ? and ?
                            and a.star > 0
              							order by round(a.star/a.count,2) desc
              						) a
                      ) b
                      where b.num > ? and b.num <= ?
                    `;
      }
      else {
        res.json(501);
      }
      let select_query = db.query(conn, sql, [range,key,startidx,lastidx]);
      select_query.then((data)=>{
        if(!data){
          res.json(501)
        } else{
          res.json(data);
        }
      })

    })

    //mylist
    router.get('/mylist/:id/:page/:category/:key', function(req, res){
      var userid = req.params.id;
      var page = req.params.page;
      var category = req.params.category;
      var key = req.params.key;

      var idx = parseInt(page);
      var startidx = idx * 20;
      var lastidx = (idx + 1) * 20;
      var range = 0;
      var sql = ``;
      //전체
      if(key != 99){
        range = key;
      }

      if(category == 1){
        sql = `
        select id, userid, name, size, color, price,star,url
        from
        (
          select @rownum:=@rownum+1 num, a.id id, b.userid, a.name, a.size, a.color, a.price, a.star, c.url
  						  from luxury.product a, luxury.productlist b, luxury.productimg c, (select @rownum := 0) d
  						  where b.userid = ?
  						  and a.id = b.id
                and a.id = c.product_id
                and a.category_large between ? and ?
  						  and b.star >= 4
        ) a
        where a.num > ? and a.num <= ?
        `
      }
      else if(category == 2){
        sql = `
        select id, userid, name, size, color, price,star,url
        from
        (
          select @rownum:=@rownum+1 num, a.id id, b.userid, a.name, a.size, a.color, a.price, a.star, c.url
  						  from luxury.product a, luxury.productlist b, luxury.productimg c, (select @rownum := 0) d
  						  where b.userid = ?
  						  and a.id = b.id
                and a.id = c.product_id
                and a.category_middle between ? and ?
  						  and b.star >= 4
        ) a
        where a.num > ? and a.num <= ?
        `
      }
      let select_query = db.query(conn, sql, [userid,range, key, startidx,lastidx]);
      select_query.then((data)=>{
        if(!data){
          res.json(501)
        } else{
          res.json(data);
        }
      })

    })
    //product detail
    router.get('/detailbrand/:product_id', function(req, res){
      var product_id  = req.params.product_id;

      const sql = `select  a.url, a.shopping_mall, a.price, b.logoimgurl, a.price_symbol
                   from luxury.productmall a, luxury.user b
                   where a.product_id = ?
                   and a.shopping_mall = b.index`;

       let select_query = db.query(conn, sql, [product_id]);
       select_query.then((data)=>{
         if(!data){
           res.json(500)
         } else{
           res.json(data);
         }
       })
    })
    //상품을 클릭했을때
    router.get('/productcnt/:userid/:product_id', function(req, res){
      var product_id = req.params.product_id;
      var userid = req.params.userid;
      //내가 선택한 상품인지 아닌지 체크
      const sql  = `select count(*) cnt
                    from luxury.productcnt
                    where product_id = ?
                    and userid = ?`;

      let select_query = db.query(conn, sql, [product_id, userid]);
      select_query.then((data)=>{
        if(!data){
          res.json(500)
        } else{
          let product_date = moment().format("YYYY-MM-DD");
          let product_time = date.time();

          if(data[0].cnt == 0) {
            const  sql_insert = `insert into  luxury.productcnt(product_id, userid, count, reg_date, reg_time)
                                values (?,?,?,?,?)`;
            let insert_query = db.query(conn, sql_insert, [product_id, userid, 0, product_date, product_time]);
            insert_query.then((data)=>{
              if(!data){
                res.json(500)
              } else {
                res.json(200);
              }
            });
          } else {
            const sql_update = `update luxury.productcnt
                                set count = count + 1, upd_date = ? , upd_time = ?
                                where product_id = ?
                                and userid = ? `;
            let update_query = db.query(conn, sql_update, [product_date, product_time, product_id, userid]);
            update_query.then((data)=>{
              if(!data){
                res.json(500)
              } else {
                res.json(200);
              }
            })
          }
        }
      })
    })
    //favorite 리스트
    router.post('/list', function(req, res){
      var id = req.body.id;
      var user = req.body.user;
      var rating = req.body.rating;
      //insert 후 select
      const sql = `Insert into luxury.productlist(id,userid,star) values (?,?,?)`
      const insert_query = db.query(conn, sql, [id,user,rating]);
      insert_query.then((data)=>{
        if(!data){
          res.json(500);
        } else {
          const sql_update = `update luxury.product
                              set star =  star + ?, count = count + 1
                              where id = ?`;
          const update_query = db.query(conn, sql_update, [id,user,rating]);
          update_query.then((data)=>{
            if(!data){
              res.json(502)
            } else {
              const sql_select = `select a.id, a.name, b.descript, a.category_middle, a.size, a.color, a.price, c.url, c.source
                                  from luxury.product a, luxury.productimg c, luxury.code b
                                  where a.id not in (select id from  luxury.productlist where userid = ?)
                                  and a.id = c.product_id
                                  and a.category_large = b.minor_key
                                  and b.major_key = 1
                                  order by rand() limit 1`;
              const select_query = db.query(conn, sql_select, user);
              select_query.then((data)=>{
                if(!data){
                  //select error
                  res.json(501);
                } else {
                  res.json(data);
                }
              })
            }
          });
        }
      })
    })
    return router;
}
