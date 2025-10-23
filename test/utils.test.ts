import { describe, it, expect } from 'vitest'
import { cn } from '../lib/utils'
import { arrayBufferToBase64, base64ToArrayBuffer } from '../lib/encryption'

describe('utils', () => {
  it('cn merges class names', () => {
    const out = cn('a', { b: true }, ['c'])
    expect(typeof out).toBe('string')
    expect(out).toContain('a')
  })

  it('base64 round trip', () => {
    const buf = new Uint8Array([1, 2, 3, 4]).buffer
    const b64 = arrayBufferToBase64(buf)
    expect(typeof b64).toBe('string')
    const buf2 = base64ToArrayBuffer(b64)
    expect(buf2.byteLength).toBe(4)
    const a = new Uint8Array(buf2)
    expect(Array.from(a)).toEqual([1, 2, 3, 4])
  })
})
