require 'rails_helper'

RSpec.describe 'Api::Auth', type: :request do
  describe 'POST /api/auth/signup' do
    let(:valid_params) { { email: 'new@example.com', password: 'password123', password_confirmation: 'password123' } }

    context 'with valid params' do
      it 'creates a user and returns token' do
        post '/api/auth/signup', params: valid_params
        expect(response).to have_http_status(:created)
        expect(json['token']).to be_present
        expect(json['user']['email']).to eq('new@example.com')
      end
    end

    context 'with invalid params' do
      it 'returns unprocessable entity when email is missing' do
        post '/api/auth/signup', params: { password: 'password123' }
        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'returns error when email already taken' do
        create(:user, email: 'new@example.com')
        post '/api/auth/signup', params: valid_params
        expect(response).to have_http_status(:unprocessable_content)
      end
    end
  end

  describe 'POST /api/auth/login' do
    before { create(:user, email: 'user@example.com', password: 'password123') }

    context 'with valid credentials' do
      it 'returns token' do
        post '/api/auth/login', params: { email: 'user@example.com', password: 'password123' }
        expect(response).to have_http_status(:ok)
        expect(json['token']).to be_present
      end
    end

    context 'with invalid credentials' do
      it 'returns unauthorized for wrong password' do
        post '/api/auth/login', params: { email: 'user@example.com', password: 'wrong' }
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns not_found for unknown email' do
        post '/api/auth/login', params: { email: 'nobody@example.com', password: 'password123' }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  private

  def json
    response.parsed_body
  end
end
