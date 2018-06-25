$(function(){
  function buildHTML(message){
    var html = `<p><strong><a href=/groups/${message.group_id}/messages>${message.user.name}</a>:</strong>${message.content}</p>`
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
      $('.messages').append(html)
      $('.form__message').val('')
    })
    .fail(function(){
      alert('error');
    })
    })
  });
