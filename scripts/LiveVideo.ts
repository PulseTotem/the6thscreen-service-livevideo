/**
 * @author Christian Brel <christian@the6thscreen.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/SourceServer.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="./LiveVideoNamespaceManager.ts" />
/// <reference path="./LiveVideoRouter.ts" />



/**
 * Represents the The 6th Screen LiveVideo Service.
 *
 * @class LiveVideo
 * @extends SourceServer
 */
class LiveVideo extends SourceServer {
	/**
	 * Constructor.
	 *
	 * @param {number} listeningPort - Server's listening port..
	 * @param {Array<string>} arguments - Server's command line arguments.
	 */
	constructor(listeningPort : number, arguments : Array<string>) {
		super(listeningPort, arguments);

		this.init();
	}

	/**
	 * Method to init the Notifier server.
	 *
	 * @method init
	 */
	init() {
		var self = this;

		this.addAPIEndpoint("live", LiveVideoRouter);

		this.addNamespace("LiveVideo", LiveVideoNamespaceManager);
	}
}

/**
 * Server's LiveVideo listening port.
 *
 * @property _LiveVideoListeningPort
 * @type number
 * @private
 */
var _LiveVideoListeningPort : number = process.env.PORT || 6013;

/**
 * Server's LiveVideo command line arguments.
 *
 * @property _LiveVideoArguments
 * @type Array<string>
 * @private
 */
var _LiveVideoArguments : Array<string> = process.argv;

var serverInstance = new LiveVideo(_LiveVideoListeningPort, _LiveVideoArguments);
serverInstance.run();