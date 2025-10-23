import '@testing-library/jest-dom'

// Relaxed shim for tests: provide minimal globalThis.crypto if not present.
if (typeof (globalThis as any).crypto === 'undefined') {
  const nodeCrypto = require('crypto')
  ;(globalThis as any).crypto = {
    getRandomValues: (arr: Uint8Array) => nodeCrypto.randomFillSync(arr),
    subtle: {
      generateKey: async () => ({}),
      exportKey: async () => ({}),
      importKey: async () => ({}),
      encrypt: async () => new ArrayBuffer(8),
      decrypt: async () => new ArrayBuffer(8)
    }
  }
}
