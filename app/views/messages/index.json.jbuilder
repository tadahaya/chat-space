json.array! @messages.each do |message|
  json.name message.user.name
  json.date message.created_at.to_s
  json.content message.content
  json.image message.image
  json.id message.id
end
# json.group_id @message.group_id
# json.content @message.content
# json.image @message.image
# json.user_id @message.user_id
# json.user_name @message.user.name
# json.created_at @message.created_at.to_s
