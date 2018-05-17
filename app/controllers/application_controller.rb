class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  bofore_action :autenticate_user!
end
