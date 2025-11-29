import '@testing-library/jest-dom'

// Relaxed shim for tests: provide minimal globalThis.crypto if not present.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof (globalThis as any).crypto === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeCrypto = require('crypto')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ; (globalThis as any).crypto = {
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
