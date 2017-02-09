Rails.application.routes.draw do
  root to: 'welcome#index'
  mount ActionCable.server => '/cable'
  namespace :api, defaults: { format: :json } do
    namespace :v0 do
      post 'auth_user' => 'authentication#authenticate_user'
      resources :users, only: :create
      resources :rooms, only: [ :show, :create, :destroy ] do
        resources :musics, only: [:index, :create, :update, :destroy]
        post 'modify_waiting_list', to: 'musics#modify_waiting_list'
      end
    end
  end
  get '/*path' => 'welcome#index'
end
