class Api::V1::GreyhoundsController < ApplicationController

  def index
    @greyhounds = Greyhound.order(:name)
    render json: @greyhounds
  end

  def show
    @greyhound = Greyhound.find(params[:id])
    render json: @greyhound
  end

  def create
    @greyhound = Greyhound.create!(
      name: params[:name],
      left_ear: params[:left_ear],
      right_ear: params[:right_ear],
      sire: params[:sire],
      birthdate: params[:birthdate],
      status: params[:status],
      distemper: params[:distemper],
      viral_hepatitis: params[:viral_hepatitis],
      leptospira_canicola: params[:leptospira_canicola],
      leptospira_icterihaemorrhagiae: params[:leptospira_icterihaemorrhagiae],
      parvovirus: params[:parvovirus])

    if @greyhound.valid?
      render json: @greyhound
    else
      render json: {error: "Unable to create greyhound"}, status: 400
    end
  end

end
