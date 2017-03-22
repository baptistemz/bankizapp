require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(username: 'John', email: 'john@example.com', password:'12345678', password_confirmation:'12345678')
  end
  test "username must be present" do
    @user.username = ""
    assert_not @user.save
  end
  test "email must be present" do
    @user.username = ""
    assert_not @user.save
  end
  test "username must be unique" do
    @user.username = "Rudy"
    @user.save
    assert_not @user.save
  end
  test "email must be unique" do
    @user.email = "rudy@abitbol.com"
    @user.save
    assert_not @user.save
  end
end
