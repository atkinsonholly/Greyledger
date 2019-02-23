class Owner < ApplicationRecord
  has_many :greyhound_owners
  has_many :greyhounds, through: :greyhound_owners
end
