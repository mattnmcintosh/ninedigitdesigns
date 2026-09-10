import fs from 'fs';
import path from 'path';
import 'dotenv/config'; 

const WP_URL = 'https://9digitdesigns.wordpress.com/wp-json/wp/v2/media?per_page=100';
const DOWNLOAD_DIR = './gallery-images';

async function downloadGallery() {
  const wpUser = process.env.VITE_WP_USERNAME;
  const rawToken = process.env.VITE_WP_TOKEN;

  // 1. Debugging Check
  console.log('--- Environment Check ---');
  console.log(`Username loaded: ${wpUser ? `Yes (${wpUser})` : 'NO'}`);
  console.log(`Token loaded:    ${rawToken ? 'Yes' : 'NO'}`);
  console.log('-------------------------');

  if (!wpUser || !rawToken) {
    console.error('❌ Error: Missing credentials. Check your .env file in the project root.');
    return;
  }

  // 2. Format the token (WordPress provides it with spaces, but the API needs it without spaces)
  const cleanToken = rawToken.replace(/\s+/g, '');
  const credentials = Buffer.from(`${wpUser}:${cleanToken}`).toString('base64');

  if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR);
  }

  try {
    console.log('Fetching media list from WordPress...');
    // If the site is public, you don't even need the password!
    const response = await fetch(WP_URL);
    
    if (!response.ok) {
      console.error(`❌ WP API Error: ${response.status} ${response.statusText}`);
      const errText = await response.text();
      console.error('Error Details:', errText);
      return;
    }
    
    const media = await response.json();
    console.log(`Found ${media.length} items. Starting download...`);

    for (const item of media) {
      if (item.media_type !== 'image') continue;

      const imageUrl = item.source_url;
      const filename = path.basename(new URL(imageUrl).pathname);
      const destPath = path.join(DOWNLOAD_DIR, filename);

      const imgResponse = await fetch(imageUrl);
      const arrayBuffer = await imgResponse.arrayBuffer();
      
      fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
      console.log(`Downloaded: ${filename}`);
    }
    
    console.log('✅ All images downloaded successfully.');
  } catch (error) {
    console.error('❌ Download failed:', error.message);
  }
}

downloadGallery();