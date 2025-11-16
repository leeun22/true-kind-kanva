// /**
//  * This command will generate a random 64 character hex string.
//  * node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
//  */

// import Hashids from 'hashids'

// // Initialize Hashids with salt and min length (should use environment variable for salt)
// const hashids = new Hashids(
//   process.env.NEXT_PUBLIC_HASH_SALT || 'default_secret_salt',
//   10 // Minimum length of Hash ID
// )

// /**
//  * Encode Internal ID (number) to Hash ID (string).
//  * @param internalId Internal ID (integer)
//  * @returns Hash ID (string)
//  */
// export const encodeId = (internalId: number): string => {
//   return hashids.encode(internalId)
// }

// /**
//  * Decode Hash ID (string) to Internal ID (number).
//  * @param hashId Hash ID (string) from URL
//  * @returns Internal ID (integer) or undefined
//  */
// export const decodeId = (hashId: string | null): number | undefined => {
//   if (!hashId) return undefined
//   const decoded = hashids.decode(hashId)
//   return decoded.length > 0 ? (decoded[0] as number) : undefined
// }
