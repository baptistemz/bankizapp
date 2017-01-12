Rails.application.routes.draw do
  root to: 'welcome#index'
  namespace :api, defaults: { format: :json } do
    namespace :v0 do
      mount_devise_token_auth_for "User", at: 'auth'
      resources :rooms, only: [ :show, :create, :destroy ] do
        resources :musics, only: [:index, :create, :update, :destroy]
        post 'modify_waiting_list', to: 'musics#modify_waiting_list'
      end
    end
  end
  get '/*path' => 'welcome#index'
end
