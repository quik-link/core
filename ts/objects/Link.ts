/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {SiObject} from "@element-ts/silicon";
import {Visit} from "./Visit";

export interface LinkProps {
	url: string;
	userId: string;
	name: string;
}

export class Link extends SiObject<LinkProps> {

	public constructor() {

		super("link");

	}

	public async visit(): Promise<void> {

		const visit = new Visit();
		visit.props.linkId = this.getId();

		await visit.create();

	}

}