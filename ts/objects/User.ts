/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {SiObject, SiQuery} from "@element-ts/silicon";
import {KrBcrypt} from "@element-ts/krypton";
import {Token} from "./Token";
import {HObject} from "@element-ts/hydrogen";

export interface UserProps {
	firstName: string;
	lastName: string;
	email: string;
	salt: Buffer;
	pepper: Buffer;
}

export interface UserSignUpProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export class User extends SiObject<UserProps> implements HObject {

	public constructor() {

		super("user");

	}

	public bond(): object {
		return this.getJSON("firstName", "lastName", "email");
	}

	public generateToken(): Promise<Token> {

		return Token.generate(this.getId());

	}

	public async signOutOfAllSessions(): Promise<void> {

		const tokens = await Token.getAliveForUser(this.getId());

		for (const token of tokens) {
			token.props.alive = false;
			token.props.deadDate = Date.now();
			await token.update("alive", "deadDate");
		}

	}

	public async verifyPassword(password: string): Promise<boolean> {

		return KrBcrypt.verifyPassword(
			password,
			this.getUnsafe("pepper"),
			this.getUnsafe("pepper")
		);

	}

	public static async signIn(email: string, password: string): Promise<User> {

		const query = new SiQuery<User, UserProps>(User, {email});
		const user = await query.getFirst();
		const incorrectCredentialMessage = "Incorrect email or password.";
		if (user === undefined) throw new Error(incorrectCredentialMessage);
		if (!await user.verifyPassword(password)) throw new Error(incorrectCredentialMessage);

		return user;

	}

	public static async signUp(props: UserSignUpProps): Promise<User> {

		const user = new User();
		user.props.firstName = props.firstName;
		user.props.lastName = props.lastName;
		user.props.email = props.email;
		const bcryptPassword = await KrBcrypt.createPassword(props.password);
		user.props.salt = bcryptPassword.salt;
		user.props.pepper = bcryptPassword.password;
		await user.create();

		return user;

	}

}