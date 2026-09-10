const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser({ explicitArray: false });
// Make sure 'export.xml' matches your actual downloaded XML file name
const xmlData = fs.readFileSync('export.xml', 'utf8'); 

parser.parseString(xmlData, (err, result) => {
  if (err) {
    console.error('Error parsing XML:', err);
    return;
  }

  const items = result.rss.channel.item;

  const pages = items.map(item => ({
    title: item.title,
    slug: item['wp:post_name'],
    type: item['wp:post_type'],
    content: item['content:encoded']
  })).filter(item => item.type === 'page' || item.type === 'post');

  // Ensures the src/data directory exists before writing
  if (!fs.existsSync('./src/data')) {
    fs.mkdirSync('./src/data', { recursive: true });
  }

  fs.writeFileSync('./src/data/wordpressContent.json', JSON.stringify(pages, null, 2));
  console.log('Successfully created src/data/wordpressContent.json!');
});