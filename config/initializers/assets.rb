# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

Rails.application.config.assets.precompile += %w( front/bootstrap.min.css )
Rails.application.config.assets.precompile += %w( front/carousel.css )
Rails.application.config.assets.precompile += %w( front/animate.css )
Rails.application.config.assets.precompile += %w( front/style.css )
Rails.application.config.assets.precompile += %w( front/prettyPhoto.css )

Rails.application.config.assets.precompile += %w( front/jquery.min.js )
Rails.application.config.assets.precompile += %w( front/bootstrap.min.js )
Rails.application.config.assets.precompile += %w( front/carousel.js )
Rails.application.config.assets.precompile += %w( front/animate.js )
Rails.application.config.assets.precompile += %w( front/custom.js )
Rails.application.config.assets.precompile += %w( front/videobg.js )
Rails.application.config.assets.precompile += %w( front/jquery.prettyPhoto.js )

Rails.application.config.assets.precompile += %w( back/bootstrap.css )
Rails.application.config.assets.precompile += %w( back/custom.css )
Rails.application.config.assets.precompile += %w( back/font-awesome.css )

Rails.application.config.assets.precompile += %w( back/custom.js )
Rails.application.config.assets.precompile += %w( back/jquery.min.js )
