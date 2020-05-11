/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {SiObject} from "@element-ts/silicon";

export interface VisitProps {
	linkId: string;
}

export class Visit extends SiObject<VisitProps> {

	public constructor() {

		super("visit");

	}

}