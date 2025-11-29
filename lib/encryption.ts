/**
 * Client-side encryption utilities for evidence files
 * Uses Web Crypto API for secure encryption before upload
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

export async function decryptFile(encryptedData: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> {
  return await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedData,
  )
}

export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey("jwk", key)
  return JSON.stringify(exported)
}

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

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}
