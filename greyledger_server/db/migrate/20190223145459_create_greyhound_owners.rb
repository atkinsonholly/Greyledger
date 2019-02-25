class CreateGreyhoundOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :greyhound_owners do |t|
      t.integer :greyhound_id
      t.integer :owner_id

      t.timestamps
    end
  end
end
