require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to have_secure_password }
    it { is_expected.to validate_length_of(:password).is_at_least(6) }
  end

  describe 'email normalization' do
    it 'downcases email before save' do
      user = create(:user, email: 'User@Example.COM')
      expect(user.reload.email).to eq('user@example.com')
    end
  end
end
