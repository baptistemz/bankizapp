class Music < ApplicationRecord
  belongs_to :room
  store_accessor :json_data
  serialize :json_data, ActiveRecord::Coders::NestedHstore
end
