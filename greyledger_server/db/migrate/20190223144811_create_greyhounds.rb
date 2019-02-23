class CreateGreyhounds < ActiveRecord::Migration[5.2]
  def change
    create_table :greyhounds do |t|
      t.string :name
      t.string :left_ear
      t.string :right_ear
      t.string :sire
      t.date :birthdate
      t.string :status
      t.date :distemper
      t.date :viral_hepatitis
      t.date :leptospira_canicola
      t.date :leptospira_icterihaemorrhagiae
      t.date :parvovirus

      t.timestamps
    end
  end
end
