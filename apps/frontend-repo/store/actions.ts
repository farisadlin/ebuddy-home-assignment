import { User, UserUpdateRequest } from '../apis/user';

// Action types
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

// Action creators
export function fetchUsersRequest() {
  return { type: FETCH_USERS_REQUEST };
}

export function fetchUsersSuccess(users: User[]) {
  return { type: FETCH_USERS_SUCCESS, payload: users };
}

export function fetchUsersFailure(error: string) {
  return { type: FETCH_USERS_FAILURE, payload: error };
}

export function fetchUserRequest(userId: string) {
  return { type: FETCH_USER_REQUEST, payload: userId };
}

export function fetchUserSuccess(user: User) {
  return { type: FETCH_USER_SUCCESS, payload: user };
}

export function fetchUserFailure(error: string) {
  return { type: FETCH_USER_FAILURE, payload: error };
}

export function updateUserRequest(params: { userId: string; userData: UserUpdateRequest }) {
  return { type: UPDATE_USER_REQUEST, payload: params };
}

export function updateUserSuccess(user: User) {
  return { type: UPDATE_USER_SUCCESS, payload: user };
}

export function updateUserFailure(error: string) {
  return { type: UPDATE_USER_FAILURE, payload: error };
}

export function createUserRequest(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  return { type: CREATE_USER_REQUEST, payload: userData };
}

export function createUserSuccess(user: User) {
  return { type: CREATE_USER_SUCCESS, payload: user };
}

export function createUserFailure(error: string) {
  return { type: CREATE_USER_FAILURE, payload: error };
}

export function deleteUserRequest(userId: string) {
  return { type: DELETE_USER_REQUEST, payload: userId };
}

export function deleteUserSuccess(userId: string) {
  return { type: DELETE_USER_SUCCESS, payload: userId };
}

export function deleteUserFailure(error: string) {
  return { type: DELETE_USER_FAILURE, payload: error };
}
