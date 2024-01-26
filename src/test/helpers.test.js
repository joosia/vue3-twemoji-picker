import { describe, it, expect } from 'vitest'
import {
  unicodeToEmoji,
  filterEmojis,
  snakeToCapitalizedCase,
} from '../helpers'
import emojis_en from '../data/en/emojis.json'
import emojis_fi from '../data/fi/emojis.json'

describe('helpers', () => {
  // Test unicodeToEmoji
  it('unicodeToEmoji: test valid input', () => {
    expect(unicodeToEmoji('1f602')).toBe('😂')
  })

  // Test filterEmojis
  it('filterEmojis: test search result', () => {
    const result_en = filterEmojis(emojis_en, 'face with tears of joy', [])
    expect(result_en).toStrictEqual({
      smileys_people: [
        {
          n: ['face with tears of joy', 'joy'],
          r: '1f602',
          u: '1f602',
        },
        {
          n: ['cat face with tears of joy', 'joy_cat'],
          r: '1f639',
          u: '1f639',
        },
      ],
    })
    const result_fi = filterEmojis(emojis_fi, 'kuppi', [])
    expect(result_fi).toStrictEqual({
      food_drink: [
        {
          n: ['kahvikuppi'],
          r: '1f375',
          u: '1f375',
        },
        {
          n: ['sakepullo ja -kuppi'],
          r: '1f376',
          u: '1f376',
        },
        {
          n: ['pillillä varustettu kuppi'],
          r: '1f964',
          u: '1f964',
        },
      ],
    })
  })

  // Test snakeToCapitalizedCase
  it('snakeToCapitalizedCase: Test valid input', () => {
    expect(snakeToCapitalizedCase('hello_world_a')).toBe('Hello World A')
  })
})
