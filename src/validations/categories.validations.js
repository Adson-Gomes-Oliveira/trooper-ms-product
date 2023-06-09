const JOI = require('joi');
const HTTPStatus = require('../helpers/HTTP.status');
const customError = require('../helpers/error.custom');

const create = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(/^[^0-9]/).required(),
    subCategories: JOI.array().items(JOI.string()),
    tags: JOI.array().items(JOI.string()),
    thumbnail: JOI.string().required(),
  }).validate(payload);

  if (error) throw customError(error.message.replace(/\\|"/g, ''), HTTPStatus.UN_ENTITY);
};

const update = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(/^[^0-9]/).required(),
    status: JOI.string().pattern(/^(active|inactive)$/).required(),
    subCategories: JOI.array().items(JOI.string()),
    tags: JOI.array().items(JOI.string()),
    thumbnail: JOI.string().required(),
  }).validate(payload);

  if (error) throw customError(error.message.replace(/\\|"/g, ''), HTTPStatus.UN_ENTITY);
};

const updateStatus = (payload) => {
  const { error } = JOI.object({
    status: JOI.string().pattern(/^(active|inactive)$/).required(),
  }).validate(payload);

  if (error) throw customError(error.message.replace(/\\|"/g, ''), HTTPStatus.UN_ENTITY);
};

module.exports = {
  create,
  update,
  updateStatus,
};
