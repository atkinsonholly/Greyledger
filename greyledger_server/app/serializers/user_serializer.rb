class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :greyhounds, :user_greyhounds

  has_many :user_greyhounds
  has_many :greyhounds, through: :user_greyhounds
end
