module Api
  module V0
    class AuthenticationController < ApplicationController
      def authenticate_user
        user = User.find_for_database_authentication(email: params[:email])
        if user
          if user.valid_password?(params[:password])
            render json: payload(user)
          else
            render json: {errors: ['Wrong password for this email']}, status: :unauthorized
          end
        else
          render json: {errors: ["We don't know this email yet"]}, status: :unauthorized
        end
      end

      private

      def payload(user)
        return nil unless user and user.id
        {
          auth_token: JsonWebToken.encode({user_id: user.id}),
          user: {id: user.id, email: user.email, username: user.username}
        }
      end
    end
  end
end
