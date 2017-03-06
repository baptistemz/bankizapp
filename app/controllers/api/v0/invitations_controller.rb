module Api
  module V0
    class InvitationsController < ApplicationController
      respond_to :json
      before_action :authenticate_request!
      skip_before_action :authenticate_request!, :only => [:update]

      def create
        @room = Room.friendly.find(params[:room_id])
        @invitation = @room.invitations.where(user_id: current_user.id).first_or_create
        @invitation.update(active: true)
        render :show, status: :created
      end

      def update
        @room = Room.friendly.find(params[:room_id])
        @invitation = @room.invitations.find(params[:id])
        @invitation.update(invitation_params)
        render :show, status: :updated
      end

      private

      def invitation_params
        params.require(:invitation).permit(:active)
      end
      # def render_error
      #   render json: { errors: @invitation.errors.full_messages },
      #     status: :unprocessable_entity
      # end
    end
  end
end
