class Music < ApplicationRecord
  extend FriendlyId
  extend Enumerize

  default_scope { order("created_at ASC") }

  belongs_to :room
  store_accessor :json_data
  serialize :json_data, ActiveRecord::Coders::NestedHstore
  friendly_id :slug, use: :slugged
  enumerize :state, in: ["waiting", "playing"]
  validates_uniqueness_of :slug
end