const sqlMap = {
  user: {
    add: 'insert into blog( name, password, tel) values ( ?, ?, ?)',
    select_name: 'SELECT * from blog where name = ?', // 查询 name
    select_password: 'SELECT * from blog where password = ?', // 查询 password
  },
};
module.exports = sqlMap;
