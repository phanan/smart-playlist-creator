export default [
  {
    "logic": "and",
    "model": "title",
    "operator": "~",
    "value": [
      "Wut"
    ]
  },
  {
    "logic": "and",
    "model": "album",
    "operator": "!~",
    "value": [
      "Bright"
    ]
  },
  {
    "logic": "or",
    "model": "dateAdded",
    "operator": "in",
    "value": [
      "2018-07-11",
      "2018-10-11"
    ]
  },
  {
    "logic": "and",
    "model": "lastPlayed",
    "operator": "=",
    "value": [
      "2013-05-02"
    ]
  },
  {
    "logic": "or",
    "model": "bit_rate",
    "operator": ">",
    "value": [
      "127"
    ]
  }
]