class AddStrangersNumberToRooms < ActiveRecord::Migration[5.0]
  def change
    add_column :rooms, :strangers_number, :integer
  end
end
