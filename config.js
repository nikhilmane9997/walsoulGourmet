module.exports = {
    ssl: {
      enabled: process.env.SSL_ENABLED === 'true',
      redirect: true,             // Redirect non-SSL requests to SSL port.
      email: process.env.SSL_EMAIL, // Contact email for your Let's Encrypt registration.
      domains: process.env.SSL_DOMAINS.split(','), // SSL Domain names
      prod: process.env.SSL_PROD === 'true', // if false, provisions (untrusted) SSL certs that avoid 5 certs/week/domain limit.
      plainPorts: [8080],         // Map to 80
      tlsPorts: [8443, 8001],     // Map to 443 and 5001
      certsDir: '/var/cpanel/ssl/cpanel/'  // Docker volume if certs are persisted.
      // certsDir: require('os').homedir() + '/.ssl_certs' // Use if developing on OSX/Linux
    },
  };
