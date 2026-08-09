const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type City {
        id: ID
        name: String
        addedBy: String
    }

    type Weather {
        city: String
        temp: Int
        description: String
        humidity: Int
        windSpeed: Int
    }

    type Query {
        cities: [City]
        weather(city: String!): Weather
    }
`);

module.exports = schema;