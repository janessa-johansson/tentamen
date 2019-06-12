get = (req, res, next) => {
  var query;
  if (req.query.price) {
    query = req.models.Listing.findOne({ price: req.query.price })
  } else if (req.query.type) {
    query = req.models.Listing.findOne({ type: req.query.type })
  }
  else {
    query = req.models.Listing.find()
  }

  query.exec().then((listing) => {
    return res.send(listing);
  }).catch((error) => next(error))
}

post = (req, res, next) => {
  req.models.Listing.create({
    type: req.body.type,
    price: req.body.price,
    fee: req.body.fee,
    active: req.body.active,
    address: {
      street: req.body.address.street,
      zipcode: req.body.address.zipcode,
      city: req.body.address.city,
      kommun: req.body.address.kommun,
      geo: {
        lat: req.body.address.geo.lat,
        lng: req.body.address.geo.lng
      }
    }
  }).then((listing) => {
    return res.status(201).send(listing);
  }).catch((error) => {
    next(error);
  })
}

getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then((listing) => {
    return res.send(listing);
  }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete({ _id: req.params.id }).then((deleted) => {
    if (deleted)
      return res.send(deleted).status(200);
    res.sendStatus(204);
  }).catch((error) => next(error));
}

put = (req, res, next) => {
  req.models.Listing.updateOne({ _id: req.params.id },
    {
      type: req.body.type,
      price: req.body.price,
      fee: req.body.fee,
      active: req.body.active,
      address: {
        street: req.body.address.street,
        zipcode: req.body.address.zipcode,
        city: req.body.address.city,
        kommun: req.body.address.kommun,
        geo: {
          lat: req.body.address.geo.lat,
          lng: req.body.address.geo.lng
        }
      },
    }, {
      new: true,
      upsert: true,
      runvalidators: true,

    }).then((status) => {
      if (status.upserted)
        res.status(201)
      else if (status.nModified)
        res.status(200)
      else
        res.status(204)
      res.send()
    }).catch((error) => next(error))
}

module.exports = {
  get,
  post,
  getById,
  deleteById,
  put,
}