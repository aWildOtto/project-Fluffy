
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('id').primary;
            table.string('first_name');
            table.string('last_name');
            table.string('email');
            table.string('password');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('edited_at');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ])
};
