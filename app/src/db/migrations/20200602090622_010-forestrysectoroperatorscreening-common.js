const stamps = require('../stamps');

const PREFIX = require('../../forms/attestations/forestrysectoroperatorscreening/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.createTable(`${PREFIX}_form`, table => {
      table.uuid('formId').references('formId').inTable('form').notNullable().primary();
      table.string('description');
      stamps(knex, table);
      table.comment('There should only be one record in this table.  It is the Forestry Sector Operator Screening instance of form');
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_form_version`, table => {
      table.increments('formVersionId').primary();
      table.uuid('formId').references('formId').inTable('form').notNullable().index();
      table.string('changes').comment('Document the changes in this version');
      stamps(knex, table);
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_status_code`, table => {
      table.string('code').primary();
      table.string('display').notNullable();
      table.boolean('enabled').notNullable().defaultTo(true);
      table.specificType('nextCodes', 'text ARRAY').comment('This is an array of codes that this status could transition to next');
      table.specificType('allowedClassifications', 'text ARRAY').comment('This is an array of values for this status code to be further classified.');
      stamps(knex, table);
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_version_status_code`, table => {
      table.increments('versionStatusCodeId').primary();
      table.integer('formVersionId').references('formVersionId').inTable(`${PREFIX}_form_version`).notNullable().index();
      table.string('code').references('code').inTable(`${PREFIX}_status_code`).notNullable().index();
      stamps(knex, table);
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_operation_type`, table => {
      table.string('type').primary();
      table.string('display').notNullable();
      table.boolean('enabled').notNullable().defaultTo(true);
      stamps(knex, table);
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_submission`, table => {
      table.uuid('submissionId').primary();
      table.integer('formVersionId').references('formVersionId').inTable(`${PREFIX}_form_version`).notNullable().index();
      table.string('confirmationId').notNullable().unique().index();
      table.string('type').references('type').inTable(`${PREFIX}_operation_type`).notNullable().index();
      table.boolean('deleted').notNullable().defaultTo(false);
      stamps(knex, table);
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_submission_status`, table => {
      table.increments('submissionStatusId').primary();
      table.uuid('submissionId').references('submissionId').inTable(`${PREFIX}_submission`).notNullable().index();
      table.string('code').references('code').inTable(`${PREFIX}_status_code`).notNullable().index();
      table.string('assignedTo');
      table.string('assignedToEmail');
      table.date('actionDate').nullable();
      table.string('classification').nullable().defaultTo(null);
      stamps(knex, table);
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_note`, table => {
      table.increments('noteId').primary();
      table.uuid('submissionId').references('submissionId').inTable(`${PREFIX}_submission`).index();
      table.integer('submissionStatusId').references('submissionStatusId').inTable(`${PREFIX}_submission_status`).index();
      table.string('note', 4000).nullable();
      stamps(knex, table);
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_settings`, table => {
      table.string('name').primary();
      table.boolean('enabled').notNullable().defaultTo(true);
      table.jsonb('config');
      stamps(knex, table);
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_settings`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_note`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_submission_status`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_submission`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_operation_type`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_version_status_code`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_status_code`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_form_version`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_form`));
};
