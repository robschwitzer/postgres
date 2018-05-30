const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
    connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const first = process.argv[2];
const last = process.argv[3];
const bday = process.argv[4];

knex.insert({first_name: first, last_name: last, birthdate: bday}).into('famous_people')
.asCallback((err, res) => {
  if (err) {
    console.log (err)
  }
  console.log (`${first} ${last} has been added to the list`)
  knex.destroy();
});