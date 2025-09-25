const HOST = location.hostname;
const PORT = location.port;

const ENV = {
  http: `http://${HOST}:${PORT}`,
  wsSp: `ws://${HOST}:${PORT}/ws/sp`,
  wsMp: `ws://${HOST}:${PORT}/ws/mp`
};


export default ENV;