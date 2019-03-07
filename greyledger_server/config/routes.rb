Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :new, :create, :show]
      post '/login', to: 'auth#create'
      post '/login', to: 'users#login'
      post '/signup', to: 'users#create'
      get '/profile', to: 'users#profile'

      resources :greyhound_owners
      resources :user_greyhounds
      resources :owners

      resources :greyhounds
      post '/greyhounds/register', to: 'greyhounds#register'
      post '/greyhounds/register_update', to: 'greyhounds#register_update'
      post '/greyhounds/confirm_greyhound', to: 'greyhounds#confirm_greyhound'
      post '/greyhounds/revert_DB', to: 'greyhounds#revert_DB'
    end
  end
end
