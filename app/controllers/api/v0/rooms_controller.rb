module Api
  module V0
    class RoomsController < ActionController::Base
      def create
        @room = Room.create(room_params)
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
        params.permit(:name,:slug)
      end

      def render_error
        render json: { errors: @room.errors.full_messages },
          status: :unprocessable_entity
      end
    end
  end
end
