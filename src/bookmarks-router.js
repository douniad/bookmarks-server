const express = require('express')
const {v4: uuid} = require('uuid')
const logger = require('./logger')
const router = express.Router()
const {bookmarks} = require('./store')
const bodyParser = express.json()

router
.route('/bookmarks')
.get((req, res) => {
res.json(bookmarks)
})
.post(bodyParser, (req, res) => {
    const {title, description, url, rating} = req.body
if (!title) {
    logger.error(`Title is required`);
    return res
}
if (!description) {
    logger.error(`Description is required`);
    return res
}
if (!url) {
    logger.error(`Url is required`);
    return res
}
if (!rating) {
    logger.error(`Rating is required`);
    return res
}

const id = uuid()
const bookmark = {
    id, title, description, url, rating
}

bookmarks.push(bookmark)

res
.status(201)
.json(bookmark)
})

router
.route('/bookmarks/:id')
.get((req, res) => {
    const bookmark = bookmarks.find(item => item.id = req.params.id )
    if (bookmark) {
        res
        .json(bookmark)
    } else {
        res
        .status(404)
        .send('Not found')
    };

})
.delete((req, res) => {
    const bookmark = bookmarks.findIndex(item => item.id = req.params.id )
    bookmarks.splice(bookmark, 1);
    res
    .status(204)
    .end();
    
})

module.exports = router