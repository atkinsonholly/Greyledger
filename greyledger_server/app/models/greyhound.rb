class Greyhound < ApplicationRecord
  has_many :greyhound_owners
  has_many :owners, through: :greyhound_owners
  has_many :user_greyhounds
  has_many :users, through: :user_greyhounds

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 16 }
  validates :right_ear, presence: true
  validates :sex, presence: true
  # Note: left_ear is not required upon initial registration (adult ear mark)
  validates :sire, presence: true, length: { maximum: 16 }
  validates :birthdate, presence: true
  validates :distemper, presence: true
  validates :viral_hepatitis, presence: true
  validates :leptospira_canicola, presence: true
  validates :leptospira_icterihaemorrhagiae, presence: true
  validates :parvovirus, presence: true
end
