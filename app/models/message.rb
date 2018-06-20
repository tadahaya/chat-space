class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  #imageがないときはcontentが存在していなければならない
  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader

  def format_posted_time
    Message.find(:id).created_at

  end
end
