class Api::V1::UserGreyhoundsController < ApplicationController
  def index
    @user_greyhounds = UserGreyhound.all
    render json: @user_greyhounds
  end

  def show
    @user_greyhound = UserGreyhound.find(params[:id])
    render json: @user_greyhound
  end

  def create
    @user_greyhound = UserGreyhound.create!(
      greyhound_id: params[:greyhound_id],
      user_id: params[:user_id])

    if @user_greyhound.valid?
      render json: @user_greyhound
    else
      render json: {error: "Unable to create user_greyhound"}, status: 400
    end
  end

end
