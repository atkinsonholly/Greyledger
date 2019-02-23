class Greyhound < ApplicationRecord
  belongs_to :user
  has_many :greyhound_owners
  has_many :owners, through: :greyhound_owners

end
