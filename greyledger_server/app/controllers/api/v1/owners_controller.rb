class Api::V1::OwnersController < ApplicationController
  def index
    @owners = Owner.all
    render json: @owners
  end

  def show
    @owner = Owner.find(params[:id])
    render json: @owner
  end

  def create
    @owner = Owner.create!(
      first_name: params[:first_name],
      last_name: params[:last_name],
      address: params[:address])

    if @owner.valid?
      render json: @owner
    else
      render json: {error: "Unable to create owner"}, status: 400
    end
  end

end
