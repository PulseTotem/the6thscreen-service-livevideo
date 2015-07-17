/**
 * @author Christian Brel <christian@the6thscreen.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/SourceNamespaceManager.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/CmdList.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/Cmd.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/priorities/InfoPriority.ts" />

class LiveVideoNamespaceManager extends SourceNamespaceManager {

	private _params : any;
	private _cmdSession : Cmd;

	/**
	 * Constructor.
	 *
	 * @constructor
	 * @param {any} socket - The socket.
	 */
	constructor(socket : any) {
		super(socket);
		this.addListenerToSocket('Subscribe', this.subscribe);

		this._params = null;
		this._cmdSession = null;
	}

	/**
	 * Subscribe to notifications.
	 *
	 * @method subscribe
	 * @param {Object} params - Params to subscribe to notifications : ???.
	 * @param {NotifierNamespaceManager} self - the NotifierNamespaceManager's instance.
	 */
	subscribe(params : any, self : LiveVideoNamespaceManager = null) {
		if(self == null) {
			self = this;
		}

		self._params = params;
	}

	/**
	 * Method called when external message come (from API Endpoints for example).
	 *
	 * @method onExternalMessage
	 * @param {string} from - Source description of message
	 * @param {any} message - Received message
	 */
	onExternalMessage(from : string, message : any) {
		if (from == "live") {
			switch(message) {
				case 'on' :
					this._liveOn();
					break;
				case 'off' :
					this._liveOff();
					break;
			}
		}
	}

	/**
	 * Send a Cmd 'LiveOn' to all connected Clients.
	 *
	 * @method _liveOn
	 * @private
	 */
	private _liveOn() {
		var cmdList:CmdList = new CmdList(uuid.v1());
		var cmd:Cmd = new Cmd(uuid.v1());
		cmd.setCmd("LiveOn");
		cmd.setPriority(InfoPriority.HIGH);
		cmd.setDurationToDisplay(60*60*24);
		cmdList.addCmd(cmd);
		this._cmdSession = cmd;

		this.sendNewInfoToClient(cmdList);
	}

	/**
	 * Send a Cmd 'LiveOff' to all connected Clients.
	 *
	 * @method _liveOff
	 * @private
	 */
	private _liveOff() {
		var cmdList:CmdList = new CmdList(uuid.v1());
		var cmd:Cmd = new Cmd(uuid.v1());

		if(typeof(this._cmdSession) != "undefined" && this._cmdSession != null) {
			cmd = this._cmdSession;
		}

		cmd.setCmd("LiveOff");
		cmd.setPriority(InfoPriority.HIGH);
		cmd.setDurationToDisplay(1);
		cmdList.addCmd(cmd);
		this._cmdSession = null;

		this.sendNewInfoToClient(cmdList);
	}
}