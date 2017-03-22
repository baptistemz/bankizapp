class Room < ApplicationRecord
  belongs_to :user
  has_many :musics, dependent: :destroy
  has_many :invitations, dependent: :destroy
  extend FriendlyId
  friendly_id :name, use: :slugged
  after_update :broadcast_updated_room

  validates_presence_of :name, :slug
  validates_uniqueness_of :slug, :name
  validates_numericality_of :strangers_number, greater_than_or_equal_to: 0

  def broadcast_modified_list(musics)
    ActionCable.server.broadcast(self.slug, {action: "sorted", musics: ActiveSupport::JSON.decode(render_musics(musics))})
  end

  def broadcast_updated_room()
    if self.strangers_number_changed?
      ActionCable.server.broadcast(self.slug, {action: "strangers_number_changed", strangers_number: self.strangers_number})
    end
  end

  private

  def render_musics(musics)
    @musics = musics
    ApplicationController.renderer.render(template: "api/v0/musics/index.json.jbuilder", locals: { musics: @musics })
  end
end
