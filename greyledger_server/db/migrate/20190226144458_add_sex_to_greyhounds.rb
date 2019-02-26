class AddSexToGreyhounds < ActiveRecord::Migration[5.2]
  def change
    add_column :greyhounds, :sex, :string
  end
end
