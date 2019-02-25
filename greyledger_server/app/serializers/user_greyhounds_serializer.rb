class UserGreyhoundsSerializer < ActiveModel::Serializer
  attributes :id, :user, :greyhound

  belongs_to :user
  belongs_to :greyhound
end
