import { Switch, Route } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Class from '../pages/Class';
import User from '../pages/User';
import AddUser from '../pages/AddStudent';
import Tables from '../pages/Tables';
import Billing from '../pages/Billing';
import PageNotFound from '../pages/PageNotFound';
import Profile from '../pages/Profile';
import Rtl from '../pages/Rtl';
import SITE_MAP from '../constants/path';
import ProtectedRouter from './ProtectedRouter';

const MainRouter = () => {
    return (
        <Switch>
            <Route path={SITE_MAP.REGISTER} exact component={SignUp} />
            <Route path={SITE_MAP.LOGIN} exact component={SignIn} />

            <ProtectedRouter exact path={SITE_MAP.MANAGER_CLASS.LIST} component={Class} />
            <ProtectedRouter exact path={SITE_MAP.MANAGER_USER.LIST} component={User} />
            <ProtectedRouter exact path={SITE_MAP.MANAGER_USER.CREATE} component={AddUser} />
            <ProtectedRouter exact path="/tables" component={Tables} />
            <ProtectedRouter exact path="/billing" component={Billing} />
            <ProtectedRouter exact path="/rtl" component={Rtl} />
            <ProtectedRouter exact path={SITE_MAP.PROFILE} component={Profile} />
            <ProtectedRouter path={SITE_MAP.PROFILE} component={Profile} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    );
};
export default MainRouter;
