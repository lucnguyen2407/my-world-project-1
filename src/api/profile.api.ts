import axiosInstance from '.';
import { profileDataType } from '../types/index.type';


export const profilesApi = {
	getProfiles(username: string): Promise<profileDataType> {
		const url = `/profiles/${username}`;
		return axiosInstance.get(url);
	},
	followUser(username: string): Promise<profileDataType> {
		const url = `/profiles/${username}/follow`;
		return axiosInstance.post(url);
	},
	unfollowUser(username: string): Promise<profileDataType> {
		const url = `/profiles/${username}/follow`;
		return axiosInstance.delete(url);
	},
};
