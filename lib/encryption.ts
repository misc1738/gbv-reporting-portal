/**
 * Client-side encryption utilities for evidence files
 * Uses Web Crypto API for secure encryption before upload
 */

/**
 * Generates a new AES-GCM encryption key.
 * 
 * @returns A promise that resolves to a CryptoKey.
 */
export async function generateEncryptionKey(): Promise<CryptoKey> {
  // AES-GCM is an authenticated encryption mode that provides both confidentiality and data integrity.
  // We use 256-bit keys for strong security.
  // TODO: For a production system, consider implementing a key rotation strategy where keys are
  // periodically rotated and old data is re-encrypted or accessible via archived keys.
  return await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  )
}

/**
 * Encrypts a file using the provided key.
 * 
 * @param file - The file to encrypt.
 * @param key - The encryption key.
 * @returns A promise that resolves to an object containing the encrypted data and the initialization vector (IV).
 */
export async function encryptFile(file: File, key: CryptoKey): Promise<{ encryptedData: ArrayBuffer; iv: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const fileData = await file.arrayBuffer()

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    fileData,
  )

  return { encryptedData, iv }
}

/**
 * Decrypts encrypted data using the provided key and IV.
 * 
 * @param encryptedData - The encrypted data as an ArrayBuffer.
 * @param key - The decryption key.
 * @param iv - The initialization vector used for encryption.
 * @returns A promise that resolves to the decrypted data as an ArrayBuffer.
 */
export async function decryptFile(encryptedData: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> {
  return await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv as unknown as BufferSource,
    },
    key,
    encryptedData,
  )
}

/**
 * Exports a CryptoKey to a JWK (JSON Web Key) string.
 * 
 * @param key - The key to export.
 * @returns A promise that resolves to the stringified JWK.
 */
export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey("jwk", key)
  return JSON.stringify(exported)
}

/**
 * Imports a CryptoKey from a JWK string.
 * 
 * @param keyData - The stringified JWK.
 * @returns A promise that resolves to the imported CryptoKey.
 */
export async function importKey(keyData: string): Promise<CryptoKey> {
  const keyObject = JSON.parse(keyData)
  return await crypto.subtle.importKey(
    "jwk",
    keyObject,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  )
}

/**
 * Converts an ArrayBuffer to a Base64 string.
 * 
 * @param buffer - The buffer to convert.
 * @returns The Base64 string representation.
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/**
 * Converts a Base64 string to an ArrayBuffer.
 * 
 * @param base64 - The Base64 string to convert.
 * @returns The ArrayBuffer representation.
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}
