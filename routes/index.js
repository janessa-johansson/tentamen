const express = require('express')
const router = express.Router()

const listing = require('./listing.js')

router.use(function timelog (req, res, next) {
    console.log('Time:', Date.now())
    next();
  })

router.get("/listings", listing.get)
router.post('/listings', listing.post);
router.get("/listings/:id", listing.getById)
router.put("/listings/:id", listing.put)
router.delete("/listings/:id", listing.deleteById)

module.exports = router