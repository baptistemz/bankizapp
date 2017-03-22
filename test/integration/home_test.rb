require "test_helper"

class HomeTest < ActionDispatch::IntegrationTest
  test "home page loads correctly" do
    visit "/"
    assert_equal 200, page.status_code
    assert page.has_content?("Collaborative music mix")
  end
end
