import { User } from './user';

export interface GetUserResponse {
	error: boolean;
	message: string;
	users?: User[];
}
