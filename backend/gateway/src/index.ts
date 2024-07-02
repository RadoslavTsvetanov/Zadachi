import express from "express";
import fs from "fs";
import axios from "axios";
import cors from "cors";

function resolveUrl(url: string): string {
  function get_subroute_after_base_route(url: string): string {
    // https://stackoverflow.com/questions/... -> /questions/...

    const index_of_two_backslashes = url.indexOf("//");
    return url.substr(index_of_two_backslashes + 1, url.length + 1);
  }

  const new_url = `http://${get_subroute_after_base_route(url)}`;
  return new_url;
}

const app = express();
const PORT = 3009;

const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

const microservices = JSON.parse(fs.readFileSync("microservices.json", "utf8"));

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
};
app.use(validateToken);
app.all("/", async (req: Request, res: Response) => {
  function resolveUrl(url: string): string {
    function get_subroute_after_base_route(url: string): string {
      // https://stackoverflow.com/questions/... -> /questions/...

      const index_of_two_backslashes = url.indexOf("//");
      console.log("index_of_two_backslashes", index_of_two_backslashes);
      const sub_url = url.substring(index_of_two_backslashes + 2);
      const index_before_service_name = sub_url.indexOf("/");
      console.log("index_of_service", index_before_service_name);
      return sub_url.substring(index_before_service_name + 1);
    }

    const new_url = `${get_subroute_after_base_route(url)}`;
    return new_url;
  }

  const url = resolveUrl(req.url);
  try {
    const response = await axios(url);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
