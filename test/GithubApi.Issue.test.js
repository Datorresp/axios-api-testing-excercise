const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com/user';
const githubUserName = 'Datorresp';
const repository = 'axios-api-testing-excercise';

describe('Github Api Test', function () {


    before(async function () {
        const response = await axios.get('https://api.github.com/user', {

              headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`,
              },
        });
        assert.strictEqual(response.status, 200);
    });

    describe('Issues', function () {

    let issueNumber = '';
    let issueTitle = 'HOLA';
    let issueBody = 'BODYHOLA';

    it('Create an issue', async function () {

        const url = `https://api.github.com/repos/${username}/${repositoryName}/issues`;
        const response = await axios.post(url,
        {
            title: issueTitle,
        },
        {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`,
          },
        }
      );

      assert.strictEqual(response.status, 201);
      issueNumber = response.data.number;
      assert.strictEqual(response.data.title, issueTitle);
      assert.strictEqual(response.data.body, null);
    });

        it('Update an issue', async function () {

            const url = `https://api.github.com/repos/${username}/${repositoryName}/issues/${issueNumber}`;
            const response = await axios.patch(
            url,
            {
              body: issueBody,
            },
            {
              headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`,
              },
            }
            );
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.number, issueNumber);
            assert.strictEqual(response.data.title, issueTitle);
            assert.strictEqual(response.data.body, issueBody);
    });

        it('should lock an issue', async function () {

            const url = `https://api.github.com/repos/${username}/${repositoryName}/issues/${issueNumber}/lock`;
            const response = await axios.put(url,
            {
              lock_reason: 'resolved',
            },
                {
                    headers: {
                        Authorization: `token ${process.env.ACCESS_TOKEN}`,
                    },
                }
            );
            assert.strictEqual(response.status, 204);
            assert.strictEqual(response.data.locked, true);
            assert.strictEqual(response.data.active_lock_reason, 'resolved');
        });

        it('should check that an issue is locked', async function () {
            const url = `https://api.github.com/repos/${username}/${repositoryName}/issues/${issueNumber}`;
            const response = await axios.get(url, {
                headers: {
                  Authorization: `token ${process.env.ACCESS_TOKEN}`,
                },
            });
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.locked, true);
            assert.strictEqual(response.data.active_lock_reason, 'resolved');
        });

        it('should unlock an issue', async function () {
            const url = `https://api.github.com/repos/${username}/${repositoryName}/issues/${issueNumber}/lock`;
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `token ${process.env.ACCESS_TOKEN}`,
                },
            });
            assert.strictEqual(response.status, 204);
            assert.strictEqual(response.data.locked, false);
            assert.strictEqual(response.data.active_lock_reason, null);
        });
    });
});
