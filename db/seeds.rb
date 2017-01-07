Music.destroy_all
Room.destroy_all
User.destroy_all

bapt = User.create!(email: 'baptistem59@hotmail.com', password: '12345678', password_confirmation: '12345678')
baptroom = bapt.rooms.create!(name:'baptroom')
baptroom.musics.create!(state:'playing', slug: 'B3TurAdtTo',json_data: '{"kind":"youtube#searchResult","etag":"\"gMxXHe-zinKdE9lTnzKu8vjcmDI/8q7rVEpVx-0twxlXoB3TurAdtTo\"","id":{"kind":"youtube#video","videoId":"GVglJ_61PhE"},"snippet":{"publishedAt":"2015-02-19T20:37:17.000Z","channelId":"UC0Hm-P8pkRajfOhWMuB4xfw","title":"Moderator - Words Remain","description":"https://cultclassicrecords.bandcamp.com/album/the-world-within.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/GVglJ_61PhE/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/GVglJ_61PhE/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/GVglJ_61PhE/hqdefault.jpg","width":480,"height":360}},"channelTitle":"TheModeratorMusic","liveBroadcastContent":"none"},"duration":"3 minutes"}')
baptroom.musics.create!(state:'waiting', slug: 'gnjfQKpZNc',json_data: '{"kind":"youtube#searchResult","etag":"\"gMxXHe-zinKdE9lTnzKu8vjcmDI/OiqvN4cY-xU1Wx8zHgnjfQKpZNc\"","id":{"kind":"youtube#video","videoId":"6drfp_3823I"},"snippet":{"publishedAt":"2013-07-26T09:57:05.000Z","channelId":"UC1oCOqdqlNDz5Sxnlk08ZrQ","title":"London Grammar - Strong [Official Video]","description":"The new track “Rooting For You” by London Grammar is out now! ▷ WATCH the official live video here: https://www.youtube.com/watch?v=jqhgXAGP4Ho ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/6drfp_3823I/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/6drfp_3823I/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/6drfp_3823I/hqdefault.jpg","width":480,"height":360}},"channelTitle":"London Grammar","liveBroadcastContent":"none"},"duration":"4 minutes"}')
