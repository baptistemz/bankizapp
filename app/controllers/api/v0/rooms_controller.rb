module Api
  module V0
    class RoomsController < ApplicationController
      before_filter :authenticate_request!

      def create

        @room = current_user.rooms.create(room_params)
        if @room.save
          render :show, status: :created
        else
          render_error
        end
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
