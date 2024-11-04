const owner = 'netalkGB';
const repo = 'gb.netalk.io';

async function fetchOpenPullRequests(owner, repo) {
  const baseUrl = 'https://api.github.com';
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  };

  try {
    const prsResponse = await fetch(
      `${baseUrl}/repos/${owner}/${repo}/pulls?state=open&per_page=100`,
      { headers }
    );
    if (!prsResponse.ok) {
      throw new Error(`Failed to fetch PR list: ${prsResponse.status}`);
    }
    const prs = await prsResponse.json();

    const prDetails = await Promise.all(prs.map(async (pr) => {
      const filesResponse = await fetch(
        `${baseUrl}/repos/${owner}/${repo}/pulls/${pr.number}/files`,
        { headers }
      );
      if (!filesResponse.ok) {
        throw new Error(`Failed to fetch files: PR #${pr.number} - ${filesResponse.status}`);
      }
      const files = await filesResponse.json();

      return {
        pullRequest: pr,
        changedFiles: files
      };
    }));

    return prDetails;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

async function getAllOpenPRs() {
  try {
    const results = await fetchOpenPullRequests(owner, repo);
    
    for (const result of results) {
      console.log('====================')
      console.log('PR Number:', result.pullRequest.number)
      console.log('Title:', result.pullRequest.title)
      console.log('Author:', result.pullRequest.user.login)
      console.log('URL:', result.pullRequest.html_url)
      
      console.log('\nChanged Files:')
      for (const file of result.changedFiles) {
        console.log(`- ${file.filename} (${file.status})`)
        console.log(`  Additions: ${file.additions}, Deletions: ${file.deletions}`)
      }
      console.log('====================\n')
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

getAllOpenPRs();

