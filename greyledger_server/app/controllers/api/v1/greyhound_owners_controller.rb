class GreyhoundOwnersController < ApplicationController
  def index
    @greyhound_owners = GreyhoundOwner.all
    render json: @greyhound_owners
  end

  def show
    @greyhound_owner = GreyhoundOwner.find(params[:id])
    render json: @greyhound_owner
  end

  def create
    @greyhound_owner = GreyhoundOwner.create!(
      greyhound_id: params[:greyhound_id],
      owner_id: params[:owner_id])

    if @greyhound_owner.valid?
      render json: @greyhound_owner
    else
      render json: {error: "Unable to create greyhound_owner"}, status: 400
    end
  end

end
