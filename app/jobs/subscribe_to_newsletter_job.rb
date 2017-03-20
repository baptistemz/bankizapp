class SubscribeToNewsletterJob < ApplicationJob
  queue_as :default

  def perform(user)
    SubscribeToNewsletterService.new(user).call
  end
end
