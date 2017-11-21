import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

let api_root = null;

if (process.env.NODE_ENV === 'production') {
    api_root = 'https://hard-api-pro.robinbeechey.com/api';
} else {
    api_root = 'http://localhost:8000/api';
}

const responseBody = res => res.body;

let token = null;

let tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`)
    }
};


const requests = {
    del: url =>
        superagent.del(`${api_root}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${api_root}${url}`).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${api_root}${url}`, body).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${api_root}${url}`, body).use(tokenPlugin).then(responseBody),
    postUpload: (url, formData) =>
        superagent.post(`${api_root}${url}`).use(tokenPlugin).send(formData).set('Accept', 'application/json').then(responseBody)
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const encode = encodeURIComponent;
const omitSlug = article => Object.assign({}, article, {slug: undefined});

const Articles = {
    all: page =>
        requests.get(`/articles?${limit(10, page)}`),
    get: slug =>
        requests.get(`/articles/${slug}`),
    byAuthor: (author, page) =>
        requests.get(`/articles?author=${encode(author)}&${limit(10, page)}`),
    byTag: (tag, page) =>
        requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
    byUrl: (url) =>
        requests.get(`/articles?url=${encode(url)}`),
    del: slug =>
        requests.del(`/articles/${slug}`),
    favoritedBy: (author, page) =>
        requests.get(`/articles?favorited=${encode(author)}&${limit(10, page)}`),
    feed: (page) =>
        requests.get(`/articles/feed?${limit(10, page)}`),
    create: article =>
        requests.post('/articles', {article}),
    update: article => requests.put(`/articles/${article.slug}`, {article: omitSlug(article)}),
    analyze: url => requests.get(`/articles/analyze?url=${encode(url)}`),
    favorite: slug => requests.post(`/articles/${slug}/favorite`),
    unfavorite: slug => requests.del(`/articles/${slug}/favorite`)

};

const Tags = {
    getAll: () => requests.get('/tags')
};

const Profile = {
    follow: username =>
        requests.post(`/profiles/${username}/follow`),
    get: username =>
        requests.get(`/profiles/${username}`),
    unfollow: username =>
        requests.del(`/profiles/${username}/follow`)
};

const Comments = {
    forArticle: slug =>
        requests.get(`/articles/${slug}/comments`),
    create: (slug, comment) =>
        requests.post(`/articles/${slug}/comments`, {comment}),
    delete: (slug, commentId) =>
        requests.del(`/articles/${slug}/comments/${commentId}`)
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}}),
    register: (username, email, password) =>
        requests.post('/users', {user: {username, email, password}}),
    save: user =>
        requests.put('/user', {user}),
    fileUpload: (username, filename, formData) =>
        requests.postUpload(`/user/${username}/fileUpload/${filename}`, formData),

};


export default {
    Articles,
    Tags,
    Profile,
    Auth,
    Comments,
    setToken: _token => {
        token = _token;
    }
};
