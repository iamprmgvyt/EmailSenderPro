const https = require('https');

const API_HOSTNAME = 'emailsenderpro.vercel.app';
const API_PORT = 443;
const API_PATH = '/api/send-email';

/**
 * Sends an email using the EmailSenderPro API.
 * @param {object} options - The options for sending the email.
 * @param {string} options.apiKey - Your API key.
 * @param {string} options.to - The recipient's email address.
 * @param {string} options.body - The email content (HTML or plain text).
 * @param {string} [options.subject] - The email subject. Uses dashboard default if not provided.
 * @returns {Promise<object>} A promise that resolves with the server's response.
 */
function send({ apiKey, to, subject, body }) {
    return new Promise((resolve, reject) => {
        if (!apiKey || !to || !body) {
            return reject(new Error('Missing required parameters: apiKey, to, and body are required.'));
        }

        const emailDetails = { to, subject, body };
        const data = JSON.stringify(emailDetails);

        const requestOptions = {
            hostname: API_HOSTNAME,
            port: API_PORT,
            path: API_PATH,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'Content-Length': Buffer.byteLength(data)
            },
        };

        const req = https.request(requestOptions, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedResponse = JSON.parse(responseBody);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsedResponse);
                    } else {
                        const error = new Error(`API Error: ${parsedResponse.message || 'Unknown error'}`);
                        error.statusCode = res.statusCode;
                        reject(error);
                    }
                } catch (e) {
                    reject(new Error(`Failed to parse API response. Status: ${res.statusCode}, Body: ${responseBody}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Request failed: ${error.message}`));
        });

        req.write(data);
        req.end();
    });
}

module.exports = {
    send,
    _version: "0.1.3" 
};
