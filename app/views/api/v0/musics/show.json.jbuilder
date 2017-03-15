json.extract! @music, :id, :json_data, :room_id, :state, :slug
if @music.user
  json.username @music.user.username
end
