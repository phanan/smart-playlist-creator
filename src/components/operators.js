export const is = {
  operator: '=',
  label: 'is'
}

export const isNot = {
  operator: '!=',
  label: 'is not'
}

export const contains = {
  operator: '~',
  label: 'contains'
}

export const notContain = {
  operator: '!~',
  label: 'does not contain',
}

export const isBetween = {
  operator: 'in',
  label: 'is between',
  inputs: 2
}

export const isGreaterThan = {
  operator: '>',
  label: 'is greater than',
}

export const isLessThan = {
  operator: '<',
  label: 'is less than',
}

export const beginsWith = {
  operator: '^=',
  label: 'begins with',
}

export const endsWith = {
  operator: '$=',
  label: 'ends with',
}

export const inLast = {
  operator: 'inLast',
  label: 'in the last',
  type: 'number', // overriding
  unit: 'days'
}

export const notInLast = {
  operator: '!inLast',
  label: 'not in the last',
  type: 'number', // overriding
  unit: 'days'
}