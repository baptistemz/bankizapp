module Api
  module V0
    class MusicsController < BaseController
      before_action :set_current_user

      def index
        @room = Room.friendly.find(params[:room_id])
        @musics = @room.musics.all
        render :index
      end

      def create
        @room = Room.friendly.find(params[:room_id])
        if params[:state] == "next"
          music = @room.musics.where(state: "next").first
          music.update(state: "waiting") if music
        end
        music_params
        if current_user
          @music_params[:user_id] = current_user.id
        end
        @music = @room.musics.create(@music_params)
        render :show
      end

      def update
        @room = Room.friendly.find(params[:room_id])
        @music = @room.musics.friendly.find(params[:id])
        @music.update(music_params)
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
        Music.skip_callback(:destroy, :after, :broadcast_deleted_music)
        musics.destroy_all
        Music.set_callback(:destroy, :after, :broadcast_deleted_music)
        Music.skip_callback(:create, :after, :broadcast_added_music)
        params[:list].each do |item|
          @room.musics.create(state: "waiting", slug: JSON.parse(item.to_json)['etag'].tr('/\"', '').split(//).last(9).join, json_data: item.to_json)
        end
        Music.set_callback(:create, :after, :broadcast_added_music)
        @musics = @room.musics.where(state: "waiting")
        @room.broadcast_modified_list(@musics)
        render :index
      end

      private

      def music_params
        @music_params = params.require(:music).permit(:state, :json_data, :slug, :user_id)
      end
    end
  end
end
