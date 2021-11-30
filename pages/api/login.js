import withSession from "../../lib/session";
import authenticate from "../../lib/authenticate"

export default withSession(async (req, res) => {
  try {
    const { username } = await req.body
    const { password } = await req.body
    const data = await authenticate(username,password)
    // delete data.authToken
    const user = { isLoggedIn: true, ...data}
    
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});