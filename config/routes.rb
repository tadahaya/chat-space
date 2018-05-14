Rails.application.routes.draw do
  root 'messages#index'
  get 'messages' => 'messages#index'

end
