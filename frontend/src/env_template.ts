const host = "0.0.0.0";
const port = 8080;

const ENV = {
  http: `http://${host}:${port}`,
  wsSp: `ws://${host}:${port}/ws/sp`,
  wsMp: `ws://${host}:${port}/ws/mp`
};


export default ENV;