class Greyhound < ApplicationRecord
  has_many :greyhound_owners
  has_many :owners, through: :greyhound_owners
  has_many :user_greyhounds
  has_many :users, through: :user_greyhounds
end
