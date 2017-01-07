class Room < ApplicationRecord
  belongs_to :user
  has_many :musics
  extend FriendlyId
  friendly_id :name, use: :slugged

  validates_presence_of :name, :slug, :user_id
  validates_uniqueness_of :slug, :name
end
