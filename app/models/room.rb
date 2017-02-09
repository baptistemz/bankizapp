class Room < ApplicationRecord
  belongs_to :user
  has_many :musics, dependent: :destroy
  extend FriendlyId
  friendly_id :name, use: :slugged

  validates_presence_of :name, :slug
  validates_uniqueness_of :slug, :name
end
