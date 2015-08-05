/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../../t6s-core/core-backend/t6s-core/core/libsdef/mocha.d.ts" />
/// <reference path="../../t6s-core/core-backend/libsdef/sinon.d.ts" />

/// <reference path="../../scripts/sources/Subscribe.ts" />

var assert = require("assert");
var sinon : Sinon.SinonStatic = require("sinon");

describe('Subscribe', function() {
	describe('#constructor', function () {
		it('should launch run and setParams if the proper params are given', function () {
			var mockAlbum = sinon.mock(Subscribe.prototype);
			mockAlbum.expects('run').once();

			var params = { Limit: '10', InfoDuration: "15"};

			var stubNSManager : any = sinon.createStubInstance(LiveVideoNamespaceManager);
			var subscribe = new Subscribe(params, stubNSManager);

			assert.ok(stubNSManager.setParams.calledWithExactly(params));
			mockAlbum.verify();
		});

		it('should not launch run or setParams if parameter Limit is missing', function () {
			var mockAlbum = sinon.mock(Subscribe.prototype);
			mockAlbum.expects('run').never();

			var params = { InfoDuration: "15"};

			var stubNSManager : any = sinon.createStubInstance(LiveVideoNamespaceManager);
			var subscribe = new Subscribe(params, stubNSManager);

			assert.equal(stubNSManager.setParams.callCount, 0, "The method setParams should never be called.");
			mockAlbum.verify();
		});
	});
});