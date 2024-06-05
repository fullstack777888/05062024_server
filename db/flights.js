const { knex } = require('./connection')

const getAllFlightsDetails = () => {
    return new Promise((resolve, reject) => {
        knex('flights')
            .select('flights.*', 'airline_companies.name as airline_name', 'origin_countries.name as origin_country', 'destination_countries.name as destination_country')
            .join('airline_companies', 'airline_companies.id', '=', 'flights.airline_company_id')
            .join('countries as origin_countries', 'origin_countries.id', '=', 'flights.origin_country_id')
            .join('countries as destination_countries', 'destination_countries.id', '=', 'flights.destination_country_id')
            .then((rows) => {
                resolve(rows);
            })
            .catch((err) => {
                reject(err);
            });
    })
}

module.exports = {
    getAllFlightsDetails
}