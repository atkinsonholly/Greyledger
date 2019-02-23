class User < ApplicationRecord
  has_many :greyhounds

  has_secure_password

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  def full_name
    "#{self.first_name.capitalize} #{self.last_name.capitalize}"
  end

end
