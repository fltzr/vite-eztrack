export type UserLegacy = {
	id: string;
	collectionId: '_pb_users_auth_';
	collectionName: 'users';
	username: string;
	verified: boolean;
	emailVisibility: boolean;
	email: string;
	created: string;
	updated: string;
	firstname: string;
	lastname: string;
	birthdate: string;
	gender: string;
};

export type User = {
	username: string;
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	gender?: string;
	birthdate: string;
	phone: string;
	address1: string;
	address2?: string;
	city: string;
	state: string;
	zipcode: string;
	country: string;
};
