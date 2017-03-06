json.extract! @room, :id, :name, :slug
json.dj @room.user
json.musics @room.musics, partial: 'api/v0/musics/music', as: :music
json.users @room.invitations.where(active: true), partial: 'api/v0/invitations/invitation', as: :invitation
