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
    puts user_params
    @user = User.create!(user_params)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), token: @token }, status: :accepted
    else
      render json: {error: "Unable to create user"}, status: 400
    end
  end

  private
  def user_params
    params.permit(:password, :email, :first_name, :last_name)
  end

end
