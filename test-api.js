async function testAPI() {
  try {
    console.log("Testing POST comment...");
    const res = await fetch('http://localhost:5000/api/interactions/1/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Test comment', user: 'Tester' })
    });
    const data = await res.json();
    console.log("Add Comment Response:", data);
  } catch (err) {
    console.error("Fetch failed", err);
  }
}
testAPI();
