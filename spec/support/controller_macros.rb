
module ControllerMacros

  def login(user)
    binding.pry
    @request.env["devise.mapping"] = Devise.mappings[:user]
    sign_in user
  end

end
