export default [
  {
    "model": "title",
    "operator": "~",
    "value": [
      "Night"
    ],
    "logic": "and"
  },
  {
    "model": "album",
    "operator": "!~",
    "value": [
      "wish"
    ],
    "logic": "and"
  },
  {
    "model": "dateAdded",
    "operator": "in",
    "value": [
      "2018-07-11",
      "2018-10-11"
    ],
    "logic": "or"
  }
]