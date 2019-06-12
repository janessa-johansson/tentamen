# HomeNet

Homenet is the new site for selling your house, condo or other properties:
This API has been blatlantly stolen from our biggest competitor hemnet.

Each listing should contain the following information: coordinate with latitude and longitude, street name and number, location name (such as municipality (kommun) or city district (stadsdel)), type summary (as in condo (bostadsrätt) or villa), price, monthly fee and wether bidding is active or not.

We need to be able to provide a nice list of all properties, as well as showing, creating, updating and deleting individual listings.

Our customers know what they want, so being able to list all listings on matching location names, type summary, or say a max price. (Just one is enough, you don't need to support multiple parameters at once in this early version)

The API should provide valid json data, and the naming is up to you as long as the aforementioned information is provided. Basic data type validation should be performed for String, Number and possibly Boolean (true/false) values.

Your mission, should you choose to accept it, is to implement this API and prove that it works, either by providing tests or a swagger file for manual testing (not both).

## Instructions

Fork this repo (top right corner icon on github) to create a copy of this repo to your own gitub account, clone your repo, do your implementation and push to your github, and send me a link on slack to your repo on github or create a pull request when you're done.

## Running

    npm install
    npm start


## Test Cases

    npm install
    npm test

## swagger

No swagger included.

## Curls

**GET**

    curl -X GET "http://localhost:3000/listings"

**GET RESPONSE**

    {
    "address": {
      "geo": {
        "lat": 4,
        "lng": 4
      },
      "street": "hello",
      "zipcode": "hello",
      "city": "hello",
      "kommun": "hello"
    },
    "_id": "5d00bc381f50d42534a070c2",
    "type": "villa",
    "price": 888,
    "fee": 888,
    "active": true,
    "__v": 0 
    }


**GET by Query**

    curl -X GET "http://localhost:3000/listings?type=villa"

    curl -X GET "http://localhost:3000/listings?price=888"

**GET BY QUERY RESPONSE: PRICE **

    {
      "address": {
       "geo": {
          "lat": 4,
          "lng": 4
    },
        "street": "req.body.address.street",
        "zipcode": "req.body.address.zipcode",
        "city": "req.body.address.city",
        "kommun": "austin"
    },
      "_id": "5d00b38f436dff14608e410a",
      "type": "apartment",
      "price": 888,
      "fee": 4,
      "active": true,
      "__v": 0
      }


**POST**

    curl -X POST "http://localhost:3000/listings" -H "accept: application/json" -H "Content-Type: application/json" -d '{"type": "req.body.type","price": "4","fee": "4","active": "true","address": {"street": "req.body.address.street","zipcode": "req.body.address.zipcode","city": "req.body.address.city","kommun": "req.body.address.kommun","geo": {"lat": "4","lng": "4"}}}'

**POST RESPONSE**


    {
      "address": {
       "geo": {
          "lat": 4,
          "lng": 4
    },
        "street": "req.body.address.street",
        "zipcode": "req.body.address.zipcode",
        "city": "req.body.address.city",
        "kommun": "austin"
    },
      "_id": "5d00b38f436dff14608e410a",
      "type": "apartment",
      "price": 888,
      "fee": 4,
      "active": true,
      "__v": 0
      }

**PUT**

    curl -X PUT "http://localhost:3000/listings/{ID}" -H "accept: application/json" -H "Content-Type: application/json" -d '{"type": "req.body.type","price": "44444","fee": "44444","active": "true","address": {"street": "req.body.address.street","zipcode": "req.body.address.zipcode","city": "req.body.address.city","kommun": "req.body.address.kommun","geo": {"lat": "44444","lng": "44444"}}}'

**PUT RESPONSE**



    {
      "address": {
       "geo": {
          "lat": 44444,
          "lng": 44444
    },
        "street": "req.body.address.street",
        "zipcode": "req.body.address.zipcode",
        "city": "req.body.address.city",
        "kommun": "req.body.address.kommun"
    },
      "_id": "5d00b38f436dff14608e410a",
      "type": "req.body.type",
      "price": 44444,
      "fee": 44444,
      "active": true,
      "__v": 0
      }

**DELETE**

    curl -X DELETE "http://localhost:3000/listings/{ID}"

**DELETE RESPONSE**

    {
     "address": {
    "geo": {
      "lat": 4888,
      "lng": 48888
    },
    "street": "req.body.address.street",
    "zipcode": "req.body.address.zipcode",
    "city": "req.body.address.city",
    "kommun": "req.body.address.kommun"
     },
     "_id": "5d00c0edfc61551be8a870d6",
     "type": "req.body.type",
     "price": 4,
    "fee": 4,
    "active": true,
    "__v": 0
    }

