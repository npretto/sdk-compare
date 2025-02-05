import http from "http";
import jwt from "jsonwebtoken";

const METABASE_JWT_SHARED_SECRET =
  "0000000000000000000000000000000000000000000000000000000000000000";
const METABASE_INSTANCE_URL = "http://localhost:3000";

const server = http.createServer(async (req, res) => {
  // Allow CORS
  console.log("request received", req.method, req.url);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");

  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
  }

  // Continue with the rest of your code
  if (req.url?.startsWith("/api/sso") && req.method === "GET") {
    ssoHandler(req, res);
  } else {
    console.log("Request got, returning 200 ok bye");
    res.statusCode = 200;
    res.end();
  }
});

async function ssoHandler(
  _req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage }
) {
  console.log("SSO request received!");
  res.writeHead(200, { "Content-Type": "text/html" });

  const user = {
    email: "test@example.org",
    firstName: "SDK USER",
    lastName: "Smith",
  };

  const token = jwt.sign(
    {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      exp: Math.round(Date.now() / 1000) + 60 * 10, // 10 minutes expiration
    },
    METABASE_JWT_SHARED_SECRET
  );
  const ssoUrl = `${METABASE_INSTANCE_URL}/auth/sso?token=true&jwt=${token}`;
  console.log("ssoUrl", ssoUrl);

  try {
    const response = await fetch(ssoUrl, { method: "GET" });
    const session = await response.text();
    console.log("Session from MB", session);
    console.log("[DEBUG]", "token", typeof session, session);
    res.write(session);
    return res.end();
  } catch (error) {
    console.log("error", error);
    if (error instanceof Error) {
      res.write(error.message);
      return res.end();
    }
    res.write("unknown error");
    return res.end();
  }
}

const port = process.env.PORT || 8888;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
