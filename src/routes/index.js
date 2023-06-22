import { Switch, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Class from '../pages/Class';
import User from '../pages/User';
import AddUser from '../pages/AddStudent';
import Billing from '../pages/Billing';
import PageNotFound from '../pages/PageNotFound';
import Profile from '../pages/Profile';
import SITE_MAP from '../constants/path';
import ProtectedRouter from './ProtectedRouter';
import Activity from '../pages/Activity';
import AddActivity from '../pages/Activity/AddActivity';
import ActivityUser from "../pages/Activity/AcvityUser";
import ActivityDetail from "../pages/Activity/ActivityDetail";
import MyActivity from "../pages/Activity/MyActivity";
import SendClearProof from "../pages/ClearProof/SendClearProof";
import ConfirmProof from "../pages/ClearProof/ConfirmProof";

const MainRouter = () => {
    return (
        <Switch>
            <Route path={SITE_MAP.LOGIN} exact component={SignIn} />

            <ProtectedRouter exact path={SITE_MAP.MANAGER_CLASS.LIST} component={Class} />

            <ProtectedRouter exact path={SITE_MAP.MANAGER_USER.LIST} component={User} />
            <ProtectedRouter exact path={SITE_MAP.MANAGER_USER.CREATE} component={AddUser} />

            <ProtectedRouter exact path={SITE_MAP.MANAGER_ACTIVITY.LIST} component={Activity} />
            <ProtectedRouter exact path={SITE_MAP.MANAGER_ACTIVITY.USER} component={ActivityUser} />
            <ProtectedRouter exact path={SITE_MAP.MANAGER_ACTIVITY.DETAIL} component={ActivityDetail} />
            <ProtectedRouter exact path={SITE_MAP.MY_ACTIVITY.LIST} component={MyActivity} />
            <ProtectedRouter exact path={SITE_MAP.SEND_PROOF.SEND} component={SendClearProof} />
            <ProtectedRouter exact path={SITE_MAP.SEND_PROOF.CONFIRM_PROOF} component={ConfirmProof} />
            <ProtectedRouter
                exact
                path={SITE_MAP.MANAGER_ACTIVITY.CREATE}
                component={AddActivity}
            />

            <ProtectedRouter exact path="/billing" component={Billing} />
            <ProtectedRouter exact path={SITE_MAP.PROFILE} component={Profile} />
            <ProtectedRouter path={SITE_MAP.PROFILE} component={Profile} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    );
};
export default MainRouter;
