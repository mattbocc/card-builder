import { Route, Routes } from 'react-router';
import Home from '../pages/Home';

const ProjectRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default ProjectRoutes;
