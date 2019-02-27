class Api::V1::GreyhoundsController < ApplicationController

  def index
    @greyhounds = Greyhound.order(:name)
    render json: @greyhounds
  end

  def show
    @greyhound = Greyhound.find(params[:id])
    render json: @greyhound
  end

  def register
    @greyhound = create(greyhound_params)
    @greyhound_owners = create_greyhound_owners(owner_params)
    @user_greyhound = UserGreyhound.create(user_id: params[:currentUserId], greyhound_id: @greyhound.id)
    if @greyhound_owners && @greyhound && @user_greyhound
      render json: @greyhound
    else
      render json: {error: "Unable to submit form"}, status: 400
    end
  end

  def register_update
    @greyhound = Greyhound.find_by(name: params[:greyhound][:previous_name])
    if @greyhound != nil
      Greyhound.update(@greyhound.id, :name => params[:greyhound][:new_name], :left_ear => params[:greyhound][:left_ear], :status => params[:greyhound][:status])
      @greyhound_owners = update_greyhound_owners(owner_params)
      @user_greyhound = UserGreyhound.find { |user_greyhound| user_greyhound.user_id == params[:currentUserId] && user_greyhound.greyhound_id == @greyhound.id }
      if @user_greyhound == nil
        @user_greyhound = UserGreyhound.create(user_id: params[:currentUserId], greyhound_id: @greyhound.id)
      end
    end
    if @greyhound_owners && @greyhound && @user_greyhound
      render json: @greyhound
    else
      render json: {error: "Unable to submit form"}, status: 400
    end
  end

  private

  def create_greyhound_owners(params)
    owner_1 = {first_name: params[:owner_1_first_name], last_name: params[:owner_1_last_name], address: params[:owner_1_address]}
    owner_2 = {first_name: params[:owner_2_first_name], last_name: params[:owner_2_last_name], address: params[:owner_2_address]}
    owner_3 = {first_name: params[:owner_3_first_name], last_name: params[:owner_3_last_name], address: params[:owner_3_address]}
    owner_4 = {first_name: params[:owner_4_first_name], last_name: params[:owner_4_last_name], address: params[:owner_4_address]}
    array = [owner_1, owner_2, owner_3, owner_4]
    new_array = []
    array.each do |owner|
      existingOwner = Owner.all.find_by(last_name: owner[:last_name])
      if existingOwner != nil
        if existingOwner.first_name == owner[:first_name]
          new_array.push(existingOwner)
        end
      else
        if owner.first_name != nil && owner.last_name != nil && owner.address != nil
          newOwner = Owner.create(first_name: owner[:first_name], last_name: owner[:last_name], address: owner[:address])
          new_array.push(newOwner)
        end
      end
    end
    new_array.each do |owner|
      GreyhoundOwner.create(owner_id: owner.id, greyhound_id: @greyhound.id)
    end
  end

  def update_greyhound_owners(params)
    owner_1 = {first_name: params[:owner_1_first_name], last_name: params[:owner_1_last_name], address: params[:owner_1_address]}
    owner_2 = {first_name: params[:owner_2_first_name], last_name: params[:owner_2_last_name], address: params[:owner_2_address]}
    owner_3 = {first_name: params[:owner_3_first_name], last_name: params[:owner_3_last_name], address: params[:owner_3_address]}
    owner_4 = {first_name: params[:owner_4_first_name], last_name: params[:owner_4_last_name], address: params[:owner_4_address]}
    array = [owner_1, owner_2, owner_3, owner_4]
    existing_owner_array = []
    new_array = []
    array.each do |owner|
      if owner[:first_name] != nil && owner[:last_name] != nil && owner[:address] != nil
        existingOwner = Owner.all.find_by(last_name: owner[:last_name])
        if existingOwner != nil
          if existingOwner.first_name == owner[:first_name]
            #delete existing owners
            Owner.delete(existingOwner.id)
          end
        end
      else
        if owner.first_name != nil && owner.last_name != nil && owner.address != nil
          #create new owners (only where information is provided)
          newOwner = Owner.create(first_name: owner[:first_name], last_name: owner[:last_name], address: owner[:address])
          new_array.push(newOwner)
        end
      end
    end
    new_array.each do |owner|
      existingGreyhoundOwner = GreyhoundOwner.find { |greyhound_owner| greyhound_owner.owner_id == owner[:id] && greyhound_owner.greyhound_id == @greyhound.id }
      if existingGreyhoundOwner == nil
        #create new greyhound_owners
        GreyhoundOwner.create(owner_id: owner.id, greyhound_id: @greyhound.id)
      end
      #delete existing greyhound_owners
      GreyhoundOwner.delete(existingGreyhoundOwner.id)
    end
  end

  def create(params)
    @greyhound = Greyhound.create!(
      name: params[:name],
      left_ear: params[:left_ear],
      right_ear: params[:right_ear],
      sire: params[:sire],
      sex: params[:sex],
      birthdate: params[:birthdate],
      status: params[:status],
      distemper: params[:distemper],
      viral_hepatitis: params[:viral_hepatitis],
      leptospira_canicola: params[:leptospira_canicola],
      leptospira_icterihaemorrhagiae: params[:leptospira_icterihaemorrhagiae],
      parvovirus: params[:parvovirus])
  end

  def greyhound_params
    params.require(:greyhound).permit(:name, :left_ear, :right_ear, :sire, :sex, :birthdate, :status, :distemper, :viral_hepatitis, :leptospira_canicola, :leptospira_icterihaemorrhagiae, :parvovirus)
  end

  def owner_params
    params.require(:owners).permit(:owner_1_first_name, :owner_1_last_name, :owner_1_address,
                                    :owner_2_first_name, :owner_2_last_name, :owner_2_address,
                                    :owner_3_first_name, :owner_3_last_name, :owner_3_address,
                                    :owner_4_first_name, :owner_4_last_name, :owner_4_address)
  end

end
