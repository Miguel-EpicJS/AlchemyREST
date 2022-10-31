# Alchemy REST

In the future I project to make this repo the backend of an Alchemy based game, but for now I'm using it to train building REST api's, tests and many other things.

## Current routes:

`/items`

Used to get, create, update and delete the items used for `Alchemy`

Each `item` has an
  `id`: Int type(can change)
  `name`: String type
  `tier`: Int type(can change)
  `stars`: Int type(can change)

Id is used to identify each item
Name is used for... well name the items 
Tier is kind of the 'power level' of the item, for now its an int value that goes from 1 to 10, where 1 is the weakest
Stars is like the rarity of an item, two items with the same name and tier can have different stars;

## Future updates(Possibly?)

I plan to add another property for `item`, the property `attributes`, which would determine if an item can be fused with another and many more fun things.

As for technical updates, one of my plans for near(?) future is to start using a proper database for models, but i don't know which.

