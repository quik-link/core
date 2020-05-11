/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {SiObject, SiQuery} from "@element-ts/silicon";
import {User} from "./User";

export interface TokenProps {
	alive: boolean;
	userId: string;
	deadDate: number;
}

export class Token extends SiObject<TokenProps> {

	public constructor() {

		super("token");

	}

	public async getUser(): Promise<User> {

		if (this.props.userId === undefined) throw new Error("Token does not have a userId.");
		const user = await SiQuery.getObjectForId(User, this.props.userId);
		if (user === undefined) throw new Error("User cannot be found from token's userId.");

		return user;

	}

	public static async generate(userId: string): Promise<Token> {

		const token = new Token();

		token.props.userId = userId;
		token.props.alive = true;
		await token.create();

		return token;

	}

	public static async getAllForUser(userId: string): Promise<Token[]> {

		const query = new SiQuery<Token, TokenProps>(Token, {userId});
		return await query.getAll();

	}

	public static async getAliveForUser(userId: string): Promise<Token[]> {

		const query = new SiQuery<Token, TokenProps>(Token, {userId, alive: true});
		return await query.getAll();

	}

	public static async getDeadForUser(userId: string): Promise<Token[]> {

		const query = new SiQuery<Token, TokenProps>(Token, {userId, alive: false});
		return await query.getAll();

	}

}