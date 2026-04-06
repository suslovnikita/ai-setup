module ExceptionHandler
  extend ActiveSupport::Concern

  class InvalidToken < StandardError; end
  class MissingToken < StandardError; end

  included do
    rescue_from ExceptionHandler::InvalidToken, with: :unauthorized
    rescue_from ExceptionHandler::MissingToken, with: :unauthorized
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  end

  private

  def unauthorized(err)
    render json: { error: err.message }, status: :unauthorized
  end

  def not_found(err)
    render json: { error: err.message }, status: :not_found
  end

  def unprocessable_entity(err)
    render json: { error: err.record.errors.full_messages }, status: :unprocessable_content
  end
end
