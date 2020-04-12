class AdminController < ActionController::Base
  protect_from_forgery with: :exception
  http_basic_authenticate_with name: Rails.application.secrets.basic_auth_username,
                               password: Rails.application.secrets.basic_auth_password

  def dashboard
  end
  def ui
  end

  def index

  end

  def current_party

  end

  def general

  end

end
