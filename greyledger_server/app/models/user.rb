class User < ApplicationRecord
  has_many :user_greyhounds
  has_many :greyhounds, through: :user_greyhounds

  has_secure_password
  before_save { email.downcase! }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :first_name, presence: true, length: { maximum: 20 }
  validates :last_name, presence: true, length: { maximum: 20 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 30 }, format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, length: { minimum: 6 }

  def full_name
    "#{self.first_name.capitalize} #{self.last_name.capitalize}"
  end

end
