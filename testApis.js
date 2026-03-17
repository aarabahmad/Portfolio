async function testApis() {
  try {
    const lc = await fetch("https://alfa-leetcode-api.onrender.com/aarabahmad/badges");
    console.log("LC Badges Status:", lc.status);
    console.log(await lc.text());
  } catch(e) { console.error("LC Error", e); }
  
  try {
    const lcFull = await fetch("https://alfa-leetcode-api.onrender.com/aarabahmad");
    console.log("LC Full Status:", lcFull.status);
    console.log(await lcFull.text());
  } catch(e) { console.error("LC Error", e); }
}

testApis();
