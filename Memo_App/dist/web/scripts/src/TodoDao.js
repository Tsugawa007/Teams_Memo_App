var TodoDao = function(){
  var name = 'localdb'
  var version = '1.0'
  var description = 'Web SQL Database'
  var size = 2 * 1024 * 1024
  var db = openDatabase(name, version, description, size)

  // テーブル作成
  db.transaction(function(tx){
    tx.executeSql("create table memo (id integer primary key autoincrement,word varchar,todo varchar)",[])
  })

  // 全件検索
  this.findAll = function(callback){
    db.transaction(function (tx){
      tx.executeSql('select * from memo', [],
        function (tx, results){
          var list = []
          for (i = 0; i < results.rows.length; i++){
            console.log(results.rows.item(i).word)
            console.log(results.rows.item(i).todo)
            list.push({
              id: results.rows.item(i).id,
              word: results.rows.item(i).word,
              todo: results.rows.item(i).todo
            })
          }
          callback(list)
        })
    })
  }

  // 登録
  this.insert = function(todo,time,callback){
    db.transaction(function (tx){
      tx.executeSql('insert into memo (todo,word) values (?,?)', [todo,time], callback)
    })
  }

  // 更新
  this.update = function(id, time1,todo, callback){
    db.transaction(function (tx){
      tx.executeSql('update memo set todo = ?,word = ? where id = ?', [todo,time1, id], callback)
    })
  }

  // 削除
  this.remove = function(id, callback){
    db.transaction(function (tx){
      tx.executeSql('delete from memo where id = ?', [id], callback)
    })
  }

}

module.exports = TodoDao