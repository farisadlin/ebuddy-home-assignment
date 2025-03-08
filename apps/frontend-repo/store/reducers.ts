import { User } from '../apis/user';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from './actions';

// Define the state interface
export interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

// Define action types
interface Action {
  type: string;
  payload?: unknown;
}

// Initial state
const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null
};

// Create the reducer
export const userReducer = (state = initialState, action: Action): UserState => {
  switch (action.type) {
    // Fetch users
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload as User[]
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string
      };
    
    // Fetch single user
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload as User
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string
      };
    
    // Update user
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_USER_SUCCESS:
      const updatedUser = action.payload as User;
      return {
        ...state,
        loading: false,
        currentUser: updatedUser,
        users: state.users.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        )
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string
      };
    
    // Create user
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload as User]
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string
      };
    
    // Delete user
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_USER_SUCCESS:
      const deletedUserId = action.payload as string;
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user.id !== deletedUserId),
        currentUser: state.currentUser && state.currentUser.id === deletedUserId 
          ? null 
          : state.currentUser
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string
      };
    
    default:
      return state;
  }
};
