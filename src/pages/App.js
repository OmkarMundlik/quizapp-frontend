import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Main';
import QuizesPage from './QuizesPage';
import Quiz from './Quiz';
import Result from './Result';
import ScoreState from '../context/ScoreState';
import CreateQuiz from './CreateQuiz';
import AdminLogin from '../components/AdminLogin';
import AdminProtected from '../protectedComps/AdminProtected';
import AdminPage from './AdminPage';
import AdminAllquizes from './AdminAllquizes';

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Main />
    },
    {
      path : "/start/:quizId",
      element : <Quiz />
    },
    {
      path : "/allquizes",
      element : <QuizesPage />
    },
    {
      path : "/result",
      element : <Result />
    },
    {
      path : "/createquiz",
      element : <AdminProtected Component={CreateQuiz}/>
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />
    },
    {
      path: "/adminpage", 
      element: <AdminProtected Component={AdminPage}/>
    },
    {
      path: "/allquizesforadmin",
      element: <AdminProtected Component={AdminAllquizes}/>
    }
  ])

  return (
    <div className="unselectable">
      <ScoreState>
      <RouterProvider router={router} />
      </ScoreState>
      </div>
  );
}

export default App;
