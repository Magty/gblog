/* eslint-disable no-unused-vars */

const Express = require('express');
const mysql = require('mysql');
const $sql = require('../db/sqlMap');
const models = require('../db/db');

const router = Express.Router();

// 连接数据库
const connection = mysql.createConnection(models.mysql);

connection.connect();

function jsonWrite(res, ret) {
  if (typeof ret === 'undefined') {
    // res.send('err');
    res.json({
      code: '1',
      msg: '操作失败',
    });
  } else {
    res.json(ret);
    // res.send('ok');
  }
}

router.post('/addUser', (req, res) => {
  const sql = $sql.user.add;
  const params = req.body;
  // console.log(params);
  connection.query(sql, [params.username, params.password, params.tel],
    (error, results, fields) => {
      if (error) throw error;
      if (results) {
        jsonWrite(res, results);
      }
      // console.log(`The solution is: ${results}`);
    });
}).post('/login', (req, res) => {
  let sql = $sql.user.query;
  const params = req.body;
  console.log(params);
  if (params && params.username) {
    sql = `${sql} where name = '${params.username}'`;
  }
  console.log(Object.keys(params)[0]);
  // var keywords = JSON.parse(Object.keys(params)[0])
  // console.log(keywords)
  connection.query(sql, params.username, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results[0] === undefined) {
      res.send('-1');
    } else {
      const resArray = results[0];
      console.log(resArray.password);
      if (resArray.password === params.password) {
        jsonWrite(res, results);
      } else {
        res.send('0');
      }
    }
  });
}).get('/getUser', (req, res) => {
  let sql = $sql.user.query;
  const params = req.body;
  if (params && params.username) {
    sql = `${sql} username = '${params.username}',password = '${params.password}',tel = '${params.tel}' where uuid = '${params.uuid}'`;
  }
  connection.query(sql, params.id, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
    if (results.affectedRows === undefined) {
      res.send('更新失败，请联系管理员'); // 查询不出username，data 返回-1
    } else {
      res.send('ok');
    }
  });
}).post('/updateUser', (req, res) => {
  let sql = $sql.user.update;
  const params = req.body;
  if (params && params.id) {
    sql = `${sql} where username = '${params.username}'`;
  }
  connection.query(sql, params.username, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results[0] === undefined) {
      res.send('-1');
    } else {
      jsonWrite(res, results);
    }
  });
});
module.exports = router;
