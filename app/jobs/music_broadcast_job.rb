class MusicBroadcastJob < ApplicationJob
  queue_as :default
  # def perform(music)
  #   ActionCable.server.broadcast "music_for_room_#{music.room_id}", music: ActiveSupport::JSON.decode(render_music(music))
  # end
  #
  # private
  # def render_music(music)
  #   ApplicationController.renderer.render(partial: "api/v0/musics/music.json.jbuilder", locals: {music: music})
  # end

end
