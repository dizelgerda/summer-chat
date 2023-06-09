const optionsCORS = {
  origin: ["http://localhost:3001"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "origin", "Authorization"],
  credentials: true,
};

module.exports = {
  optionsCORS,
};
