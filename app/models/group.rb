class Group < ApplicationRecord
  has_many :menbers
  has_many :users, through: :members
  validates :name, presence: true
end
