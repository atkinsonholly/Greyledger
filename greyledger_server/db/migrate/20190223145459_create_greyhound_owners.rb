class CreateGreyhoundOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :greyhound_owners do |t|
      t.string :greyhound_id
      t.string :owner_id

      t.timestamps
    end
  end
end
