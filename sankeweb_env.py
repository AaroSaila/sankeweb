import os


host = os.environ["SANKEWEB_HOST"]
port = os.environ["SANKEWEB_PORT"]
url = "./src/main/resources/static/env.js"

with open(url, "w") as f:
    f.writelines(
f"""const ENV = {{
  http: "http://{host}:{port}",
  wsSp: "ws://{host}:{port}/ws/sp",
  wsMp: "ws://{host}:{port}/ws/mp"
}};


export default ENV;
"""
            )
