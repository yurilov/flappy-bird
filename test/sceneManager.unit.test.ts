import { SceneManager } from '../src/scenes/sceneManager/SceneManager'
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';

_chai.should();
_chai.expect;

@suite
class SceneManagerTest
{
	private SUT: SceneManager;
	private width: number;
	private height: number;
	private backgroundColor: number;

	before()
	{
		this.width = 1000;
		this.height = 600;
		this.backgroundColor = 0xcc6b8e;
		SceneManager.initialize(this.width, this.height, this.backgroundColor);
		this.SUT = SceneManager
	}

	@test 'SceneManager has instance'()
	{
		expect(this.SUT).to.be.equal(SceneManager);
	}

	@test "SceneManager has width"()
	{
		expect(SceneManager.width).to.be.equal(this.width)
	}
}
