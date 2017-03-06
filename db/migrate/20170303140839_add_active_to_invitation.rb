class AddActiveToInvitation < ActiveRecord::Migration[5.0]
  def change
    add_column :invitations, :active, :boolean
  end
end
