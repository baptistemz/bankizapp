require "test_helper"

class RoomTest < ActiveSupport::TestCase
  def setup
    @room = Room.new(slug: 'la-room-qui-pete', name: 'La Room qui pète', strangers_number: 2)
  end
  test "room name must be present" do
    @room.name = ""
    assert_not @room.save
  end
  test "room slug must be present" do
    @room.slug = ""
    assert_not @room.save
  end
  test "room name must be unique" do
    @room.name = "New Year"
    @room.save
    assert_not @room.save
  end
  test "strangers_number must not be negative" do
    @room.strangers_number = -1
    @room.save
    assert_not @room.save
  end
  test "room slug must be unique" do
    @room.slug = "new-year"
    @room.save
    assert_not @room.save
  end
end
