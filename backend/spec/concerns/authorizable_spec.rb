require 'rails_helper'

RSpec.describe Authorizable, type: :controller do
  controller(ApplicationController) do
    include Authorizable # rubocop:disable RSpec/DescribedClass

    def index
      render json: { user_id: current_user.id }
    end
  end

  let(:user) { create(:user) }

  def auth_header(token)
    request.headers['Authorization'] = "Bearer #{token}"
  end

  describe 'authorize_request' do
    context 'with a valid token' do
      it 'sets current_user and returns 200' do
        token = JsonWebToken.encode(user_id: user.id)
        auth_header(token)
        get :index
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['user_id']).to eq(user.id)
      end
    end

    context 'without a token' do
      it 'returns 401' do
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with an invalid token' do
      it 'returns 401' do
        auth_header('bad.token.value')
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user does not exist' do
      it 'returns 404' do
        token = JsonWebToken.encode(user_id: 0)
        auth_header(token)
        get :index
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
