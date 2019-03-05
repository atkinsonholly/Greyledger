class GreyhoundSerializer < ActiveModel::Serializer
  attributes :id, :name, :left_ear, :right_ear, :sire, :sex, :birthdate, :status, :distemper, :viral_hepatitis, :leptospira_canicola, :leptospira_icterihaemorrhagiae, :parvovirus, :owners, :users, :user_greyhounds, :greyhound_owners, :date_of_death, :details_of_death

  has_many :greyhound_owners
  has_many :owners, through: :greyhound_owners
  has_many :user_greyhounds
  has_many :users, through: :user_greyhounds

end
