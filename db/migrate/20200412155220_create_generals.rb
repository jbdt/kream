class CreateGenerals < ActiveRecord::Migration
  def change
    create_table :generals do |t|
      t.string :logo
      t.string :top_intro
      t.string :top_current_party
      t.string :top_past_sessions
      t.string :top_contact
      t.string :contact_phone
      t.string :contact_email
      t.string :contact_facebook
      t.string :contact_instagram
      t.string :big_title
      t.string :short_title
      t.string :video_background
      t.string :gif_background
      t.string :button_current_party
      t.string :button_past_sessions
    end
  end
end
