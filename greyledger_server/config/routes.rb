Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users
      post '/login', to: 'auth#login'
      post '/signup', to: 'auth#signup'
      get '/profile', to: 'users#profile'

      resources :greyhound_owners
      resources :owners
      resources :greyhounds
    end
  end
end
