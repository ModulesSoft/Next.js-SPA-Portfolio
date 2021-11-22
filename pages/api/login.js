import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const session = await req.body;
  try {
    // we check that the user exists on GitHub and store some data in session
    const user = {...session,isLoggedIn:true}
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});