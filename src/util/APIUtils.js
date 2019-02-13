import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)         
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}


export function getProductList() {
    return request({
        url: API_BASE_URL + "/getAllProduct",
        method: 'GET'
    });
}

export function getShoppingcartOwnList() {
    return request({
        url: API_BASE_URL + "/getOwnShoppingCart",
        method: 'GET'
    });
}

export function getCurrentInvoentoryList() {
    return request({
        url: API_BASE_URL + "/getCurrentInventoryList",
        method: 'GET'
    });
}

export function getOrdersHistoryList() {
    return request({
        url: API_BASE_URL + "/getOrdersHistoryList",
        method: 'GET'
    });
}


export function editorProduct(editorRequest) {
    return request({
        url: API_BASE_URL + "/editorrproduct",
        method: 'POST',
        body: JSON.stringify(editorRequest)
    });
}


export function checkoutOnShoppingcart() {
    return request({
        url: API_BASE_URL + "/choutoutonitems",
        method: 'PUT'
    });
}

export function addIntoShoppingcart(shoppingcartRequest){
    return request({
        url: API_BASE_URL + "/addIntoShoppingcart",
        method: 'POST',
        body: JSON.stringify(shoppingcartRequest)
    });
}


export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function existTOKEN(){
    return localStorage.hasOwnProperty(ACCESS_TOKEN);
}

export function removeTOKEN(){
    localStorage.removeItem(ACCESS_TOKEN);
}

export function getCurrentUser() {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}