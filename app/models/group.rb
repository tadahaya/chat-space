class Group < ApplicationRecord
  has_many :members
  has_many :messages
  has_many :users, through: :members
  validates :name, presence: true

  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が登録されています'
    else
      'まだメッセージはありません'
    end
  end
end
