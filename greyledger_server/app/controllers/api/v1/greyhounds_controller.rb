class Api::V1::GreyhoundsController < ApplicationController

  def index
    @greyhounds = Greyhound.order(:name)
    render json: @greyhounds
  end

  def show
    @greyhound = Greyhound.find(params[:id])
    render json: @greyhound
  end

  def destroy
    @greyhound = Greyhound.find(params[:id])
    @greyhound.destroy
    render json: { message: "Deletion confirmed"}
  end

  def register
    array = make_greyhound_owners_array(owner_params)
    # make sure at least 1 owner
    if !!array
      @greyhound = create(greyhound_params)
      @greyhound_owners = create_greyhound_owners(array)
      @user_greyhound = UserGreyhound.create(user_id: params[:currentUserId], greyhound_id: @greyhound.id)
      if @greyhound_owners && @greyhound && @user_greyhound
        render json: @greyhound
      end
    else
      render json: {error: "Unable to submit form"}, status: 400
    end
  end

  def confirm_greyhound
      @greyhound = Greyhound.find_by(id: params[:id])
      @greyhound = Greyhound.update(@greyhound.id, :confirmed => true)
      render json: @greyhound
  end

  def register_update
    @greyhound = Greyhound.find_by(name: params[:greyhound][:previous_name])
    if @greyhound != nil
      arr = []
      @prev_greyhound = @greyhound.deep_dup
      @greyhound.owners.each do |owner|
        arr.push(owner.deep_dup)
      end
      @prev_greyhound_owners = arr
      array = make_greyhound_owners_array(owner_params)
      # make sure at least 1 owner
      if !!array
        # check if greyhound is already dead
        if @greyhound.status == "Greyhound has been euthanised" || @greyhound.status == "Death by natural causes"
          render json: {error: "Greyhound date of death has already been registered as #{@greyhound.date_of_death}"}, status: 400
          return
        end

        if (@greyhound.status != "Greyhound has been euthanised" || @greyhound.status != "Death by natural causes") && (params[:greyhound][:status] == "Greyhound has been euthanised" || params[:greyhound][:status] == "Death by natural causes")
          @greyhound = Greyhound.update(@greyhound.id, :left_ear => params[:greyhound][:left_ear], :status => params[:greyhound][:status], :date_of_death => params[:greyhound][:date_of_death], :details_of_death => params[:greyhound][:details_of_death])
        elsif params[:greyhound][:status] == "Greyhound has a new name"
          @greyhound = Greyhound.update(@greyhound.id, :name => params[:greyhound][:new_name], :left_ear => params[:greyhound][:left_ear], :status => params[:greyhound][:status])
        else
          @greyhound = Greyhound.update(@greyhound.id, :left_ear => params[:greyhound][:left_ear], :status => params[:greyhound][:status])
        end
        @greyhound_owners = update_greyhound_owners(array)
        @user_greyhound = UserGreyhound.find { |user_greyhound| user_greyhound[:user_id] == params[:currentUserId] && user_greyhound[:greyhound_id] == @greyhound.id }
        if @user_greyhound == nil
          @user_greyhound = UserGreyhound.create(user_id: params[:currentUserId], greyhound_id: @greyhound.id)
        end
        if @greyhound_owners && @greyhound && @user_greyhound
          render json: {new_greyhound: @greyhound, owners: @greyhound.owners, prev_greyhound: @prev_greyhound, prev_greyhound_owners: @prev_greyhound_owners}
        end
        puts @prev_greyhound_owners
      end
    else
      render json: {error: "Greyhound not found"}, status: 400
    end
  end

  def revert_DB
    @greyhound = Greyhound.find_by(id: params[:new_greyhound][:id])
    puts @greyhound
    puts params
    array = params[:prev_owners]
    if @greyhound != nil
      @greyhound = Greyhound.update(@greyhound.id, :name => params[:prev_greyhound][:name], :status => params[:prev_greyhound][:status], :left_ear => params[:prev_greyhound][:left_ear], :date_of_death => params[:prev_greyhound][:date_of_death], :details_of_death => params[:prev_greyhound][:details_of_death])
      puts array
      @greyhound.greyhound_owners.destroy_all
      array.each do |owner|
        new_owner = Owner.create(first_name: owner[:first_name], last_name: owner[:last_name], address: owner[:address])
        GreyhoundOwner.create(owner_id: new_owner.id, greyhound_id: @greyhound.id)
      end
      render json: @greyhound
    else
      render json: {error: "Unable to revert"}, status: 400
    end
  end

  private

  def create_greyhound_owners(array)
    new_array = []
    array.each do |owner|
      existingOwner = Owner.all.find_by(last_name: owner[:last_name])
      #no owner duplicates
      if existingOwner != nil
        if existingOwner.first_name == owner[:first_name] && existingOwner.address == owner[:address]
          new_array.push(existingOwner)
        else
          newOwner = Owner.create(first_name: owner[:first_name], last_name: owner[:last_name], address: owner[:address])
          new_array.push(newOwner)
        end
      elsif existingOwner == nil
        newOwner = Owner.create(first_name: owner[:first_name], last_name: owner[:last_name], address: owner[:address])
        new_array.push(newOwner)
      end
    end
    #create a greyhound_owner connecting each owner to this new greyhound
    greyhound_owners = new_array.each do |owner|
      GreyhoundOwner.create(owner_id: owner.id, greyhound_id: @greyhound.id)
    end
    new_array
  end

  def make_greyhound_owners_array(params)
    owner_1 = {first_name: params[:owner_1_first_name], last_name: params[:owner_1_last_name], address: params[:owner_1_address]}
    owner_2 = {first_name: params[:owner_2_first_name], last_name: params[:owner_2_last_name], address: params[:owner_2_address]}
    owner_3 = {first_name: params[:owner_3_first_name], last_name: params[:owner_3_last_name], address: params[:owner_3_address]}
    owner_4 = {first_name: params[:owner_4_first_name], last_name: params[:owner_4_last_name], address: params[:owner_4_address]}
    array = [owner_1, owner_2, owner_3, owner_4]
    array = array.select { |owner| owner[:first_name] != nil && owner[:last_name] != nil && owner[:address] != nil }
    #make sure there is at least one owner
    if array.length > 0
      return array
    end
  end

  def update_greyhound_owners(array)
    puts array
    new_array = []
    array.each do |owner|
    #don't delete owners (as these will be connected to other greyhounds so should remain in the DB)
      existingOwner = Owner.all.find_by(last_name: owner[:last_name])
      #no owner duplicates
      if existingOwner != nil
        #do not make a new owner if this owner already exists in DB
        if existingOwner.first_name == owner[:first_name] && existingOwner.address == owner[:address]
          new_array.push(existingOwner)
        else
          #make a new owner if first_name, last_name or address are different from existing owner
          newOwner = Owner.create(first_name: owner[:first_name], last_name: owner[:last_name], address: owner[:address])
          new_array.push(newOwner)
        end
      #make a new owner if no existing owner
      elsif existingOwner == nil
        newOwner = Owner.create(first_name: owner[:first_name], last_name: owner[:last_name], address: owner[:address])
        new_array.push(newOwner)
      end
    end
    existingGreyhoundOwners = GreyhoundOwner.select { |greyhound_owner| greyhound_owner.greyhound_id == @greyhound.id }
    #delete old greyhound_owner connections
    existingGreyhoundOwners.each { | existingOwner | GreyhoundOwner.delete(existingOwner.id) }
    greyhound_owners = []
    #make new greyhound_owner connections
    new_array.each do |owner|
      new_greyhound_owner = GreyhoundOwner.create(owner_id: owner[:id], greyhound_id: @greyhound.id)
      greyhound_owners.push(new_greyhound_owner)
    end
    #return new owners
    new_array
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
      parvovirus: params[:parvovirus],
      date_of_death: Date.parse("01/01/0001"),
      details_of_death: "",
      confirmed: false
    )
  end

  def greyhound_params
    params.require(:greyhound).permit(:name, :left_ear, :right_ear, :sire, :sex, :birthdate, :status, :distemper, :viral_hepatitis, :leptospira_canicola, :leptospira_icterihaemorrhagiae, :parvovirus, :date_of_death, :details_of_death)
  end

  def owner_params
    params.require(:owners).permit(:owner_1_first_name, :owner_1_last_name, :owner_1_address,
                                    :owner_2_first_name, :owner_2_last_name, :owner_2_address,
                                    :owner_3_first_name, :owner_3_last_name, :owner_3_address,
                                    :owner_4_first_name, :owner_4_last_name, :owner_4_address)
  end

end
