const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com/user';
const githubUserName = 'Datorresp';
const repository = 'axios-api-testing-excercise';
const issueTitle = "Como se hace esto?";

let issueNumber;

async function getIssue() {
    return (issueGetResponse = await axios.get(`${urlBase}/repos/${githubUserName}/${repository}/issues/${issueNumber}`,
        {
            headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`,
            },
        }
    ));
}

describe('Github Api Testing', function () {

    describe('create Issues', function () {

        it("CREATE", async () => {

            const issue = {
            title: `${issueTitle}`,
            owner: `${githubUserName}`,
            repo: `${repository}`,
        };

        const issuePostResponse = await axios.post(
            `${urlBase}/repos/${githubUserName}/${repository}/issues`,
            issue,
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
        issueNumber = issuePostResponse.data.number;
        });

        it('Update an issue', async function () {

            const issue = {
                  owner: `${githubUserName}`,
                  repo: `${repository}`,
                  issue_number: `${issueNumber}`,
                  body: "Holaaaa",
            };

                const issuePatchResponse = await axios.patch(
                    `${urlBase}/repos/${githubUserName}/${repository}/issues/${issueNumber}`,
                    issue,
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

        it("Lock issue", async () => {
            const issue = {
                owner: `${githubUserName}`,
                repo: `${repository}`,
                issue_number: `${issueNumber}`,
                lock_reason: "resolved",
            };

            const putLockResponse = await axios.put(
                `${urlBase}/repos/${githubUserName}/${repository}/issues/${issueNumber}/lock`,
                issue,
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

        it("Unlock issue", async () => {
            const issue = {
              owner: `${githubUserName}`,
              repo: `${repository}`,
              issue_number: `${issueNumber}`,
            };

            const deleteUnlockResponse = await axios.delete(
                    `${urlBase}/repos/${githubUserName}/${repository}/issues/${issueNumber}/lock`,
                {
                    headers: {
                        Authorization: `token ${process.env.ACCESS_TOKEN}`,
                    },
                }
            );

            assert.strictEqual(response.status, 204);
            assert.strictEqual(response.data.locked, false);
            assert.strictEqual(response.data.active_lock_reason, null);
        });
    });
});