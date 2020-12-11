var TodoDao = require('./TodoDao')
var $ = require('./jquery-3.2.1.min')

// DAOインスタンス
var tododao = new TodoDao()

$(document).ready(function(){
  // イベントハンドラ登録
  $('textarea[name=todo]').keyup(function(v){
    $('button[name=register], button[name=edit]')
      .prop('disabled', $(this).val() == 0)
  })
  $('button[name=register]').on('click', register)
  $('#table tbody').on('click', 'tr td button[name=edit]', edit)
  $('#table tbody').on('click', 'tr td button[name=remove]', remove)

  init()
})

// 初期化（全件表示）
var init = function(){
  // TODO表の削除
  $('#table tbody').empty()
  // TODO表の表示
  tododao.findAll(function(list){
    $.each(list, function(i, e){
      $('#table tbody').append(`
        <tr>
          <td>${i+1}</td>
          <td>${e.word}</td>
          <td>${e.todo}</td>

          <td><button type="button" name="edit" value="${e.id}">更新</button></td>
          <td><button type="button" name="remove" value="${e.id}">削除</button></td>
        </tr>
      `)
    })

    // TODOテキストボックス、ボタンの初期化
    $('textarea[name=todo]').val('').focus().keyup()
  })
}

////
var getDate = function(){
  var now = new Date();
  var year = now.getFullYear();
  var mon = now.getMonth()+1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  
  var time = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分"; 
  return time;
} 
////

// 登録
var register = function(){
  var todo = $('textarea[name=todo]').val()
  
  tododao.insert(todo,init)
}

// 更新
var edit = function(){
  var id = $(this).val()
  var time1 = getDate()
  var todo = $('textarea[name=todo]').val()
  tododao.update(id, time1,todo, init)
}
  
// 削除
var remove = function(){
  var id = $(this).val()
  tododao.remove(id, init)
}