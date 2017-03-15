class Music < ApplicationRecord
  extend FriendlyId
  extend Enumerize
  after_create :broadcast_added_music
  after_update :broadcast_updated_music
  after_destroy :broadcast_deleted_music
  after_destroy { |record| update_states(record) }
  default_scope { order("created_at ASC") }

  belongs_to :room
  belongs_to :user
  store_accessor :json_data
  serialize :json_data, ActiveRecord::Coders::NestedHstore
  friendly_id :slug, use: :slugged
  enumerize :state, in: ["waiting", "playing", "next"]
  validates_uniqueness_of :slug, scope: :room_id
  validates_uniqueness_of :state, scope: :room_id, unless: Proc.new { |music| music.state == "waiting" }
  validates_presence_of :slug, :json_data, :state

  def broadcast_added_music
    ActionCable.server.broadcast(self.room.slug, {action: "added", music: ActiveSupport::JSON.decode(render_music(self))})
  end

  def broadcast_updated_music
    ActionCable.server.broadcast(self.room.slug, {action: "updated", music: ActiveSupport::JSON.decode(render_music(self))})
  end

  def broadcast_deleted_music
    ActionCable.server.broadcast(self.room.slug, {action: "deleted", music: ActiveSupport::JSON.decode(render_music(self))})
  end

  private

  def update_states(music)
    @room = self.room
    if music.state == "playing"
      if @room.musics.where(state: "next").any?
        @room.musics.where(state: "next").first.update(state: "playing")
      end
      if @room.musics.where(state: "waiting").any?
        @room.musics.where(state: "waiting").first.update(state: "next")
      end
    elsif music.state == "next"
      if @room.musics.where(state: "waiting").any?
        @room.musics.where(state: "waiting").first.update(state: "next")
      end
    end
  end

  def render_music(music)
    ApplicationController.renderer.render(partial: "api/v0/musics/music.json.jbuilder", locals: {music: music})
  end
end
