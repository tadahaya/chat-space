$(function(){
  function buildHTML(message){
    var html =`<div class="message">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
                  </div>
                </div>
               <div class="lower-meesage"><p>${message.content}</p></div>
              </div>`;
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $('#new_message').attr('action');
    console.log(this)
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
      console.log($('.messages')[0].scrollHeight);
      $('.form__message').val('')

    })
    .fail(function(){
      alert('error');
    })
    return false;
    })
  });
