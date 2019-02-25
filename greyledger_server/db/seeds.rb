# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Greyhound.destroy_all
GreyhoundOwner.destroy_all
Owner.destroy_all
User.destroy_all
UserGreyhound.destroy_all

holly = User.create!(email: "holly@gmail.com", password: "123", first_name: "Holly", last_name: "Atkinson")

bob = Greyhound.create!(
  name: "Quivers Bob",
  left_ear: "ATK",
  right_ear: "BOB1",
  sire: "Black Dog",
  birthdate: Date.parse("05/04/2013"),
  status: "Retired",
  distemper: Date.parse("06/11/2015"),
  viral_hepatitis: Date.parse("06/11/2015"),
  leptospira_canicola: Date.parse("06/11/2015"),
  leptospira_icterihaemorrhagiae: Date.parse("06/11/2015"),
  parvovirus: Date.parse("06/11/2015")
)

blitz = Greyhound.create!(
  name: "Blitz",
  left_ear: "BLI",
  right_ear: "ATK",
  sire: "Grey Runner",
  birthdate: Date.parse("21/12/2011"),
  status: "Racing",
  distemper: Date.parse("06/11/2015"),
  viral_hepatitis: Date.parse("06/11/2015"),
  leptospira_canicola: Date.parse("06/11/2015"),
  leptospira_icterihaemorrhagiae: Date.parse("06/11/2015"),
  parvovirus: Date.parse("06/11/2015")
)

owner1 = Owner.create(first_name: "Lis", last_name: "Clark", address: "8 Haynes Close, London, SE3 9UA")
owner2 = Owner.create(first_name: "Phil", last_name: "Atkinson", address: "4 Lodge Street, Draycott, Derby, DE72 3PR")

greyhound_owner1 = GreyhoundOwner.create!(greyhound_id: bob.id, owner_id: owner1.id)
greyhound_owner2 = GreyhoundOwner.create!(greyhound_id: bob.id, owner_id: owner2.id)
greyhound_owner3 = GreyhoundOwner.create!(greyhound_id: blitz.id, owner_id: owner1.id)
greyhound_owner4 = GreyhoundOwner.create!(greyhound_id: blitz.id, owner_id: owner2.id)

user_greyhound1 = UserGreyhound.create!(user_id: holly.id, greyhound_id: bob.id)
user_greyhound2 = UserGreyhound.create!(user_id: holly.id, greyhound_id: blitz.id)
