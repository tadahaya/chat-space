json.group_id @message.group_id
json.content @message.content
json.image @message.image.url
json.user_id @message.user_id
json.user_name @message.user.name
json.created_at @message.created_at.to_s
json.id @message.id
