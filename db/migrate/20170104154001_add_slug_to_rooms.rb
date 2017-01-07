class AddSlugToRooms < ActiveRecord::Migration[5.0]
  def change
    add_column :rooms, :slug, :string
  end
end
