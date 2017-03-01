module Api
  module V0
    class RoomsController < ApplicationController
      before_action :authenticate_request!
      skip_before_action :authenticate_request!, :only => [:show]

      def create
        @room = current_user.rooms.create(room_params)
        if @room.save
          render :show, status: :created
        else
          render_error
        end
      end

      def index
        @rooms = current_user.rooms
        render :index
      end

      def show
        @room = Room.friendly.find(params[:id])
        render :show
      end

      def delete
      end

      private

      def room_params
        params.require(:room).permit(:name,:slug)
      end

      def render_error
        render json: { errors: @room.errors.full_messages },
          status: :unprocessable_entity
      end
    end
  end
end
