# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20200412155220) do

  create_table "generals", force: :cascade do |t|
    t.string "logo",                 limit: 255
    t.string "top_intro",            limit: 255
    t.string "top_current_party",    limit: 255
    t.string "top_past_sessions",    limit: 255
    t.string "top_contact",          limit: 255
    t.string "contact_phone",        limit: 255
    t.string "contact_email",        limit: 255
    t.string "contact_facebook",     limit: 255
    t.string "contact_instagram",    limit: 255
    t.string "big_title",            limit: 255
    t.string "short_title",          limit: 255
    t.string "video_background",     limit: 255
    t.string "gif_background",       limit: 255
    t.string "button_current_party", limit: 255
    t.string "button_past_sessions", limit: 255
  end

end
