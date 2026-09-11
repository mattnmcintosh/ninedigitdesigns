const fs = require('fs');
const https = require('https');
const http = require('http');
const xml2js = require('xml2js');
const path = require('path');

const parser = new xml2js.Parser({ explicitArray: false });
const xmlData = fs.readFileSync('export.xml', 'utf8');

parser.parseString(xmlData, async (err, result) => {
  if (err) {
    console.error('Error parsing XML:', err);
    return;
  }

  const items = result.rss.channel.item;
  const imageUrls = new Set();

  // Regex to find image URLs inside post content and attachments
  const imgRegex = /src="(https?:\/\/[^"\s]+\.(jpg|jpeg|png|gif|webp))/gi;

  items.forEach(item => {
    const content = item['content:encoded'] || '';
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      imageUrls.add(match[1]);
    }
    // Also check attachment URLs if present
    if (item['wp:attachment_url']) {
      imageUrls.add(item['wp:attachment_url']);
    }
  });

  console.log(`Found ${imageUrls.size} unique image URLs to download.`);

  for (const imgUrl of imageUrls) {
    try {
      const urlPath = new URL(imgUrl).pathname;
      const localPath = path.join(__dirname, 'public', urlPath);
      const dir = path.dirname(localPath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await downloadFile(imgUrl, localPath);
      console.log(`Downloaded: ${urlPath}`);
    } catch (e) {
      console.error(`Failed to download ${imgUrl}:`, e.message);
    }
  }
  console.log('Image download complete!');
});

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, response => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        download(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        reject(new Error(`Server responded with status code ${response.statusCode}`));
      }
    }).on('error', err => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function downloadFile(url, dest) {
  await download(url, dest);
}