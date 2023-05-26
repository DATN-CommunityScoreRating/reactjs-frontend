import { Switch, Route } from "react-router-dom";
import Main from "../components/layout/Main";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Class from "../pages/Class";
import User from "../pages/User";
import AddUser from "../pages/AddStudent";
import Tables from "../pages/Tables";
import Billing from "../pages/Billing";
import Profile from "../pages/Profile";
import Rtl from "../pages/Rtl";

const MainRouter = () => {
  return (
    <Switch>
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/sign-in" exact component={SignIn} />
      <Main>
        {/*<Route exact path="/users" component={User} />*/}
        <Route exact path="/classes" component={Class} />
        <Route exact path="/users" component={User} />
        <Route exact path="/add-user" component={AddUser} />
        <Route exact path="/tables" component={Tables} />
        <Route exact path="/billing" component={Billing} />
        <Route exact path="/rtl" component={Rtl} />
        <Route exact path="/profile" component={Profile} />
        {/*<Redirect from="*" to="/users" />*/}
      </Main>
    </Switch>
  )
}
export default MainRouter