class AddUserReferenceToMusics < ActiveRecord::Migration[5.0]
  def change
    add_reference :musics, :user, index: true
  end
end
