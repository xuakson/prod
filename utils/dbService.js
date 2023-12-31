/**
 * dbService.js
 * @description: exports all database related methods
 */
const { Op } = require('sequelize');
const models = require('../model');

const OPERATORS = ['$and', '$or', '$like', '$in', '$eq', '$gt', '$lt', '$gte', '$lte', '$any', '$between'];

// create one record
const createOne = async (model, data) => {
  const m = await model;
  return m.create(data)
};

// create multiple records
const createMany = async (model, data, options = { validate: true }) => {
  const m = await model;
  return m.bulkCreate(data, options)
};

// update record(s) when query matches
const update = async (model, query, data) => {
  const m = await model;
  query = queryBuilderParser(query);
  let result = await m.update(data, { where: query });
  result = await m.findAll({ where: query });
  return result;
};

// delete record(s) when query matches
const destroy = async (model, query) => {
  const m = await model;
  query = queryBuilderParser(query);
  const result = await m.findAll({ where: query });
  await m.destroy({ where: query });
  return result;
};

// delete record using primary key
const deleteByPk = async (model, pk) => {
  const m = await model;
  return m.destroy({ where: { [m.primaryKeyField]: pk } });
}

// find single record
const findOne = async (model, query, options = {}) => {
  const m = await model;
  query = queryBuilderParser(query);
  return m.findOne({
    where: query,
    options,
  });
};
// find multiple records with pagination
const paginate = async (model, query, options = {}) => {
  const m = await model;
  query = queryBuilderParser(query);
  if (options && options.select && options.select.length) {
    options.attributes = options.select;
    delete options.select;
  }
  if (options && options.sort) {
    options.order = sortParser(options.sort);
    delete options.sort;
  }
  if (options && options.include && options.include.length) {
    const include = [];
    options.include.forEach((i) => {
      i.model = models[i.model];
      if (i.query) {
        i.where = queryBuilderParser(i.query);
      }
      include.push(i);
    });
    options.include = include;
  }
  options = {
    where: query,
    ...options,
  };
  const result = await m.paginate(options);
  const data = {
    data: result.docs,
    paginator: {
      itemCount: result.total,
      perPage: options.paginate || 25,
      pageCount: result.pages,
      currentPage: options.page || 1,
    },
  };
  return data;
};

// find multiple records without pagination
const findAll = async (model, query, options = {}) => {
  const m = await model;
  query = queryBuilderParser(query);
  if (options && options.select && options.select.length) {
    options.attributes = options.select;
    delete options.select;
  }
  if (options && options.sort) {
    options.order = sortParser(options.sort);
    delete options.sort;
  }
  if (options && options.include && options.include.length) {
    const include = [];
    options.include.forEach((i) => {
      i.model = models[i.model];
      if (i.query) {
        i.where = queryBuilderParser(i.query);
      }
      include.push(i);
    });
    options.include = include;
  }
  options = {
    where: query,
    ...options,
  };
  return m.findAll(options);
};

// count records for specified query
const count = async (model, query, options = {}) => {
  const m = await model;
  query = queryBuilderParser(query);
  return m.count({
    where: query,
    ...options,
  });
};

//
const upsert = async (model, data, options = {}) => {
  const m = await model;
  return m.upsert(data, options);
}

/*
 * @description : parser for query builder
 * @param  {obj} data : {}
 * @return {obj} data : query
 */
const queryBuilderParser = (data) => {
  if (data) {
    Object.entries(data).forEach(([key]) => {
      if (typeof data[key] === 'object') {
        queryBuilderParser(data[key]);
      }
      if (OPERATORS.includes(key)) {
        const opKey = key.replace('$', '');
        data[Op[opKey]] = data[key];
        delete data[key];
      } else if (key === '$ne') {
        data[Op.not] = data[key];
        delete data[key];
      } else if (key === '$nin') {
        data[Op.notIn] = data[key];
        delete data[key];
      }
    });
  }

  return data;
};

/*
 * @description : parser for query builder of sort
 * @param  {obj} input : {}
 * @return {obj} data : query
 */
const sortParser = (input) => {
  const newSortedObject = [];
  if (input) {
    Object.entries(input).forEach(([key, value]) => {
      if (value === 1) {
        newSortedObject.push([key, 'ASC']);
      } else if (value === -1) {
        newSortedObject.push([key, 'DESC']);
      }
    });
  }
  return newSortedObject;
};

module.exports.createOne = createOne;
module.exports.createMany = createMany;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.deleteByPk = deleteByPk;
module.exports.findOne = findOne;
module.exports.paginate = paginate;
module.exports.findAll = findAll;
module.exports.count = count;
module.exports.upsert = upsert;
module.exports.queryBuilderParser = queryBuilderParser;
module.exports.sortParser = sortParser;
