const settings = require("./settings"); // settings.json
const input = process.argv[2];
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

knex.select('*')
  .from('famous_people').where('first_name', input)
  .asCallback(function(err, result) {
    if(err) {
      return console.log(err);
      }
    console.log(`Found ${result.length} person(s) by the name '${input}':`)
    for (let buddy of result) {
      let birthday = buddy.birthdate.toString()
      console.log(buddy.first_name, buddy.last_name + ',', 'born', birthday.substring(0,15));
      }
  knex.destroy();
})
