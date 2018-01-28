const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          username: 'otto', 
          password: bcrypt.hashSync("123", 10),
          email: "otto@otto.com"
        }
      ]);
    });
};
