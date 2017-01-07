json.extract! @room, :id, :name
json.dj @room.user
json.musics @room.musics, partial: 'api/v0/musics/music', as: :music
