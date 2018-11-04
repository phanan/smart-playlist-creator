export default [
  {
    "id": 1541356285385,
    "rules": [
      {
        "id": 1541356313181,
        "model": "interactions.play_count",
        "operator": "is",
        "value": [
          "42"
        ]
      },
      {
        "id": 1541356313183,
        "model": "created_at",
        "operator": "isBetween",
        "value": [
          "2018-01-01",
          "2018-06-01"
        ]
      },
      {
        "id": 1541361996089,
        "model": "genre",
        "operator": "contains",
        "value": [
          "Rock"
        ]
      }
    ]
  },
  {
    "id": 1541356313189,
    "rules": [
      {
        "id": 1541356313199,
        "model": "artist.name",
        "operator": "is",
        "value": [
          "Children of Bodom"
        ]
      },
      {
        "id": 1541361906208,
        "model": "created_at",
        "operator": "notInLast",
        "value": [
          "10"
        ]
      }
    ]
  }
]