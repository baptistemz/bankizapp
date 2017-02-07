class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  validates :username, presence: true
  validates :email, presence: true
  has_many :rooms

end
