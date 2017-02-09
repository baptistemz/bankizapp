class Music < ApplicationRecord
  extend FriendlyId
  extend Enumerize
  after_create_commit { broadcast_music(self, "added") }
  after_destroy_commit { broadcast_music(self, "deleted") }
  default_scope { order("created_at ASC") }

  belongs_to :room
  store_accessor :json_data
  serialize :json_data, ActiveRecord::Coders::NestedHstore
  friendly_id :slug, use: :slugged
  enumerize :state, in: ["waiting", "playing"]
  validates_uniqueness_of :slug, scope: :room_id
  validates_presence_of :slug, :json_data, :state

  def broadcast_music(music, action)
    ActionCable.server.broadcast(music.room.slug, {action: action, music: ActiveSupport::JSON.decode(render_music(music))})
  end

  private

  def render_music(music)
    ApplicationController.renderer.render(partial: "api/v0/musics/music.json.jbuilder", locals: {music: music})
  end
end
