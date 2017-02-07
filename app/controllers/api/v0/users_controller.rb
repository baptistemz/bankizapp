module Api
  module V0
    class UsersController < ApplicationController
      def create
        user = User.new(user_params)
        if user.save
          render json: {status: 'User created successfully'}, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :bad_request
        end
      end

      private

      def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
      end
    end
  end
end
