module.exports={
  "facebook_api_key"      :     "912171315529397",
  "facebook_api_secret"   :     "e1352a09d35002ce74fcfc44ae1904c5",
  "callback_url"          :     "http://localhost:8080/auth/facebook/callback",
  "connectionString"      :      process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/mydb',
  "server_port"           :      process.env.OPENSHIFT_NODEJS_PORT || 8080,
  "server_ip_address"     :      process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
}// JavaScript Document