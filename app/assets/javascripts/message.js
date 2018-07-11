$(function(){
  function buildHTML(message){
    var add_image ="";
    if(message.image.url){
      add_image = `<p class="lower-meesage__image"><img src="${message.image.url}"></p>`;
    }else{}
    var html =
    `<div class="message">
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
    })
    .fail(function(){
      alert("送信したテキストを表示できません。リロードしてください");
    })
    return false;
    })



  function buildHTML2(message){
    var add_image ="";
    var html =
    `<div class="message">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.name}
        </div>
        <div class="upper-message__date">
        ${message.date}
        </div>
      </div>
      <div class="lower-meesage">
        <p class="lower-meesage__content">${message.content}</p>
        ${add_image}
      </div>
    </div>`;
    return html;
  }


  var count = 0;
  var countup = function(){

    console.log(count++);
    var url = $('#new_message').attr('action');

    $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
      data: { name: name},
      processData: false,
      contentType: false
    })
    .done(function(messages){
      var insertHTML ='';
      if (messages.length !== 0){
        messages.forEach(function(message){
        insertHTML += buildHTML2(message);
        $(".messages").html(insertHTML);
        console.log(message);

        });
      }else{
        console.log("NG");
      }

    })
    .fail(function(){
      alert("自動メッセージ取得に失敗しました")
      console.log("FAIL");
    })
  }
  setInterval(countup, 5000);
})
