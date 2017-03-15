Rails.application.routes.draw do
  root to: 'welcome#index'
  mount ActionCable.server => '/cable'
  devise_for :users
  namespace :api, defaults: { format: :json } do
    namespace :v0 do
      post 'auth_user' => 'authentication#authenticate_user'
      resources :users, only: :create
      resources :rooms, only: [ :show, :index, :create, :destroy ] do
        resources :musics, only: [:index, :create, :update, :destroy]
        post 'modify_waiting_list', to: 'musics#modify_waiting_list'
        resources :invitations, only: [:index, :create, :update]
        post 'increment_strangers_number', to: 'rooms#increment_strangers_number'
        post 'decrement_strangers_number', to: 'rooms#decrement_strangers_number'
      end
    end
  end
  get '/*path' => 'welcome#index'
end
