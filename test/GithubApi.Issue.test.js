const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com/user';
const githubUserName = 'Datorresp';
const repository = 'axios-api-testing-excercise';
