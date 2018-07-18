$(function(){
  function buildHTML(message){
    var add_image ="";
    if(message.image){
      add_image = `<p class="lower-meesage__image"><img src="${message.image}"></p>`;
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
if (window.location.href.match(/\/groups\/\d+\/messages/)) {
  var countup = function(){
    var lastMessageId = $('.message').last().data('message-id');
    $.ajax({
      type: "GET",
      url: location.href,
      dataType: 'json',
      data: {lastMessageId: lastMessageId},
    })
    .done(function(new_messages){
      var insertHTML ='';
      new_messages.forEach(function(message){
        insertHTML += buildHTML(message);
        $(".messages").append(insertHTML);
      });
    })
    .fail(function(){
      alert("自動メッセージ取得に失敗しました")
    })
  }
  setInterval(countup, 5000);
}
})
