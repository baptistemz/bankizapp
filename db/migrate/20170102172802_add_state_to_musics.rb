class AddStateToMusics < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'hstore'
    add_column :musics, :json_data, :hstore
    add_index :musics, :json_data, using: :gin
    add_column :musics, :state, :string
  end
end
