use groupProject;
db.dropDatabase();

db.dungeon.insertMany([
  {
    'name': "heroCards",
    'cards': [
      {
        'name': 'Barbarian',
        'hitpoints': 4,
        'img': 'images/Barbarian.jpeg'
      },
      {
        'name': 'Leather Shield',
        'hitpoints': 3,
        'img': 'images/LeatherShield.jpeg'
      },
      {
        'name': 'Chainmail',
        'hitpoints': 4,
        'img': 'images/Chainmail.jpeg'
      },
      {
        'name': 'Vorpal Axe',
        'type': 'Vorpal Axe',
        'hitpoints': 0,
        'img': 'images/VorpalAxe.jpeg'
      },
      {
        'name': 'Healing Potion',
        'type': 'Healing Potion',
        'hitpoints': 0,
        'img': 'images/HealingPotion.jpeg'
      },
      {
        'name': 'Torch',
        'type': 'Torch',
        'hitpoints': 0,
        'img': 'images/Torch.jpeg'
      },
      {
        'name': 'War Hammer',
        'type': 'War Hammer',
        'hitpoints': 0,
        'img': 'images/WarHammer.jpeg'
      },
    ]
  },
  {'name': 'playersArray',
  'players': [
    {
      'name': 'Tom',
      'pass': false,
      'win': 0,
      'life': 2
    },
    {
      'name': 'Sandy',
      'pass': false,
      'win': 0,
      'life': 2
    },
    {
      'name': 'Bob',
      'pass': false,
      'win': 0,
      'life': 2
    }
  ]

  },
  {
    'name': 'monsterCards',
    'cards': [
      {
        'name': 'Small Goblin',
        'strength': 1,
        'weakness': 'Torch',
        'img': 'images/SmallGoblin.jpeg'
      },
      {
        'name': 'Small goblin',
        'strength': 1,
        'weakness': 'Torch',
        'img': 'images/SmallGoblin.jpeg'
      },
      {
        'name': 'Skeleton',
        'strength': 2,
        'weakness': 'Torch',
        'img': 'images/Skeleton.jpeg'
      },
      {
        'name': 'Skeleton',
        'strength': 2,
        'weakness': 'Torch',
        'img': 'images/Skeleton.jpeg'
      },
      {
        'name': 'Ork',
        'strength': 3,
        'weakness': 'Torch',
        'img': 'images/Ork.jpeg'
      },
      {
        'name': 'Ork',
        'strength': 3,
        'weakness': 'Torch',
        'img': 'images/Ork.jpeg'
      },
      {
        'name': 'Vampire',
        'strength': 4,
        'weakness': 'Torch',
        'img': 'images/Vampire2.jpeg'
      },
      {
        'name': 'Vampire',
        'strength': 4,
        'weakness': 'Torch',
        'img': 'images/Vampire2.jpeg'
      },
      {
       'name': 'Golem',
       'strength': 5,
       'weakness': 'War Hammer',
       'img': 'images/Golem.jpeg'
     },
     {
      'name': 'Golem',
      'strength': 5,
      'weakness': 'War Hammer',
      'img': 'images/Golem.jpeg'
    },
    {
      'name': 'Death',
      'strength': 6,
      'img': 'images/Death.jpeg'
    },
    {
      'name': 'Deamon',
      'strength': 7,
      'img': 'images/Deamon.jpeg'
    },
    {
      'name': 'Dragon',
      'strength': 9,
      'weakness': 'Vorpal Axe',
      'img': 'images/Dragon.jpeg'
    },
    ]
  }

])






//
//
//
