$(function(){
  function buildHTML(message){
    var add_image ="";
    if(message.image.url){
      add_image = '<p class="lower-meesage__image"><img src="'+ message.image.url +'"></p>';
    }else{}

    var html =`<div class="message">
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
      alert('error');
    })
    return false;
    })
  });