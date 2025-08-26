import { BrowserRouter } from 'react-router';
import ProjectRoutes from './routes/Routes';

function App() {
    return (
        <BrowserRouter>
            <ProjectRoutes />
        </BrowserRouter>
    );
}

export default App;
