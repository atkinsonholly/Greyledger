class GreyhoundOwnersSerializer < ActiveModel::Serializer
  attributes :id, :greyhound, :owner

  belongs_to :greyhound
  belongs_to :owner
end
