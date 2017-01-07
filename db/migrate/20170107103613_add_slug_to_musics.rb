class AddSlugToMusics < ActiveRecord::Migration[5.0]
  def change
    add_column :musics, :slug, :string
  end
end
