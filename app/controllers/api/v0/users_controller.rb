module Api
  module V0
    class UsersController < ApplicationController
      def create
        @user = User.new(user_params)
        if @user.save
          render json: {status: 'User created successfully'}, status: :created
        else
          render_error
        end
      end

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
