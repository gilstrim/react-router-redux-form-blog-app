import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload); // if state object has key, drop it
        case FETCH_POST:
            //const post = action.payload.data;
            //const newState = { ...state, };
            //newState[post.id] = post;
            //return newState;

            // this code is exactly the same as the above; fetching a post and adding it to the state
            return { ...state, [action.payload.data.id]: action.payload.data }; // take all existing posts we have and put into new object
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}