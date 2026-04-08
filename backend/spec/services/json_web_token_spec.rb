require 'rails_helper'

RSpec.describe JsonWebToken do
  describe '.encode / .decode' do
    it 'encodes and decodes a payload' do
      token = described_class.encode({ user_id: 1 })
      decoded = described_class.decode(token)
      expect(decoded[:user_id]).to eq(1)
    end
  end

  describe '.decode' do
    it 'raises InvalidToken for a malformed token' do
      expect { described_class.decode('invalid.token.here') }
        .to raise_error(ExceptionHandler::InvalidToken)
    end
  end
end
