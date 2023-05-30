import Decorator from '../components/layout/Decorator';
import { Route } from 'react-router-dom';

const ProtectedRouter = ({ ...rest }) => {
    return (
        <Decorator>
            <Route {...rest} />
        </Decorator>
    );
};
export default ProtectedRouter;
