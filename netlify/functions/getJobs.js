export async function handler() {
  // Replace with Adzuna API call if you want live data (server-side)
  const jobs = [
    { id: 'adz-1', category: 'Software Development', title: 'Frontend Developer', company: { display_name: 'TechCorp' }, description: 'Seeking Frontend Developer skilled in JavaScript, TypeScript, React, CSS, HTML, REST, testing (Jest). Nice to have: Redux, Next.js, accessibility.' },
    { id: 'adz-2', category: 'Software Development', title: 'Backend Developer', company: { display_name: 'DataSoft' }, description: 'Seeking Backend Engineer skilled in Node.js, Express, SQL, Docker.' }
  ];
  return { statusCode: 200, body: JSON.stringify(jobs) };
}
