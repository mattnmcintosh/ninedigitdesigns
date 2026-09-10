exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const payload = JSON.parse(event.body);

  // Handle Square inventory updated event
  if (payload.type === 'catalog.version.updated' || payload.event_type === 'inventory.count.updated') {
    // Trigger cache invalidation or update database state here
    console.log('Inventory update received from Square:', payload);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

//square developer dashboard will need to be 
//[https://your-site.netlify.app/.netlify/functions/webhook](https://your-site.netlify.app/.netlify/functions/webhook)