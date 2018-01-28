
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('id').primary;
            table.string('username');
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
