class AddDateOfDeathToGreyhounds < ActiveRecord::Migration[5.2]
  def change
    add_column :greyhounds, :date_of_death, :date
    add_column :greyhounds, :details_of_death, :string
  end
end
