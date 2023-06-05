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


    beforeEach(() => {

        dotenv.config();
    });

    describe('create Issues', function () {

        it("CREATE", async () => {

            const issue = {
            title: `${issueTitle}`,
            owner: `${username}`,
            repo: `${repository}`,
        };

        const issuePostResponse = await axios.post(
            `${urlBase}/repos/${username}/${repository}/issues`,
            issue,
            {
                headers: {

                    Authorization: `token ${process.env.ACCESS_TOKEN}`,
                },
            }
        );

        expect(issuePostResponse.status).to.equal(StatusCodes.CREATED);
        expect(issuePostResponse.data.title).to.equal(issue.title);
        expect(issuePostResponse.data.body).not.exist;
        issueNumber = issuePostResponse.data.number;
        });

        it('Update an issue', async function () {

            const issue = {
                  owner: `${username}`,
                  repo: `${repository}`,
                  issue_number: `${issueNumber}`,
                  body: "Holaaaa",
                };

                const issuePatchResponse = await axios.patch(
                  `${urlBase}/repos/${username}/${repository}/issues/${issueNumber}`,
                  issue,
                  {
                    headers: {
                      Authorization: `token ${process.env.ACCESS_TOKEN}`,
                    },
                  }
                );
                
                expect(issuePatchResponse.status).to.equal(StatusCodes.OK);

                const issueGetResponse = await getIssue();

                expect(issueGetResponse.data.title).to.equal(`${issueTitle}`);
                expect(issueGetResponse.data.body).to.equal(issue.body);
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
