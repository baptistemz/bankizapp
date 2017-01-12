module Api
  module V0
    class MusicsController < ActionController::Base
      def index
        @room = Room.friendly.find(params[:room_id])
        @musics = @room.musics.all
        render :index
      end

      def create
        @room = Room.friendly.find(params[:room_id])
        @music = @room.musics.create(music_params)
        render :show
      end

      def update

      end

      def destroy
        @room = Room.friendly.find(params[:room_id])
        @music = @room.musics.friendly.find(params[:id])
        @music.destroy
        render :show
      end

      def modify_waiting_list
        @room = Room.friendly.find(params[:room_id])
        musics = @room.musics.where(state: "waiting")
        musics.destroy_all
        params[:list].each do |item|
          @room.musics.create(state: "waiting", slug: JSON.parse(item.to_json)['etag'].tr('/\"', '').split(//).last(9).join, json_data: item.to_json)
        end
        @musics = @room.musics.where(state: "waiting")
        render :index
      end

      private

      def music_params
        params.require(:music).permit(:state, :json_data, :slug)
      end
    end
  end
end
