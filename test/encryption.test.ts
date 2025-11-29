import { describe, it, expect } from 'vitest';
import { generateEncryptionKey, encryptFile, decryptFile, exportKey, importKey, arrayBufferToBase64, base64ToArrayBuffer } from '../lib/encryption';

// Polyfill for Web Crypto API in Node.js environment if needed
// Vitest with jsdom environment should have it, but just in case
if (!global.crypto) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { webcrypto } = require('node:crypto');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.crypto = webcrypto as any;
}

describe('Encryption Utilities', () => {
    it('should generate a valid encryption key', async () => {
        const key = await generateEncryptionKey();
        expect(key).toBeDefined();
        expect(key.algorithm.name).toBe('AES-GCM');
    });

    it('should encrypt and decrypt a file correctly', async () => {
        const key = await generateEncryptionKey();
        const content = 'Hello, World!';
        const file = new File([content], 'test.txt', { type: 'text/plain' });

        // Workaround for jsdom/node environment where File.arrayBuffer might be missing
        if (!file.arrayBuffer) {
            file.arrayBuffer = async () => {
                return new TextEncoder().encode(content).buffer;
            };
        }

        const { encryptedData, iv } = await encryptFile(file, key);
        expect(encryptedData).toBeDefined();
        expect(iv).toBeDefined();

        const decryptedBuffer = await decryptFile(encryptedData, key, iv);
        const decoder = new TextDecoder();
        const decryptedContent = decoder.decode(decryptedBuffer);

        expect(decryptedContent).toBe(content);
    });

    it('should export and import a key correctly', async () => {
        const originalKey = await generateEncryptionKey();
        const exportedKey = await exportKey(originalKey);

        expect(typeof exportedKey).toBe('string');

        const importedKey = await importKey(exportedKey);
        expect(importedKey).toBeDefined();
        expect(importedKey.algorithm.name).toBe('AES-GCM');
    });

    it('should convert ArrayBuffer to Base64 and back', () => {
        const content = 'Test Content';
        const encoder = new TextEncoder();
        const buffer = encoder.encode(content).buffer;

        const base64 = arrayBufferToBase64(buffer);
        expect(typeof base64).toBe('string');

        const resultBuffer = base64ToArrayBuffer(base64);
        const decoder = new TextDecoder();
        const resultContent = decoder.decode(resultBuffer);

        expect(resultContent).toBe(content);
    });
});
