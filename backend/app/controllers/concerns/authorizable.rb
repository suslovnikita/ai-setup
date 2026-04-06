module Authorizable
  extend ActiveSupport::Concern

  included do
    before_action :authorize_request
    attr_reader :current_user
  end

  private

  def authorize_request
    header = request.headers['Authorization']
    token = header&.split&.last
    raise ExceptionHandler::MissingToken, 'Missing token' unless token

    decoded = JsonWebToken.decode(token)
    @current_user = User.find(decoded[:user_id])
  end
end
