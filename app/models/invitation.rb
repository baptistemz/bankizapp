class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :room
  validates_uniqueness_of :user_id, scope: :room_id
  after_create :broadcast_added_invitation
  after_update :broadcast_updated_invitation

  def broadcast_added_invitation
    ActionCable.server.broadcast(self.room.slug, {action: "new invitation", invitation: ActiveSupport::JSON.decode(render_invitation(self))})
  end

  def broadcast_updated_invitation
    if self.active
      ActionCable.server.broadcast(self.room.slug, {action: "new invitation", invitation: ActiveSupport::JSON.decode(render_invitation(self))})
    else
      ActionCable.server.broadcast(self.room.slug, {action: "invitation deleted", invitation: ActiveSupport::JSON.decode(render_invitation(self))})
    end
  end

  private

  def render_invitation(invitation)
    ApplicationController.renderer.render(partial: "api/v0/invitations/invitation.json.jbuilder", locals: {invitation: invitation})
  end
end
