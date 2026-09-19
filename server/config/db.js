const mongoose = require('mongoose');
const dns = require('dns');

// Use reliable DNS servers (Google / Cloudflare) to prevent querySrv ECONNREFUSED on networks with restrictive local DNS
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
  // Fallback to default system DNS if custom servers cannot be set
}

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('Error: MONGO_URI is not defined in your environment variables (.env)');
      return;
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
