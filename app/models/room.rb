class Room < ApplicationRecord
  belongs_to :user
  has_many :musics
  extend FriendlyId
  friendly_id :name, use: :slugged

  validates :name, presence: true, uniqueness: true
end
