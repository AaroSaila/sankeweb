/**
 * @typedef msg
 * @type {object}
 * @property {string} msgType
 * @property {object} game
 * @property {boolean} isMain
 *
 * @typedef game
 * @type {object}
 * @property {object} board
 * @property {string} key
 * @property {number} score
 * @property {number} tickRate
 * @property {boolean} active
 * @property {string} sessionId
 *
 * @typedef board
 * @type {object}
 * @property {object} food
 * @property {object} sanke
 *
 * @typedef food
 * @type {object}
 * @property {number} x
 * @property {number} y
 *
 * @typedef sanke
 * @type {object}
 * @property {string} dir
 * @property {array} parts
 * @property {number} x
 * @property {number} y
 *
 * @typedef part
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} index
 * @property {string} dir
 * @property {array} orders
 */

/**
 * @typedef lobby
 * @type {object}
 * @property {number} lobbyId
 * @property {array} players
 * @property {string} msgType
 */