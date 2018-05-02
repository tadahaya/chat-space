# README


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|


### Association
-has_many :menbers
-has_many :messages
-has_many :users, through: :members

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,add_index|


### Association
-has_many :members
-has_many :messages
-has_many :groups, through: :members

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user
