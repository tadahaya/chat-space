$(function() {

var search_list = $(".chat-group-user");

/* HTML作成 */
function appendUser(user) {
  console.log(user);
  var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ user.name }</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`;
  search_list.append(html);
 }


  /*keyupイベントとAjax*/
  $(".chat-group-form__input").on("keyup", function(){
    var input = $("#user-search-field").val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      dataType: 'json'
    })

    .done(function(users){
      var myjson = JSON.stringify(users);
      console.log(myjson);
      $(".chat-group-user").empty();

      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoProduct("そのユーザーはいませんでした");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
