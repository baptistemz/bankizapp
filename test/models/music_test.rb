require "test_helper"

class MusicTest < ActiveSupport::TestCase
  def setup
    @music = Music.new(state:"waiting", room_id: 2, slug:"97ZHVNSYh", json_data: {"kind":"youtube#searchResult","etag":"uQc-MPTsstrHkQcRXL3IWLmeNsM/CNegqP5rrfjYsV4koC97ZHVNSYg","id":{"kind":"youtube#video","videoId":"g66cjRaenHw"},"snippet":{"publishedAt":"2010-07-20T02:54:06.000Z","channelId":"UCWz1npvlrfcGfLWslq-GK4Q","title":"Si yo fuera Maradona - Manu chao  HD","description":"me podran decir que estoy bien o mejor que antes, pero nadie esta dentro mio . Yo se las culpas que tengo Si yo fuera Maradona - Manu chao HD.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/g66cjRaenHw/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/g66cjRaenHw/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/g66cjRaenHw/hqdefault.jpg","width":480,"height":360}},"channelTitle":"matadorkiwi","liveBroadcastContent":"none"},"duration":"4 minutes"})
  end
  test "json_data must be present" do
    @music.json_data = ""
    assert_not @music.save
  end
  test "music slug must be present" do
    @music.slug = ""
    assert_not @music.save
  end
  test "music state must be present" do
    @music.state = ""
    assert_not @music.save
  end
  test "music slug must be unique in same room" do
    @music.slug = "97ZHVNSYg"
    assert_not @music.save
  end
  test "only one music playing per room" do
    @music.state = "playing"
    assert_not @music.save
  end
  test "only one next music" do
    @music.state = "next"
    assert_not @music.save
  end
end
