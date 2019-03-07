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

ActiveRecord::Schema.define(version: 2019_03_07_104231) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "greyhound_owners", force: :cascade do |t|
    t.integer "greyhound_id"
    t.integer "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "greyhounds", force: :cascade do |t|
    t.string "name"
    t.string "left_ear"
    t.string "right_ear"
    t.string "sire"
    t.date "birthdate"
    t.string "status"
    t.date "distemper"
    t.date "viral_hepatitis"
    t.date "leptospira_canicola"
    t.date "leptospira_icterihaemorrhagiae"
    t.date "parvovirus"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "sex"
    t.date "date_of_death"
    t.string "details_of_death"
    t.boolean "confirmed"
  end

  create_table "owners", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_greyhounds", force: :cascade do |t|
    t.integer "user_id"
    t.integer "greyhound_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
