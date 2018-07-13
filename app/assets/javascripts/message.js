$(function(){
  function buildHTML(message){
    var add_image ="";
    if(message.image){
      add_image = `<p class="lower-meesage__image"><img src="${message.image.url}"></p>`;
    }
    var html =
    `<div class="message" data-message-id="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
        ${message.created_at}
        </div>
      </div>
      <div class="lower-meesage">
        <p class="lower-meesage__content">${message.content}</p>
        ${add_image}
      </div>
    </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $('#new_message').attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight }, 500, 'swing');
      $('.form__message').val('');
      $('.hidden').val('');
    })
    .fail(function(){
      alert("送信したテキストを表示できません。リロードしてください");
    })
    return false;
    })

//自動更新
  var countup = function(){
    var newest_id = $('.message').last().data('message-id');
    console.log(newest_id);
    $.ajax({
      type: "GET",
      url: location.href,
      dataType: 'json',
      data: {newest_id: newest_id},
    })
    .done(function(newest){
      console.log(newest);
      var insertHTML ='';
      newest.forEach(function(message){
          console.log("ne:"+newest_id);
          console.log("me:"+message.id);
        if (message.id > newest_id){
        insertHTML += buildHTML(message);
        $(".messages").append(insertHTML);
        console.log(insertHTML);
      }
        });
    })
    .fail(function(){
      alert("自動メッセージ取得に失敗しました")
    })
  }
  setInterval(countup, 5000);
})
