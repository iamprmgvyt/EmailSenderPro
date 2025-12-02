const https = require('https');

function send(options) {
  const { apiKey, to, subject, body } = options;

  if (!apiKey || !to || !subject || !body) {
    console.error('Error: apiKey, to, subject, and body are all required.');
    return;
  }

  const data = JSON.stringify({
    to,
    subject,
    body,
  });

  const requestOptions = {
    hostname: 'emailsenderpro.vercel.app',
    port: 443,
    path: '/api/send-email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'x-api-key': apiKey,
    },
  };

  const req = https.request(requestOptions, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });
    res.on('end', () => {
      console.log('Response:', responseBody);
    });
  });

  req.on('error', (error) => {
    console.error('Error sending email:', error);
  });

  req.write(data);
  req.end();
}

module.exports = {
  send,
};
