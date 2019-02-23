class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def index
    @users = User.all
    render json: @users
  end

  def profile
    @user = current_user
    render json: @user
  end

  def create
    @user = User.create!(user_params)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: @user
    else
      render json: {error: "Unable to create user"}, status: 400
    end
  end


  private
  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name)
  end

end
