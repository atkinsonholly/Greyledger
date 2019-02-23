class GreyhoundOwner < ApplicationRecord
  belongs_to :greyhound
  belongs_to :owner
end
