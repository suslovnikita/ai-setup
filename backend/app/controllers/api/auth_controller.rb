module Api
  class AuthController < ApplicationController
    def signup
      user = User.create!(user_params)
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user_data(user) }, status: :created
    end

    def login
      user = User.find_by!(email: params[:email].downcase)
      raise ExceptionHandler::InvalidToken, 'Invalid credentials' unless user.authenticate(params[:password])

      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user_data(user) }
    end

    private

    def user_params
      params.permit(:email, :password, :password_confirmation)
    end

    def user_data(user)
      { id: user.id, email: user.email }
    end
  end
end
