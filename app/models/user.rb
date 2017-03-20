class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  validates :username, presence: true
  validates :email, presence: true
  has_many :rooms, dependent: :destroy
  has_many :musics, dependent: :nullify
  has_many :invitations
  after_create :register_user_to_mailchimp_list
  after_create :send_welcome_email

  def name
    username
  end

  private


  def send_welcome_email
    UserMailer.welcome(self).deliver_later
  end

  def register_user_to_mailchimp_list
    SubscribeToNewsletterJob.perform_now(self)
  end
end
