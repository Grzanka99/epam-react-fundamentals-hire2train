import axios from 'axios';
import { API } from 'helpers/constants';
import { IAuthor } from 'types/state.interface';

export async function addAuthorToAPI({ name }: IAuthor, token: string) {
	try {
		const result = await axios.post(
			`${API}/authors/add`,
			{
				name,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);

		if (result.data.successful) return result.data;
		else throw new Error('Error adding author');
	} catch (error) {
		return false;
	}
}

export async function deleteAuthorFromAPI(
	id: string,
	token: string
): Promise<boolean> {
	try {
		const result = await axios.delete(`${API}/authors/${id}`, {
			headers: {
				Authorization: token,
			},
		});

		if (result.data.successful) return true;
		else throw new Error('Error deleting author');
	} catch (error) {
		return false;
	}
}
