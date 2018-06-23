FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/spec/images/home.png")
    user
    group
  end
end
