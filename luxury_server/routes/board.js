module.exports = function(conn){
    const express = require('express');
    const router = express.Router();  //router하는 객체를 추출
    let multer = require("multer");
    let multerS3 = require('multer-s3-transform');
    let moment  = require("moment");
    let mysql = require('mysql');
    let sharp = require('sharp');

    /* AWS 이미지 처리 부분 */
    let AWS = require("aws-sdk");
    AWS.config.region = 'ap-northeast-2';

    let validate = require('../module/validate');

    var imgname="";
    var brands_name="";
    const maxSize = 2 * 1024 * 1024;

    //bucket name 운영
    const bucketname  = 'hereluxuryboard';
    //bucket name 개발
    //const bucketname  = 'luxuryboard';
    let s3 = new AWS.S3({params: {Bucket:bucketname}});

    //이미지 업로드 필드 두개
    var upload = multer({
      storage: multerS3({
         s3: s3,
         dirname: '/' + brands_name,
         bucket: bucketname,
         cacheControl: 'max-age=31536000',
         acl: 'public-read-write',
         limits: {
            fileSize: maxSize,
            files: 2
         },
         ContentType:'',
         storageClass: 'REDUCED_REDUNDANCY',
         shouldTransform: function (req, file, cb) {
             console.log("transforms key123333");
             cb(null, /^image/i.test(file.mimetype))
         },
         transforms: [{
               key: function (req, file, cb) {
                   //let extension = path.extname(file.originalname);
                   //imgname = file.originalname;
                   console.log("transforms key");
                   imgname = moment().format("YYYY-MM-DD") + moment().hours() + "-"  + moment().minute() + "-"  + file.originalname;
                   console.log(imgname);
                   //console.log("imgname: " + imgname);
                   cb(null, imgname);
               },
               transform: function(req, file, cb) {
                 //Perform desired transformations
                 console.log("transforms key123");
                 cb(null, sharp()
                          .jpeg({ quality: 60, force: false })
                          .png({ compressionLevel: 9, force: false })
                          );
               }
         }]
       })
     });
    //board mylist 리스트 조회
    router.get('/mylist/:id/:boardtype/:page', function(req,res){
      var userid = req.params.id;
      var boardtype = req.params.boardtype;
      var page = req.params.page;
      var idx = parseInt(page);
      var startidx = idx * 20;
      var lastidx = (idx + 1) * 20;
      var range = 0;
      var sql = '';
      console.log("mylist board", userid, boardtype, page, startidx, lastidx);

      if (boardtype == 0) {
        sql = `select a.num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum,
		                  a.views, a.reg_date, a.reg_time, a.upd_date, a.upd_time, a.forum
                from
                (
                	 select @rownum:=@rownum+1 num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum,
                		a.views, a.reg_date, a.reg_time, a.upd_date, a.upd_time, c.descript forum
                                		from luxury.board a, (select @rownum := 0) b, luxury.code c
                                		where a.board_idx in (
                                								select board_idx
                                								from luxury.board
                                								where userid = ?
                                								and boardtype between ? and 99
                                								union all
                                								select b.board_idx
                                								from luxury.comment a, luxury.board b
                                								where a.userid = ?
                                								and a.board_idx = b.board_idx
                                								and b.boardtype between ? and 99
                                								group by b.board_idx
                                								union all
                                								select a.board_idx
                                								from luxury.commentdown a, luxury.board b
                                								where a.userid = ?
                                								and a.board_idx = b.board_idx
                                								and b.boardtype between ? and 99
                                								group by a.board_idx)
                                		and a.boardtype = c.major_key
                                		and a.boardforum = c.minor_key
                                		order by a.board_idx desc
                ) a
                where a.num > ? and a.num <= ?`;
      }
      else if (boardtype < 3){
        sql = `select a.num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum,
		                  a.views, a.reg_date, a.reg_time, a.upd_date, a.upd_time, a.forum
                from
                (
                	 select @rownum:=@rownum+1 num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum,
                		a.views, a.reg_date, a.reg_time, a.upd_date, a.upd_time, c.descript forum
                                		from luxury.board a, (select @rownum := 0) b, luxury.code c
                                		where a.board_idx in (
                                								select board_idx
                                								from luxury.board
                                								where userid = ?
                                								and boardtype = ?
                                								union all
                                								select b.board_idx
                                								from luxury.comment a, luxury.board b
                                								where a.userid = ?
                                								and a.board_idx = b.board_idx
                                								and b.boardtype = ?
                                								group by b.board_idx
                                								union all
                                								select a.board_idx
                                								from luxury.commentdown a, luxury.board b
                                								where a.userid = ?
                                								and a.board_idx = b.board_idx
                                								and b.boardtype = ?
                                								group by a.board_idx)
                                		and a.boardtype = c.major_key
                                		and a.boardforum = c.minor_key
                                		order by a.board_idx desc
                ) a
                where a.num > ? and a.num <= ?`
      }
      else {
        sql = `select a.num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum,
		                  a.views, a.reg_date, a.reg_time, a.upd_date, a.upd_time
                from
                (
                	 select @rownum:=@rownum+1 num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum,
                		a.views, a.reg_date, a.reg_time, a.upd_date, a.upd_time
                                		from luxury.board a, (select @rownum := 0) b
                                		where a.board_idx in (
                                								select board_idx
                                								from luxury.board
                                								where userid = ?
                                								and boardtype = ?
                                								union all
                                								select b.board_idx
                                								from luxury.comment a, luxury.board b
                                								where a.userid = ?
                                								and a.board_idx = b.board_idx
                                								and b.boardtype = ?
                                								group by b.board_idx
                                								union all
                                								select a.board_idx
                                								from luxury.commentdown a, luxury.board b
                                								where a.userid = ?
                                								and a.board_idx = b.board_idx
                                								and b.boardtype = ?
                                								group by a.board_idx)
                                		order by a.board_idx desc
                ) a
                where a.num > ? and a.num <= ?`;
      }
      conn.query(sql, [userid,boardtype,userid,boardtype,userid,boardtype, startidx, lastidx], function(err,data){
        if(err){
          console.log(err);
          throw err;
        }
        else {
          console.log("mylist board data",data);
          res.json(data);
        }
      })
    })
    //board 게시판 리스트 조회
    router.get('/list/:boardtype/:page', function(req, res){
      let boardtype = req.params.boardtype;
      var page = req.params.page;
      var idx = parseInt(page);
      var startidx = idx * 20;
      var lastidx = (idx + 1) * 20;
      var range = 0;
      let sql = '';

      //브랜드 포럼
      // boardtype = 0 전체
      if (boardtype == 0) {
        //이미지 set
        sql = `select b.board_idx, b.userid, b.name, b.subject, b.descript, b.boardtype, b.boardforum, b.views,
                           b.reg_date, b.reg_time, b.upd_date, b.upd_time, b.forum, b.comment, b.img_cnt, b.imgurl
                  from
                    (
                       select @rownum:=@rownum+1 num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum, a.views,
                           a.reg_date, a.reg_time, a.upd_date, a.upd_time, a.forum, a.comment, a.img_cnt, a.imgurl
                       from (
                           select a.board_idx, userid, name, subject, a.descript, boardtype, boardforum, views,
                               reg_date, reg_time, upd_date, upd_time, b.descript forum, c.comment + d.comment comment, e.img_cnt, e.imgurl
                           from luxury.board a, luxury.code b, (select @rownum := 0) f, (select b.board_idx board_idx, count(a.board_idx) comment
                                                         from luxury.board b left outer join luxury.comment a
                                                         on  b.board_idx = a.board_idx
                                                         where b.boardtype between ? and 99
                                                         group by b.board_idx) c,
                              (select b.board_idx board_idx, count(a.board_idx) comment
                              from luxury.board b left outer join luxury.commentdown a
                              on  b.board_idx = a.board_idx
                              where b.boardtype between ? and 99
                              group by b.board_idx) d,
                              (select a.board_idx board_idx, count(b.idx) img_cnt, max(b.imgurl) imgurl
                                from luxury.board a left outer join luxury.boardimg b
                                on a.board_idx = b.idx
                                where a.boardtype between ? and 99
                               group by a.board_idx) e
                           where a.boardtype between ? and 99
                           and a.boardforum = b.minor_key
                           and a.board_idx = c.board_idx
                           and a.board_idx = d.board_idx
                           and a.board_idx = e.board_idx
                           and a.boardtype = b.major_key
                           order by a.board_idx desc
                       ) a
                     ) b
                     where b.num > ? and b.num <= ?`;
      }
      else if(boardtype < 3){
         sql = `select b.board_idx, b.userid, b.name, b.subject, b.descript, b.boardtype, b.boardforum, b.views,
              							b.reg_date, b.reg_time, b.upd_date, b.upd_time, b.forum, b.comment, b.img_cnt, b.imgurl
              		 from
                     (
            						select @rownum:=@rownum+1 num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum, a.views,
            								a.reg_date, a.reg_time, a.upd_date, a.upd_time, a.forum, a.comment, a.img_cnt, a.imgurl
            						from (
              							select a.board_idx, userid, name, subject, a.descript, boardtype, boardforum, views,
              								  reg_date, reg_time, upd_date, upd_time, b.descript forum, c.comment + d.comment comment, e.img_cnt, e.imgurl
              							from luxury.board a, luxury.code b, (select @rownum := 0) f, (select b.board_idx board_idx, count(a.board_idx) comment
              																						from luxury.board b left outer join luxury.comment a
              																						on  b.board_idx = a.board_idx
              																						where b.boardtype = ?
              																						group by b.board_idx) c,
              								 (select b.board_idx board_idx, count(a.board_idx) comment
      												 from luxury.board b left outer join luxury.commentdown a
      												 on  b.board_idx = a.board_idx
      												 where b.boardtype = ?
      												 group by b.board_idx) d,
                               (select a.board_idx board_idx, count(b.idx) img_cnt, max(b.imgurl) imgurl
                                 from luxury.board a left outer join luxury.boardimg b
                                 on a.board_idx = b.idx
                                 where a.boardtype = ?
                                group by a.board_idx) e
              							where a.boardtype = ?
              							and a.boardforum = b.minor_key
              							and a.board_idx = c.board_idx
              							and a.board_idx = d.board_idx
                            and a.board_idx = e.board_idx
              							and a.boardtype = b.major_key
              							order by a.board_idx desc
          						  ) a
                      ) b
                      where b.num > ? and b.num <= ?
                      `;
      }
      else{
        sql = `select b.board_idx, b.userid, b.name, b.subject, b.descript, b.boardtype, b.boardforum, b.views,
              							b.reg_date, b.reg_time, b.upd_date, b.upd_time, b.comment, b.img_cnt, b.imgurl
              		 from
                     (
            						select @rownum:=@rownum+1 num, a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum, a.views,
            								a.reg_date, a.reg_time, a.upd_date, a.upd_time, a.comment, a.img_cnt, a.imgurl
            						from (
              							select a.board_idx, userid, name, subject, a.descript, boardtype, boardforum, views,
              								  reg_date, reg_time, upd_date, upd_time, c.comment, e.img_cnt, e.imgurl
              							from luxury.board a, (select @rownum := 0) f, (select b.board_idx board_idx, count(a.board_idx) comment
              																						from luxury.board b left outer join luxury.comment a
              																						on  b.board_idx = a.board_idx
              																						where b.boardtype = ?
              																						group by b.board_idx) c,
              								 (select b.board_idx board_idx, count(a.board_idx) comment
      												 from luxury.board b left outer join luxury.commentdown a
      												 on  b.board_idx = a.board_idx
      												 where b.boardtype = ?
      												 group by b.board_idx) d,
                               (select a.board_idx board_idx, count(b.idx) img_cnt, max(b.imgurl) imgurl
                                 from luxury.board a left outer join luxury.boardimg b
                                 on a.board_idx = b.idx
                                 where a.boardtype = ?
                                group by a.board_idx) e
              							where a.boardtype = ?
              							and a.board_idx = c.board_idx
              							and a.board_idx = d.board_idx
                            and a.board_idx = e.board_idx
              							order by a.board_idx desc
          						  ) a
                      ) b
                      where b.num > ? and b.num <= ?`;
      }

      conn.query(sql, [boardtype,boardtype,boardtype,boardtype,startidx, lastidx], function(err,data){
        if(err){
          console.log(err);
          throw err;
        }
        else {
          console.log(data.length);
          res.json(data);
        }
      })
    })

    //게시판 건별 조회
    router.get('/select/:board_idx/:board_type', function(req,res){
      let board_idx = req.params.board_idx;
      let board_type = req.params.board_type;
      let sql = '';

      //업데이트 후 에 조회
      let update_sql = 'update luxury.board set views = views + 1 where board_idx = ?'

      if(board_type < 2)
      {
        sql = `select board_idx, userid, name, subject, a.descript descript, boardtype, boardforum, views,
                            reg_date, reg_time, upd_date, upd_time, imgurl,b.descript brand
                     from
                      (
                        select a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum, a.views,
                               a.reg_date, a.reg_time, a.upd_date, a.upd_time, b.imgurl
                        from luxury.board a left outer join luxury.boardimg b
                        on a.board_idx = b.idx
                        where a.board_idx = ?
                      ) a, luxury.code b
                      where a.boardtype = b.major_key
                      and a.boardforum = b.minor_key`
      }
      else{
        sql = ` select a.board_idx, a.userid, a.name, a.subject, a.descript, a.boardtype, a.boardforum, a.views,
                               a.reg_date, a.reg_time, a.upd_date, a.upd_time, b.imgurl
                        from luxury.board a left outer join luxury.boardimg b
                        on a.board_idx = b.idx
                        where a.board_idx = ?`;
      }

      conn.query(update_sql, [board_idx], function(err, data){
        if(err){
          throw err;
        }
        else{
          conn.query(sql, [board_idx], function(err,data){
            if(err){
              throw err;
            }
            else{
              console.log(data)
              res.json(data);
            }
          })
        }
      });

    })
    //board 게시판 삭제
    router.get('/delete/:board_idx',function(req,res){
      //게시판 및 댓글 삭제
      //사진삭제
      let board_idx = req.params.board_idx;
      let board_sql = `delete from luxury.board where board_idx = ?;`;
      let boardimg_sql = `delete from luxury.boardimg where idx = ?;`;
      let comment_sql = `delete from luxury.comment where board_idx = ?;`;
      let commentdown_sql = `delete from luxury.commentdown where board_idx = ?;`;
      var imgName = '';
      //삭제할 이미지를 먼저 select 한다.
      let sql = `select imgurl from luxury.boardimg where idx = ?`;
      console.log("board_idx : ", board_idx);
      conn.query(sql, board_idx, function(err,data){
        if(err){
          console.log(err);
        } else {
          //두개 이미지 삭제
          for(var i = 0; i < data.length; i++) {
            if( data[i].imgurl != null ){
                imgName =  data[i].imgurl.split('/');
                console.log('imgName : ' + imgName[3]);
                var params = {
                    Bucket: 'luxuryboard',
                    Key: imgName[3]
                };

                s3.deleteObject(params, function(err, data){
                  if(err){
                      console.log('s3.deleteObject err: ' + err);
                      throw err;
                  }
                });
            }
          }
          //게시판 삭제
          conn.query(board_sql, board_idx, function(err, data){
            if(err){
              console.log("board_sql error : ", err);
              throw err;
            } else {
            //  res.json(200);
            }
          })
          //게시판 이미지 삭제
          conn.query(boardimg_sql, board_idx, function(err, data){
            if(err){
              console.log("boardimg_sql error : ", err);
              throw err;
            } else {
            //  res.json(200);
            }
          })
          //댓글 삭제
          conn.query(comment_sql, board_idx, function(err, data){
            if(err){
              console.log("comment_sql error : ", err);
              throw err;
            } else {
            //  res.json(200);
            }
          })
          //대댓글 삭제
          conn.query(commentdown_sql, board_idx, function(err, data){
            if(err){
              console.log("commentdown_sql error : ", err);
              throw err;
            } else {
            //  res.json(200);
            }
          })
          res.json(200);
        }
      })

    })
    //board 게시판 이미지 및 글 저장
    router.post('/write', upload.fields([{name:"image_1"},{name:"image_2"}]), function(req, res){
      let imgFile = req.files;
      let userid = req.body.userid;
      let subject = req.body.subject;
      let descript = req.body.descript;
      let boardforum = req.body.boardforum;
      let boardtype = req.body.boardtype;


      //자바스크립트 날짜 시간 set
      let reg_date = moment().format("YYYY-MM-DD");
      let hour = moment().hours();
      let minute = moment().minute();

      let reg_hour = "";
      let reg_minute = "";

      reg_hour = validate.time(hour);
      reg_minute = validate.time(minute);

      let reg_time = reg_hour + ":" + reg_minute;

      //imagurl에 대한 max값 set
      const sql_idx = `select max(board_idx) idx from luxury.board`;
      conn.query(sql_idx, function(err, data){
        if(err){
          console.log(err);
          throw err;
        }
        else{
          let idx = data[0].idx + 1;
          //이름 set

          const sql_nickname = `select concat(a.descript, b.descript) nickname
                                from
                                (
                                    select *
                                    from luxury.code
                                    where major_key = 7777
                                    order by rand() limit 1
                                ) a,
                                (
                                    select *
                                    from luxury.code
                                    where major_key = 7778
                                    order by rand() limit 1
                                ) b`;

          /* 글을 작성할때는 닉네임을 랜덤으로 set 한다 */
          conn.query(sql_nickname, function(err,data){
            if(err){
              console.log(err);
              throw err;
            }
            else{
              let name  = data[0].nickname;
              const sql = `Insert into luxury.board(board_idx,userid,name,subject,descript,boardtype,boardforum,reg_date,reg_time)
                           values (?,?,?,?,?,?,?,?,?)`
              conn.query(sql,[idx,userid,name, subject, descript, boardtype,boardforum,reg_date,reg_time], function(err, data){
                //id는 랜덤으로 생성
                if(err){
                  console.log(err);
                  throw err;
                }
                else {
                  //image insert 갯수에 따라 set
                  if(imgFile.image_1 == null && imgFile.image_2 == null){
                    res.json(data)
                  }
                  else{
                    const sql_img = `Insert into luxury.boardimg (idx, seq, userid, imgurl, reg_dttm) values ?`;
                    let reg_dttm = reg_date + " " + reg_time;
                    let values = [];

                    let i = 0 ;

                    //이미지 두개로 set
                    console.log("imgFile", imgFile);

                    if(imgFile.image_1 != null ){
                      console.log(imgFile.image_1[0].transforms)
                      let imgValues = [];
                      imgValues.push(idx)
                      imgValues.push(i)
                      imgValues.push(userid)
                      imgValues.push(imgFile.image_1[0].transforms[0].location)
                      imgValues.push(reg_dttm)

                      i++;
                      values.push(imgValues)
                    }
                    if (imgFile.image_2 != null ) {
                      let imgValues = [];
                      imgValues.push(idx)
                      imgValues.push(i)
                      imgValues.push(userid)
                      imgValues.push(imgFile.image_2[0].transforms[0].location)
                      imgValues.push(reg_dttm)
                      values.push(imgValues)

                    }



                    conn.query(sql_img, [values], function(err,data){
                      if(err){
                        console.log(err);
                        throw err;
                      }
                      else{
                        res.json(200);
                      }
                    })
                  }
                }
              })
            }
          })

        }
      })

    });
    return router;
}
