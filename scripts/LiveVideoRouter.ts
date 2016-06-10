/**
 * @author Christian Brel <christian@the6thscreen.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/RouterItf.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />

/**
 * LiveVideoRouter class.
 *
 * @class LiveVideoRouter
 * @extends RouterItf
 */
class LiveVideoRouter extends RouterItf {

	/**
	 * Constructor.
	 */
	constructor() {
		super();
	}

	/**
	 * Method called during Router creation.
	 *
	 * @method buildRouter
	 */
	buildRouter() {
		var self = this;

		this.router.post('/on', function(req : any, res : any) { self.liveon(req, res); });
		this.router.post('/off', function(req : any, res : any) { self.liveoff(req, res); });
	}

	/**
	 * New POST to active live.
	 *
	 * @method liveon
	 * @param {Express.Request} req - Request object.
	 * @param {Express.Response} res - Response object.
	 */
	liveon(req : any, res : any) {
		this.server.broadcastExternalMessage("live", "on");

		res.end();
	}

	/**
	 * New POST to disable live.
	 *
	 * @method liveoff
	 * @param {Express.Request} req - Request object.
	 * @param {Express.Response} res - Response object.
	 */
	liveoff(req : any, res : any) {
		this.server.broadcastExternalMessage("live", "off");

		res.end();
	}
}