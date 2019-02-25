class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :address, :greyhounds, :greyhound_owners

  has_many :greyhound_owners
  has_many :greyhounds, through: :greyhound_owners
end
