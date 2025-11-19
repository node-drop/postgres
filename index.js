// Export the node definitions
module.exports = {
  nodes: {
    "postgres": require("./nodes/postgres.node.js"),
  },
  credentials: {
    "postgresDb": require("./credentials/postgresDb.credentials.js"),
  },
};
