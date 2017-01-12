
exports.conn ={
  user: 'u9go1trr7iaqk9', //env var: PGUSER
  database: 'dep7lmd20r322q', //env var: PGDATABASE
  password: 'pfda4b915345920e9079e60b001144cd9f662b5cbcdefe93e64ce7a84a4276472', //env var: PGPASSWORD
  host: 'ec2-52-199-132-95.ap-northeast-1.compute.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  ssl: true
};
