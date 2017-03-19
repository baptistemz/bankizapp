class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  validates :username, presence: true
  validates :email, presence: true
  has_many :rooms, dependent: :destroy
  has_many :musics, dependent: :nullify
  has_many :invitations

  after_create :send_welcome_email

  private

  def send_welcome_email
    UserMailer.welcome(self).deliver_now
  end
end
