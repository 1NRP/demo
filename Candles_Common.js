/**
 * Generated In Perplexity Labs. Contains Popular Candles From TA-Lib C/C++ Library.
 * TA-Lib Candlestick Pattern Recognition - JavaScript Implementation
 *
 * This is a JavaScript port of the TA-Lib candlestick pattern recognition functions.
 * Based on the original C implementation by Mario Fortier and the TA-Lib team.
 *
 * Returns:
 * - 100: Bullish pattern detected
 * - -100: Bearish pattern detected
 * - 0: No pattern detected
 *
 * Usage:
 * const result = HAMMER(open, high, low, close);
 *
 * @author JavaScript port implementation
 * @version 1.0.0
 */

// Utility constants and helper functions
const CANDLEAVGPERIOD = {
	BodyVeryLong: 10,
	BodyLong: 10,
	BodyShort: 10,
	BodyDoji: 10,
	ShadowVeryLong: 10,
	ShadowLong: 10,
	ShadowVeryShort: 10,
	ShadowShort: 10,
	Near: 5,
	Far: 5,
	Equal: 5,
}

// Helper functions matching TA-Lib macros
function REALBODY(open, close) {
	return Math.abs(close - open)
}

function UPPERSHADOW(open, high, close) {
	return high - Math.max(open, close)
}

function LOWERSHADOW(open, low, close) {
	return Math.min(open, close) - low
}

function CANDLERANGE(type, index, open, high, low, close) {
	const range = high - low
	return range === 0 ? 0.000001 : range
}

function CANDLEAVERAGE(type, period, index, open, high, low, close) {
	// Simplified averaging for JavaScript implementation
	const threshold = {
		BodyShort: 0.1,
		BodyLong: 0.6,
		BodyVeryLong: 0.9,
		BodyDoji: 0.05,
		ShadowShort: 0.1,
		ShadowLong: 0.6,
		ShadowVeryShort: 0.05,
		ShadowVeryLong: 2.0,
		Near: 0.2,
		Far: 0.6,
		Equal: 0.05,
	}

	const range = high - low
	return range * (threshold[type] || 0.1)
}

function REALBODYGAPUP(i, j, open, close) {
	return Math.min(open[i], close[i]) > Math.max(open[j], close[j])
}

function REALBODYGAPDOWN(i, j, open, close) {
	return Math.max(open[i], close[i]) < Math.min(open[j], close[j])
}

// Main pattern recognition functions

/**
 * Two Crows - Bearish reversal pattern
 */
function C2CROWS(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		// First candle: long white body
		const body1 = REALBODY(open[i - 2], close[i - 2])
		const isWhite1 = close[i - 2] > open[i - 2]

		// Second candle: black body that gaps up but closes within first candle
		const body2 = REALBODY(open[i - 1], close[i - 1])
		const isBlack2 = close[i - 1] < open[i - 1]
		const gapsUp2 = open[i - 1] > close[i - 2]
		const closesWithin2 = close[i - 1] > open[i - 2] && close[i - 1] < close[i - 2]

		// Third candle: black body that gaps up but closes within second candle
		const body3 = REALBODY(open[i], close[i])
		const isBlack3 = close[i] < open[i]
		const gapsUp3 = open[i] > close[i - 1]
		const closesWithin3 = close[i] > open[i - 1] && close[i] < close[i - 1]

		if (
			isWhite1 && isBlack2 && isBlack3 && gapsUp2 && gapsUp3 &&
			closesWithin2 && closesWithin3
		) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Three Black Crows - Strong bearish reversal pattern
 */
function C3BLACKCROWS(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		// Three consecutive black candles
		const isBlack1 = close[i - 2] < open[i - 2]
		const isBlack2 = close[i - 1] < open[i - 1]
		const isBlack3 = close[i] < open[i]

		// Each opens within previous body and closes lower
		const opensWithin2 = open[i - 1] < open[i - 2] && open[i - 1] > close[i - 2]
		const opensWithin3 = open[i] < open[i - 1] && open[i] > close[i - 1]

		const closesLower2 = close[i - 1] < close[i - 2]
		const closesLower3 = close[i] < close[i - 1]

		if (
			isBlack1 && isBlack2 && isBlack3 &&
			opensWithin2 && opensWithin3 &&
			closesLower2 && closesLower3
		) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Three Inside Up/Down - Reversal pattern
 */
function C3INSIDE(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		// Check for Three Inside Up (bullish)
		const isBlack1 = close[i - 2] < open[i - 2]
		const isWhite2 = close[i - 1] > open[i - 1]
		const isWhite3 = close[i] > open[i]

		// Second candle engulfed within first
		const engulfed2 = open[i - 1] > close[i - 2] && open[i - 1] < open[i - 2] &&
			close[i - 1] < open[i - 2] && close[i - 1] > close[i - 2]

		// Third candle closes above first candle's open
		const closesAbove3 = close[i] > open[i - 2]

		if (isBlack1 && isWhite2 && isWhite3 && engulfed2 && closesAbove3) {
			result[i] = 100
		}

		// Check for Three Inside Down (bearish)
		const isWhite1 = close[i - 2] > open[i - 2]
		const isBlack2 = close[i - 1] < open[i - 1]
		const isBlack3 = close[i] < open[i]

		const engulfedDown2 = open[i - 1] < close[i - 2] && open[i - 1] > open[i - 2] &&
			close[i - 1] > open[i - 2] && close[i - 1] < close[i - 2]

		const closesBelow3 = close[i] < open[i - 2]

		if (isWhite1 && isBlack2 && isBlack3 && engulfedDown2 && closesBelow3) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Three-Line Strike
 */
function C3LINESTRIKE(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 3; i < open.length; i++) {
		// Bullish strike: three black candles followed by white engulfing candle
		const isBlack1 = close[i - 3] < open[i - 3]
		const isBlack2 = close[i - 2] < open[i - 2]
		const isBlack3 = close[i - 1] < open[i - 1]
		const isWhite4 = close[i] > open[i]

		const descendingCloses = close[i - 2] < close[i - 3] && close[i - 1] < close[i - 2]
		const engulfs4 = open[i] < close[i - 1] && close[i] > open[i - 3]

		if (isBlack1 && isBlack2 && isBlack3 && isWhite4 && descendingCloses && engulfs4) {
			result[i] = 100
		}

		// Bearish strike: three white candles followed by black engulfing candle
		const isWhite1 = close[i - 3] > open[i - 3]
		const isWhite2 = close[i - 2] > open[i - 2]
		const isWhite3 = close[i - 1] > open[i - 1]
		const isBlack4 = close[i] < open[i]

		const ascendingCloses = close[i - 2] > close[i - 3] && close[i - 1] > close[i - 2]
		const engulfsDown4 = open[i] > close[i - 1] && close[i] < open[i - 3]

		if (isWhite1 && isWhite2 && isWhite3 && isBlack4 && ascendingCloses && engulfsDown4) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Three Outside Up/Down
 */
function C3OUTSIDE(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		// Three Outside Up (bullish)
		const isBlack1 = close[i - 2] < open[i - 2]
		const isWhite2 = close[i - 1] > open[i - 1]
		const isWhite3 = close[i] > open[i]

		// Second engulfs first
		const engulfs2 = open[i - 1] < close[i - 2] && close[i - 1] > open[i - 2]
		// Third closes higher than second
		const higherClose3 = close[i] > close[i - 1]

		if (isBlack1 && isWhite2 && isWhite3 && engulfs2 && higherClose3) {
			result[i] = 100
		}

		// Three Outside Down (bearish)
		const isWhite1 = close[i - 2] > open[i - 2]
		const isBlack2 = close[i - 1] < open[i - 1]
		const isBlack3 = close[i] < open[i]

		const engulfsDown2 = open[i - 1] > close[i - 2] && close[i - 1] < open[i - 2]
		const lowerClose3 = close[i] < close[i - 1]

		if (isWhite1 && isBlack2 && isBlack3 && engulfsDown2 && lowerClose3) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Three Stars In The South - Bullish reversal pattern
 */
function C3STARSINSOUTH(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		// All three candles are black
		const isBlack1 = close[i - 2] < open[i - 2]
		const isBlack2 = close[i - 1] < open[i - 1]
		const isBlack3 = close[i] < open[i]

		// First: long black candle with long lower shadow
		const longBody1 = REALBODY(open[i - 2], close[i - 2]) >
			CANDLEAVERAGE('BodyLong', i - 2, i - 2, open[i - 2], high[i - 2], low[i - 2], close[i - 2])
		const longLowerShadow1 = LOWERSHADOW(open[i - 2], low[i - 2], close[i - 2]) >
			CANDLEAVERAGE('ShadowLong', i - 2, i - 2, open[i - 2], high[i - 2], low[i - 2], close[i - 2])

		// Second: smaller black candle that gaps down
		const smallerBody2 = REALBODY(open[i - 1], close[i - 1]) < REALBODY(open[i - 2], close[i - 2])
		const gapsDown2 = high[i - 1] < low[i - 2]

		// Third: small black candle that gaps down but closes above previous low
		const smallBody3 = REALBODY(open[i], close[i]) < REALBODY(open[i - 1], close[i - 1])
		const gapsDown3 = high[i] < low[i - 1]
		const closesAboveLow3 = close[i] > low[i - 1]

		if (
			isBlack1 && isBlack2 && isBlack3 && longBody1 && longLowerShadow1 &&
			smallerBody2 && gapsDown2 && smallBody3 && gapsDown3 && closesAboveLow3
		) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Three Advancing White Soldiers - Strong bullish pattern
 */
function C3WHITESOLDIERS(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		// Three consecutive white candles
		const isWhite1 = close[i - 2] > open[i - 2]
		const isWhite2 = close[i - 1] > open[i - 1]
		const isWhite3 = close[i] > open[i]

		// Each opens within previous body and closes higher
		const opensWithin2 = open[i - 1] > open[i - 2] && open[i - 1] < close[i - 2]
		const opensWithin3 = open[i] > open[i - 1] && open[i] < close[i - 1]

		const closesHigher2 = close[i - 1] > close[i - 2]
		const closesHigher3 = close[i] > close[i - 1]

		// Bodies should be roughly equal size
		const body1 = REALBODY(open[i - 2], close[i - 2])
		const body2 = REALBODY(open[i - 1], close[i - 1])
		const body3 = REALBODY(open[i], close[i])

		const similarBodies = Math.abs(body2 - body1) / body1 < 0.3 &&
			Math.abs(body3 - body2) / body2 < 0.3

		if (
			isWhite1 && isWhite2 && isWhite3 &&
			opensWithin2 && opensWithin3 &&
			closesHigher2 && closesHigher3 && similarBodies
		) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Abandoned Baby - Strong reversal pattern
 */
function ABANDONEDBABY(open, high, low, close, penetration = 0.3) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		// Bullish Abandoned Baby
		const isBlack1 = close[i - 2] < open[i - 2]
		const isDoji2 = Math.abs(close[i - 1] - open[i - 1]) <=
			CANDLEAVERAGE('BodyDoji', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])
		const isWhite3 = close[i] > open[i]

		// Doji gaps down from first candle and third gaps up from doji
		const gapsDown2 = high[i - 1] < Math.min(open[i - 2], close[i - 2])
		const gapsUp3 = low[i] > high[i - 1]

		// Third candle penetrates well into first candle's body
		const penetrates3 = close[i] > open[i - 2] + penetration * REALBODY(open[i - 2], close[i - 2])

		if (isBlack1 && isDoji2 && isWhite3 && gapsDown2 && gapsUp3 && penetrates3) {
			result[i] = 100
		}

		// Bearish Abandoned Baby
		const isWhite1 = close[i - 2] > open[i - 2]
		const isBlack3 = close[i] < open[i]

		const gapsUp2 = low[i - 1] > Math.max(open[i - 2], close[i - 2])
		const gapsDown3 = high[i] < low[i - 1]

		const penetratesDown3 = close[i] < open[i - 2] - penetration * REALBODY(open[i - 2], close[i - 2])

		if (isWhite1 && isDoji2 && isBlack3 && gapsUp2 && gapsDown3 && penetratesDown3) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Belt-hold (Yorikiri) - Continuation pattern
 */
function BELTHOLD(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 0; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const isLongBody = body > CANDLEAVERAGE('BodyLong', i, i, open[i], high[i], low[i], close[i])

		// Bullish Belt Hold: white candle opening at low of the day
		if (
			close[i] > open[i] && isLongBody &&
			Math.abs(open[i] - low[i]) <= CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])
		) {
			result[i] = 100
		}

		// Bearish Belt Hold: black candle opening at high of the day
		if (
			close[i] < open[i] && isLongBody &&
			Math.abs(open[i] - high[i]) <= CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])
		) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Doji - Market indecision pattern
 */
function DOJI(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 0; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const isDoji = body <= CANDLEAVERAGE('BodyDoji', i, i, open[i], high[i], low[i], close[i])

		if (isDoji) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Dragonfly Doji - Bullish reversal when at bottom
 */
function DRAGONFLYDOJI(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 0; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		const isDoji = body <= CANDLEAVERAGE('BodyDoji', i, i, open[i], high[i], low[i], close[i])
		const noUpperShadow = upperShadow <= CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])
		const longLowerShadow = lowerShadow >= CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])

		if (isDoji && noUpperShadow && longLowerShadow) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Gravestone Doji - Bearish reversal when at top
 */
function GRAVESTONEDOJI(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 0; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		const isDoji = body <= CANDLEAVERAGE('BodyDoji', i, i, open[i], high[i], low[i], close[i])
		const longUpperShadow = upperShadow >= CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])
		const noLowerShadow = lowerShadow <= CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])

		if (isDoji && longUpperShadow && noLowerShadow) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Long Legged Doji - High volatility with indecision
 */
function LONGLEGGEDDOJI(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 0; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		const isDoji = body <= CANDLEAVERAGE('BodyDoji', i, i, open[i], high[i], low[i], close[i])
		const longUpperShadow = upperShadow >= CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])
		const longLowerShadow = lowerShadow >= CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])

		if (isDoji && longUpperShadow && longLowerShadow) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Hammer - Bullish reversal pattern
 */
function HAMMER(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		// Small real body
		const smallBody = body < CANDLEAVERAGE('BodyShort', i, i, open[i], high[i], low[i], close[i])
		// Long lower shadow
		const longLowerShadow = lowerShadow > CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])
		// Very short upper shadow
		const shortUpperShadow = upperShadow < CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])
		// Body near or below previous candle's low
		const nearPreviousLow = Math.min(close[i], open[i]) <=
			low[i - 1] + CANDLEAVERAGE('Near', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])

		if (smallBody && longLowerShadow && shortUpperShadow && nearPreviousLow) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Hanging Man - Bearish reversal pattern (same shape as hammer but in uptrend)
 */
function HANGINGMAN(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		// Small real body
		const smallBody = body < CANDLEAVERAGE('BodyShort', i, i, open[i], high[i], low[i], close[i])
		// Long lower shadow
		const longLowerShadow = lowerShadow > CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])
		// Very short upper shadow
		const shortUpperShadow = upperShadow < CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])
		// Body above or near previous candle's high
		const nearPreviousHigh = Math.min(close[i], open[i]) >=
			high[i - 1] - CANDLEAVERAGE('Near', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])

		if (smallBody && longLowerShadow && shortUpperShadow && nearPreviousHigh) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Inverted Hammer - Bullish reversal pattern
 */
function INVERTEDHAMMER(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		// Small real body
		const smallBody = body < CANDLEAVERAGE('BodyShort', i, i, open[i], high[i], low[i], close[i])
		// Long upper shadow
		const longUpperShadow = upperShadow > CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])
		// Very short lower shadow
		const shortLowerShadow = lowerShadow < CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])
		// Body below or near previous candle's low
		const nearPreviousLow = Math.max(close[i], open[i]) <=
			low[i - 1] + CANDLEAVERAGE('Near', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])

		if (smallBody && longUpperShadow && shortLowerShadow && nearPreviousLow) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Shooting Star - Bearish reversal pattern
 */
function SHOOTINGSTAR(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		// Small real body
		const smallBody = body < CANDLEAVERAGE('BodyShort', i, i, open[i], high[i], low[i], close[i])
		// Long upper shadow
		const longUpperShadow = upperShadow > CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])
		// Very short lower shadow
		const shortLowerShadow = lowerShadow < CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])
		// Body above or near previous candle's high
		const nearPreviousHigh = Math.min(close[i], open[i]) >=
			high[i - 1] - CANDLEAVERAGE('Near', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])

		if (smallBody && longUpperShadow && shortLowerShadow && nearPreviousHigh) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Engulfing Pattern - Strong reversal pattern
 */
function ENGULFING(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		// Bullish Engulfing
		const isBlack1 = close[i - 1] < open[i - 1]
		const isWhite2 = close[i] > open[i]
		const engulfs = open[i] <= close[i - 1] && close[i] >= open[i - 1] &&
			REALBODY(open[i], close[i]) > REALBODY(open[i - 1], close[i - 1])

		if (isBlack1 && isWhite2 && engulfs) {
			result[i] = 100
		}

		// Bearish Engulfing
		const isWhite1 = close[i - 1] > open[i - 1]
		const isBlack2 = close[i] < open[i]
		const engulfsDown = open[i] >= close[i - 1] && close[i] <= open[i - 1] &&
			REALBODY(open[i], close[i]) > REALBODY(open[i - 1], close[i - 1])

		if (isWhite1 && isBlack2 && engulfsDown) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Harami Pattern - Reversal pattern (opposite of engulfing)
 */
function HARAMI(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		// Bullish Harami (white candle inside black candle)
		const isBlack1 = close[i - 1] < open[i - 1]
		const isWhite2 = close[i] > open[i]
		const insideBody = open[i] >= close[i - 1] && close[i] <= open[i - 1] &&
			REALBODY(open[i], close[i]) < REALBODY(open[i - 1], close[i - 1])

		if (isBlack1 && isWhite2 && insideBody) {
			result[i] = 100
		}

		// Bearish Harami (black candle inside white candle)
		const isWhite1 = close[i - 1] > open[i - 1]
		const isBlack2 = close[i] < open[i]
		const insideBodyDown = open[i] <= close[i - 1] && close[i] >= open[i - 1] &&
			REALBODY(open[i], close[i]) < REALBODY(open[i - 1], close[i - 1])

		if (isWhite1 && isBlack2 && insideBodyDown) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Harami Cross Pattern - More significant than regular harami
 */
function HARAMICROSS(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		const isDoji2 = Math.abs(close[i] - open[i]) <= CANDLEAVERAGE('BodyDoji', i, i, open[i], high[i], low[i], close[i])

		// Bullish Harami Cross
		const isBlack1 = close[i - 1] < open[i - 1]
		const insideBody = open[i] >= close[i - 1] && close[i] <= open[i - 1]

		if (isBlack1 && isDoji2 && insideBody) {
			result[i] = 100
		}

		// Bearish Harami Cross
		const isWhite1 = close[i - 1] > open[i - 1]
		const insideBodyDown = open[i] <= close[i - 1] && close[i] >= open[i - 1]

		if (isWhite1 && isDoji2 && insideBodyDown) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Piercing Pattern - Bullish reversal pattern
 */
function PIERCING(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		const isBlack1 = close[i - 1] < open[i - 1]
		const isWhite2 = close[i] > open[i]

		// Second candle opens below first candle's low
		const opensBelow = open[i] < low[i - 1]
		// Second candle closes above midpoint of first candle's body
		const closesAboveMidpoint = close[i] > (open[i - 1] + close[i - 1]) / 2
		// But doesn't completely engulf the first candle
		const notEngulfing = close[i] < open[i - 1]

		if (isBlack1 && isWhite2 && opensBelow && closesAboveMidpoint && notEngulfing) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Dark Cloud Cover - Bearish reversal pattern
 */
function DARKCLOUDCOVER(open, high, low, close, penetration = 0.5) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		const isWhite1 = close[i - 1] > open[i - 1]
		const isBlack2 = close[i] < open[i]

		// Second candle opens above first candle's high
		const opensAbove = open[i] > high[i - 1]
		// Second candle closes below midpoint of first candle's body
		const closesBelowMidpoint = close[i] < open[i - 1] - penetration * REALBODY(open[i - 1], close[i - 1])
		// But doesn't completely engulf the first candle
		const notEngulfing = close[i] > open[i - 1]

		if (isWhite1 && isBlack2 && opensAbove && closesBelowMidpoint && notEngulfing) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Morning Star - Strong bullish reversal pattern
 */
function MORNINGSTAR(open, high, low, close, penetration = 0.3) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		const isBlack1 = close[i - 2] < open[i - 2]
		const isWhite3 = close[i] > open[i]

		// Second candle has small body and gaps down
		const smallBody2 = REALBODY(open[i - 1], close[i - 1]) <
			CANDLEAVERAGE('BodyShort', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])
		const gapsDown2 = Math.max(open[i - 1], close[i - 1]) < close[i - 2]

		// Third candle gaps up and penetrates well into first candle
		const gapsUp3 = open[i] > Math.max(open[i - 1], close[i - 1])
		const penetrates3 = close[i] > open[i - 2] + penetration * REALBODY(open[i - 2], close[i - 2])

		if (isBlack1 && smallBody2 && isWhite3 && gapsDown2 && gapsUp3 && penetrates3) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Evening Star - Strong bearish reversal pattern
 */
function EVENINGSTAR(open, high, low, close, penetration = 0.3) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		const isWhite1 = close[i - 2] > open[i - 2]
		const isBlack3 = close[i] < open[i]

		// Second candle has small body and gaps up
		const smallBody2 = REALBODY(open[i - 1], close[i - 1]) <
			CANDLEAVERAGE('BodyShort', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])
		const gapsUp2 = Math.min(open[i - 1], close[i - 1]) > close[i - 2]

		// Third candle gaps down and penetrates well into first candle
		const gapsDown3 = open[i] < Math.min(open[i - 1], close[i - 1])
		const penetrates3 = close[i] < open[i - 2] - penetration * REALBODY(open[i - 2], close[i - 2])

		if (isWhite1 && smallBody2 && isBlack3 && gapsUp2 && gapsDown3 && penetrates3) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Morning Doji Star - Bullish reversal with doji
 */
function MORNINGDOJISTAR(open, high, low, close, penetration = 0.3) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		const isBlack1 = close[i - 2] < open[i - 2]
		const isDoji2 = Math.abs(close[i - 1] - open[i - 1]) <=
			CANDLEAVERAGE('BodyDoji', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])
		const isWhite3 = close[i] > open[i]

		// Doji gaps down from first candle
		const gapsDown2 = high[i - 1] < Math.min(open[i - 2], close[i - 2])

		// Third candle gaps up from doji and penetrates into first candle
		const gapsUp3 = open[i] > high[i - 1]
		const penetrates3 = close[i] > open[i - 2] + penetration * REALBODY(open[i - 2], close[i - 2])

		if (isBlack1 && isDoji2 && isWhite3 && gapsDown2 && gapsUp3 && penetrates3) {
			result[i] = 100
		}
	}

	return result
}

/**
 * Evening Doji Star - Bearish reversal with doji
 */
function EVENINGDOJISTAR(open, high, low, close, penetration = 0.3) {
	const result = new Array(open.length).fill(0)

	for (let i = 2; i < open.length; i++) {
		const isWhite1 = close[i - 2] > open[i - 2]
		const isDoji2 = Math.abs(close[i - 1] - open[i - 1]) <=
			CANDLEAVERAGE('BodyDoji', i - 1, i - 1, open[i - 1], high[i - 1], low[i - 1], close[i - 1])
		const isBlack3 = close[i] < open[i]

		// Doji gaps up from first candle
		const gapsUp2 = low[i - 1] > Math.max(open[i - 2], close[i - 2])

		// Third candle gaps down from doji and penetrates into first candle
		const gapsDown3 = open[i] < low[i - 1]
		const penetrates3 = close[i] < open[i - 2] - penetration * REALBODY(open[i - 2], close[i - 2])

		if (isWhite1 && isDoji2 && isBlack3 && gapsUp2 && gapsDown3 && penetrates3) {
			result[i] = -100
		}
	}

	return result
}

/**
 * Doji Star - Reversal pattern
 */
function DOJISTAR(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 1; i < open.length; i++) {
		const isDoji2 = Math.abs(close[i] - open[i]) <= CANDLEAVERAGE('BodyDoji', i, i, open[i], high[i], low[i], close[i])

		// Bullish Doji Star (after black candle)
		const isBlack1 = close[i - 1] < open[i - 1]
		const gapsDown = REALBODYGAPDOWN(i, i - 1, open, close)

		if (isBlack1 && isDoji2 && gapsDown) {
			result[i] = 100
		}

		// Bearish Doji Star (after white candle)
		const isWhite1 = close[i - 1] > open[i - 1]
		const gapsUp = REALBODYGAPUP(i, i - 1, open, close)

		if (isWhite1 && isDoji2 && gapsUp) {
			result[i] = -100
		}
	}

	return result
}

// Additional patterns would continue here following the same structure...
// For brevity, I'm including the most common and important patterns above.

// Spinning Top - Indecision pattern
function SPINNINGTOP(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 0; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		const smallBody = body < CANDLEAVERAGE('BodyShort', i, i, open[i], high[i], low[i], close[i])
		const longUpperShadow = upperShadow > CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])
		const longLowerShadow = lowerShadow > CANDLEAVERAGE('ShadowLong', i, i, open[i], high[i], low[i], close[i])

		if (smallBody && longUpperShadow && longLowerShadow) {
			result[i] = 100
		}
	}

	return result
}

// Marubozu - Strong directional candle
function MARUBOZU(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 0; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		const longBody = body > CANDLEAVERAGE('BodyLong', i, i, open[i], high[i], low[i], close[i])
		const noUpperShadow = upperShadow < CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])
		const noLowerShadow = lowerShadow < CANDLEAVERAGE('ShadowVeryShort', i, i, open[i], high[i], low[i], close[i])

		if (longBody && noUpperShadow && noLowerShadow) {
			if (close[i] > open[i]) {
				result[i] = 100 // White Marubozu
			} else {
				result[i] = -100 // Black Marubozu
			}
		}
	}

	return result
}

// High Wave Candle - High volatility
function HIGHWAVE(open, high, low, close) {
	const result = new Array(open.length).fill(0)

	for (let i = 0; i < open.length; i++) {
		const body = REALBODY(open[i], close[i])
		const upperShadow = UPPERSHADOW(open[i], high[i], close[i])
		const lowerShadow = LOWERSHADOW(open[i], low[i], close[i])

		const shortBody = body < CANDLEAVERAGE('BodyShort', i, i, open[i], high[i], low[i], close[i])
		const veryLongUpperShadow = upperShadow > CANDLEAVERAGE('ShadowVeryLong', i, i, open[i], high[i], low[i], close[i])
		const veryLongLowerShadow = lowerShadow > CANDLEAVERAGE('ShadowVeryLong', i, i, open[i], high[i], low[i], close[i])

		if (shortBody && veryLongUpperShadow && veryLongLowerShadow) {
			result[i] = 100
		}
	}

	return result
}

// Export all functions for use.
export const AllCandles = {
	C2CROWS,
	C3BLACKCROWS,
	C3INSIDE,
	C3LINESTRIKE,
	C3OUTSIDE,
	C3STARSINSOUTH,
	C3WHITESOLDIERS,
	ABANDONEDBABY,
	BELTHOLD,
	DARKCLOUDCOVER,
	DOJI,
	DOJISTAR,
	DRAGONFLYDOJI,
	ENGULFING,
	EVENINGDOJISTAR,
	EVENINGSTAR,
	GRAVESTONEDOJI,
	HAMMER,
	HANGINGMAN,
	HARAMI,
	HARAMICROSS,
	HIGHWAVE,
	INVERTEDHAMMER,
	LONGLEGGEDDOJI,
	MARUBOZU,
	MORNINGDOJISTAR,
	MORNINGSTAR,
	PIERCING,
	SHOOTINGSTAR,
	SPINNINGTOP,
}

/**
 * Example usage:
 *
 * const opens = [10, 11, 12, 10, 9];
 * const highs = [12, 13, 14, 11, 10];
 * const lows = [9, 10, 11, 8, 7];
 * const closes = [11, 12, 13, 9, 8];
 *
 * const hammerResults = HAMMER(opens, highs, lows, closes);
 * const dojiResults = DOJI(opens, highs, lows, closes);
 *
 * console.log('Hammer patterns:', hammerResults);
 * console.log('Doji patterns:', dojiResults);
 */
