$(function(){
  function buildHTML(message){
          console.log(message);
    var html ='<div class="message">'+
      '<div class="upper-message">'+
        '<div class="upper-message__user-name>${message.user_name}</div>'+
        '<div class="upper-message__date">${message.created_at}</div>'+
      '</div>'+
      '<div class="lower-meesage>${message.content}'+
    '</div></div>';
    return html;

  //   .message
  // .upper-message
  //   .upper-message__user-name
  //     = message.user.name
  //   .upper-message__date
  //     = message.created_at
  // .lower-meesage
  //   - if message.content.present?
  //     %p.lower-message__content
  //       = message.content
  //   = image_tag message.image.url, class: 'lower-message__image' if message.image.present?
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
      console.log(html);
      $('.messages').append(html).animate({scrollTop: $('#message_scroll')[0].scrollHeight}, 500, 'swing');
      $('.form__message').val('')

    })
    .fail(function(){
      alert('error');
    })
    })
  });
