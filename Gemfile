source 'https://rubygems.org'

ruby '2.3.3'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '5.0.0.1'
# Use sqlite3 as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby
gem 'redis', '~>3.2'
gem 'puma', '~> 3.0'
gem 'sidekiq'
gem 'sinatra', github: 'sinatra'
gem 'sidekiq-failures'
# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring',        group: :development

gem 'enumerize'

gem 'react-rails'
gem 'browserify-rails'

gem 'devise'
gem 'jwt'
gem 'active_model_serializers', '~> 0.10.4'

gem 'pundit'

gem 'materialize-sass'

gem 'friendly_id', '~> 5.1.0'
gem 'nested-hstore'
gem 'figaro'

gem 'gibbon'

gem 'remotipart', github: 'mshibuya/remotipart'
gem 'rails_admin', '>= 1.0.0.rc'

group :development, :test do
  gem 'letter_opener'
  gem 'binding_of_caller'
  gem 'better_errors'
  gem 'capybara'
  gem 'poltergeist'
  gem 'launchy'
  gem 'minitest-reporters'
  # gem 'rspec-rails', '~> 3.5'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
end

group :production do
  gem 'rails_12factor'
end
