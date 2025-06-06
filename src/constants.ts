import { PublicKey } from '@solana/web3.js'
import { FAKE_TOKEN_MINT, PoolToken, TokenMeta, makeHeliusTokenFetcher } from 'gamba-react-ui-v2'

// Get RPC from the .env file or default to the public RPC.
export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT ?? 'https://api.mainnet-beta.solana.com'

// Solana address that will receive fees when somebody plays on this platform
export const PLATFORM_CREATOR_ADDRESS = new PublicKey('7FT5qA89b35taaXVtMN61BjskoCVq6AD3PHarP7iFxFe',)

// Gamba explorer URL - Appears in RecentPlays
export const EXPLORER_URL = 'https://explorer.gamba.so'

// Platform URL - Appears in ShareModal
export const PLATFORM_SHARABLE_URL = 'play.gamba.so'

// Creator fee (in %)
export const PLATFORM_CREATOR_FEE = 4 // 1% !!max 5%!!

// Jackpot fee (in %)
export const PLATFORM_JACKPOT_FEE = 0.001 // 0.1%

// Referral fee (in %)
export const PLATFORM_REFERRAL_FEE = 0.0025 // 0.25%

/** If the user should be able to revoke an invite after they've accepted an invite */
export const PLATFORM_ALLOW_REFERRER_REMOVAL = true

// Just a helper function
const lp = (tokenMint: PublicKey | string, poolAuthority?: PublicKey | string): PoolToken => ({
  token: new PublicKey(tokenMint),
  authority: poolAuthority !== undefined ? new PublicKey(poolAuthority) : undefined,
})

/**
 * List of pools supported by this platform
 * Make sure the token you want to list has a corresponding pool on https://explorer.gamba.so/pools
 * For private pools, add the creator of the Liquidity Pool as a second argument
 */
export const POOLS = [
  // Fake token:
  lp(FAKE_TOKEN_MINT),

  // SOL:
  lp('So11111111111111111111111111111111111111112'),
]

// The default token to be selected
export const DEFAULT_POOL = POOLS[0]

/**
 * List of token metadata for the supported tokens
 * Alternatively, we can provide a fetcher method to automatically fetch metdata. See TOKEN_METADATA_FETCHER below.
 */
export const TOKEN_METADATA: (Partial<TokenMeta> & {mint: PublicKey})[] = [
  {
    mint: FAKE_TOKEN_MINT,
    name: 'Fake',
    symbol: 'דמו',
    image: '/fakemoney.png',
    baseWager: 1e9,
    decimals: 9,
    usdPrice: 0,
  },
  {
    mint: new PublicKey('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'),
    name: 'W',
    symbol: 'Wormhole',
    image: 'https://wormhole.com/token.png',
    baseWager: 1e6,
    decimals: 6,
    usdPrice: 0,
  },
]

/** HTML to display to user that they need to accept in order to continue */
export const TOS_HTML = `
  <p><b>1. דרישת גיל:</b> יש להיות בני 18 ומעלה.</p>
<p><b>2. הכרת סיכון:</b> המשחקים כוללים סיכון; אין הבטחת זכיות.</p>
<p><b>3. ללא אחריות:</b> המשחקים ניתנים "כפי שהם"; פועלים באקראיות.</p>
<p><b>4. הגבלת אחריות:</b> איננו אחראים לכל נזק שייגרם.</p>
<p><b>5. משחק הוגן:</b> המשחקים מתנהלים בהוגנות ובשקיפות.</p>
<p><b>6. פרטיות נתונים:</b> פרטיות המשתמש חשובה לנו.</p>
<p><b>7. משחק אחראי:</b> שחקו באחריות; פנו לעזרה במידת הצורך.</p>
`

/**
 * A method for automatically fetching Token Metadata.
 * Here we create a fetcher that uses Helius metadata API, if an API key exists as an environment variable.
 */
export const TOKEN_METADATA_FETCHER = (
  () => {
    if (import.meta.env.VITE_HELIUS_API_KEY) {
      return makeHeliusTokenFetcher(
        import.meta.env.VITE_HELIUS_API_KEY,
        { dollarBaseWager: 1 },
      )
    }
  }
)()
