import Knex from 'knex';

export const up = async(knex: Knex) => {
  return knex.schema.createTable('authInfo', table => {
    table.increments('id').primary();

    table.string('email')
    .notNullable();

    table.string('password')
    .notNullable();

    table.string('CPF')
    .notNullable();
    
  });
}

export const down = async(knex: Knex) => {
  return knex.schema.dropTable('authInfo');
}