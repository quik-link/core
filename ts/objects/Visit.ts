/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {SiObject} from "@element-ts/silicon";
import {HObject} from "@element-ts/hydrogen";

export interface VisitProps {
	linkId: string;
}

export class Visit extends SiObject<VisitProps> implements HObject {

	public constructor() {

		super("visit");

	}

	public bond(): object {
		return this.getJSON();
	}

}