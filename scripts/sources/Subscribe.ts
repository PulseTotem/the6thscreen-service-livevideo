/**
 * Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../../t6s-core/core-backend/scripts/server/SourceItf.ts" />

class Subscribe extends SourceItf {

	constructor (params : any, liveVideoNamespaceManager : LiveVideoNamespaceManager) {
		super(params, liveVideoNamespaceManager);

		if (this.checkParams(["Limit","InfoDuration"])) {
			liveVideoNamespaceManager.setParams(params);
		   this.run();
		}
	}

	run() {}
}