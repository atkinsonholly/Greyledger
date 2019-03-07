class AddConfirmedToGreyhounds < ActiveRecord::Migration[5.2]
  def change
    add_column :greyhounds, :confirmed, :bool
  end
end
