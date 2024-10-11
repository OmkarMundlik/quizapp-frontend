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
import CreateArticle from './CreateArticle'
import AllArticlesAdmin from './AllArticlesAdmin'
import AllArticlesPage from './AllArticlesPage';

import Alert from '../components/Alert';
import Ebooks from './Ebooks';
import UploadContent from './UploadContent';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import TermsConditions from './TermsConditions';
import PrivacyPolicy from './PrivacyPolicy';
import LatestUpdates from './LatestUpdates';
import LatestUpdate from './LatestUpdate';
import CreateLatestUpdate from './CreateLatestUpdate';
import Dashboard from './Dashboard';
import Error from '../components/Error';
import Login from '../components/Login';
import Signup from '../components/Signup'
import UserProtectedRoute from '../components/UserProtectedRoute';

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
    },
    {
      path:'/uploadcontent',
      element: <AdminProtected Component={UploadContent} />
    },{
      path: "/about-us",
      element: <AboutUs />
    },
    {
      path:"/contact-us",
      element: <ContactUs />
    },
    {
      path: "/terms-conditions",
      element: <TermsConditions />
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />
    }, 
    {
      path: "/latest-updates",
      element: <LatestUpdates />
    },
    {
      path:"/latest-update/:updateId",
      element: <LatestUpdate />
    },
    {
      path: "/create-updates",
      element: <AdminProtected Component={CreateLatestUpdate}/>
    },
    // {
    //   path: "/dashboard",
    //   element: 
    //     <UserProtectedRoute Component={Dashboard} />
    // },
    // {
    //   path : "/signup",
    //   element : <Signup />
    // },
    // {
    //   path : "/login",
    //   element : <Login />
    // },
    {
      path: "*",
      element: <Error />,
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
