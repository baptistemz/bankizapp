module Api
  module V0
    class UsersController < ApplicationController
      before_action :authenticate_request!
      skip_before_action :authenticate_request!, :only => [:create]

      def create
        @user = User.new(user_params)
        if @user.save
          render json: {status: 'User successfully created'}, status: :created
        else
          render_error
        end
      end

      def show
        @user = User.find(params[:id])
        render :show
      end

      def update
        @user = User.find(params[:id])
        if current_user == @user
          if @user.update_attributes(user_params)
            render partial: "api/v0/users/user.json.jbuilder", locals: {user: @user}
          else
            render_error
          end
        else
          render_error
        end
      end

      # def send_password_token
      #   current_user.send_reset_password_instructions
      # end

      private

      def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
      end

      def render_error
        render json: { errors: @user.errors.full_messages },
          status: :unprocessable_entity
      end
    end
  end
end
