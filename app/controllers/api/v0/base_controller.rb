module Api
  module V0
    class BaseController < ApplicationController
      protect_from_forgery with: :null_session
      attr_reader :current_user
      
      protected

      def authenticate_request!
        unless user_id_in_token?
          render json: { errors: ['You must be logged in to do this action'] }, status: :unauthorized
          return
        end
        @current_user = User.find(auth_token[:user_id])
      rescue JWT::VerificationError, JWT::DecodeError
        render json: { errors: ['You must be logged in to do this action'] }, status: :unauthorized
      end

      def set_current_user
        if user_id_in_token?
          @current_user = User.find(auth_token[:user_id])
        else
          @current_user = nil
        end
      end

      private

      def http_token
        @http_token ||= if request.headers['Authorization'].present?
          request.headers['Authorization'].split(' ').last
        end
      end

      def auth_token
        @auth_token ||= JsonWebToken.decode(http_token)
      end

      def user_id_in_token?
        http_token && auth_token && auth_token[:user_id].to_i
      end
    end
  end
end
