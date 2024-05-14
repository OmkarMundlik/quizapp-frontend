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
import ArticleMain from './ArticleMain';
import AllArticles from './AllArticles';
import CreateArticle from './CreateArticle'
import AllArticlesAdmin from './AllArticlesAdmin'
import AllArticlesPage from './AllArticlesPage';
import { useContext } from 'react';
import ResultContext from '../context/ResultContext';

import Alert from '../components/Alert';
import Ebooks from './Ebooks';

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
    },
    {
      path : "/articles",
      element: <AllArticlesPage />
    },
    {
      path : "/article/:articleId",
      element : <ArticleMain />
    },{
      path: "/createarticle", 
      element: <AdminProtected Component={CreateArticle}/>
    },{
      path: "/allarticles",
      element:<AdminProtected Component={AllArticlesAdmin}/>
    },
    {
      path: '/ebooks',
      element: <Ebooks />
    }
  ]);

  // const {alertContext} = useContext(ResultContext);
  return (
    <div className="unselectable">
      <ScoreState>
        {/* {alertContext.isActive && <Alert message={alertContext.message} status={alertContext.status} />} */} 
        <Alert />
        <RouterProvider router={router} />

      </ScoreState>
    </div>
  );

}

export default App;
