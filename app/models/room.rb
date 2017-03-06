class Room < ApplicationRecord
  belongs_to :user
  has_many :musics, dependent: :destroy
  has_many :invitations, dependent: :destroy
  extend FriendlyId
  friendly_id :name, use: :slugged

  validates_presence_of :name, :slug
  validates_uniqueness_of :slug, :name

  def broadcast_modified_list(musics)
    ActionCable.server.broadcast(self.slug, {action: "sorted", musics: ActiveSupport::JSON.decode(render_musics(musics))})
  end

  private

  def render_musics(musics)
    @musics = musics
    ApplicationController.renderer.render(template: "api/v0/musics/index.json.jbuilder", locals: { musics: @musics })
  end

end
