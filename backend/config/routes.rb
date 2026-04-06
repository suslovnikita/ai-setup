Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    post "auth/signup", to: "auth#signup"
    post "auth/login",  to: "auth#login"
  end
end
