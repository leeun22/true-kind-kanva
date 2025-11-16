/**
 * This command will generate a random 64 character hex string.
 * node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */

import * as CryptoJS from 'crypto-js'
import BigNumber from 'bignumber.js'

const SECRET_KEY_STRING = process.env.NEXT_PUBLIC_AES_KEY || 'This-is-a-very-secret-key-of-32-bytes'
const KEY = CryptoJS.enc.Utf8.parse(SECRET_KEY_STRING.slice(0, 16))

// Initialization Vector (IV) - MUST be 16 fixed characters.
const IV = CryptoJS.enc.Utf8.parse('1234567890123456')

// Large offset number (BASE_OFFSET)
const BASE_OFFSET_STRING = '100000000000000000000000000000000000000' // ~ 10^38
const BASE_OFFSET = new BigNumber(BASE_OFFSET_STRING)

/**
 * Encodes Internal ID (number) into a secure NUMBER string.
 * Algorithm: AES-CBC -> Hex -> BigNumber (Base-10)
 */
export const encodeId = (internalId: number): string => {
  if (typeof internalId !== 'number' || internalId <= 0) return ''

  try {
    const plaintext = internalId.toString()
    const encrypted = CryptoJS.AES.encrypt(plaintext, KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    // Convert AES (Base-64) result to Hexadecimal
    const hexString = encrypted.ciphertext.toString(CryptoJS.enc.Hex)

    // Convert Hexadecimal to BigNumber (Base-10) and add Offset
    // Initialize BigNumber from Hex string (Base 16)
    const bigNumberHash = new BigNumber(hexString, 16).plus(BASE_OFFSET)

    return bigNumberHash.toString(10) // Get Base-10 string
  } catch (e) {
    console.error('Encoding error:', e)
    return ''
  }
}

/**
 * Decode Hash ID (NUMBER string) into Internal ID (number).
 * Algorithm: Base-10 -> BigNumber -> Hex -> AES-CBC Decrypt
 */
export const decodeId = (hashId: string | null): number | undefined => {
  if (!hashId) return undefined

  // Clean up the Hash ID string
  const cleanHashId = hashId.split('?')[0].split('#')[0]
  if (!/^\d+$/.test(cleanHashId)) return undefined

  try {
    // Convert the number string (Base-10) to BigNumber and subtract Offset
    const bigNumberHash = new BigNumber(cleanHashId)
    const hexBigNumber = bigNumberHash.minus(BASE_OFFSET)

    // Convert BigNumber to Hexadecimal (Base 16)
    // Ensure enough 32 Hex characters (128 bits) for AES Decrypt
    let hexValue = hexBigNumber.toString(16)
    hexValue = hexValue.padStart(32, '0')

    // Restore WordArray from Hexadecimal
    const ciphertextWordArr = CryptoJS.enc.Hex.parse(hexValue)

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: ciphertextWordArr,
      key: KEY,
      iv: IV,
      salt: undefined
    })

    // AES Decryption
    const decrypted = CryptoJS.AES.decrypt(cipherParams, KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    // Convert the decoded WordArray to a string and then to a number
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8)
    const internalId = parseInt(decryptedText, 10)

    return Number.isInteger(internalId) && internalId > 0 ? internalId : undefined
  } catch (e) {
    console.error('Decoding error:', e)
    return undefined
  }
}
