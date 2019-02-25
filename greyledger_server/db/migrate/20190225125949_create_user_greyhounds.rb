class CreateUserGreyhounds < ActiveRecord::Migration[5.2]
  def change
    create_table :user_greyhounds do |t|
      t.integer :user_id
      t.integer :greyhound_id

      t.timestamps
    end
  end
end
