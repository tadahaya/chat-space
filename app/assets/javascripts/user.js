$(function() {

var search_list = $(".chat-group-user");
var chat_members = $("#chat-member");

/* STEP1:チャットメンバーを追加 HTML作成 */
function appendUser(user) {
  console.log(user);
  var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ user.name }</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`;
  search_list.append(html);
 }


/* STEP2:チャットメンバー HTML作成 */
function addChatUser(add_user) {
  var html = `
<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value='${add_user.userId}'>
  <p class='chat-group-user__name'>${ add_user.userName }</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
</div>`;
  chat_members.append(html);
 }

  /*keyupイベントとAjax*/
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    console.log("input:" + input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      dataType: 'json'
    })
    .done(function(users){
      var myjson = JSON.stringify(users);
      console.log("JSON" + myjson);
      $(".chat-group-user").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        $(".chat-group-user").append("そのユーザーはいませんでした");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
    return false;
  });
// 検索したリストにメンバーを追加する
  $(".chat-group-form__field").on("click", function(){
    $(".chat-group-user__btn--add").on("click" ,function(){
      event.stopPropagation();
      console.log(this)
      var add_user = $(this).data();
      addChatUser(add_user);
      $(this).parent().remove();
    });
  return false;
  })
});

