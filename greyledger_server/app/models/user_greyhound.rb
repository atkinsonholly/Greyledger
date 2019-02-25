class UserGreyhound < ApplicationRecord
  belongs_to :user
  belongs_to :greyhound
end
