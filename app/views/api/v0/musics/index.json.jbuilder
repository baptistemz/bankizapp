unless @musics
  @musics = musics
end
json.array! @musics, partial: 'api/v0/musics/music', as: :music
