import {environment} from '../../environments/environment';

const base = environment.api_base_url;

export const loginUrl = () => `${base}/login`;
export const getAllCategoriesUrl = () => `${base}/categories`;
export const createCategoryUrl = () => `${base}/categories`;
export const editCategoryUrl = (id: number) => `${base}/categories/${id}`;
export const deleteCategoryUrl = (id: number) => `${base}/categories/${id}`;
export const getAllTimeEntriesUrl = () => `${base}/time-entries`;
export const getMyTimeEntriesUrl = () => `${base}/time-entries/mine`;
export const createTimeEntryUrl = () => `${base}/time-entries/`;
export const editTimeEntryUrl = (id: number) => `${base}/time-entries/${id}`;
export const deleteTimeEntryUrl = (id: number) => `${base}/time-entries/${id}`;
export const getAllUsersUrl = () => `${base}/users`;
export const getUserByIdUrl = (id: number) => `${base}/users/${id}`;
export const editUserUrl = (id: number) => `${base}/users/${id}`;
export const deleteUserUrl = (id: number) => `${base}/users/${id}`;
export const changePasswordUrl = (id: number) => `${base}/users/${id}/password`;
export const inviteUserUrl = () => `${base}/users/invite`;
