import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import QuizAnalyticsPieChart from '../components/QuizAnalyticsPieChart';

export default function Dashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);  // State to store analytics data
  const [loading, setLoading] = useState(true);  // State to manage loading state

  // Handle logout function
  const handleLogout = () => {
    Cookies.remove('jwtoken');
    Cookies.remove('user');
    navigate('/login');
  };

  // Fetch user analytics data
  async function fetchUserAnalytics() {
    // Get user details from cookies and parse the JSON string
    const userDetails = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    const token = Cookies.get("jwtoken");

    if (!userDetails || !token) {
      console.error("User is not authenticated");
      setLoading(false);
      return;
    }

    const userId = userDetails._id;  // Extract user ID from the parsed user details
    const apiUrl = process.env.REACT_APP_HOST_NAME + `api/user/${userId}/analytics`;

    try {
      // Make the GET request to fetch user analytics
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'token': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const analyticsData = await response.json();  // Parse the response JSON
      // // console.log("User analytics:", analyticsData);  // For debugging

      // Set analytics data to state
      setAnalytics(analyticsData);
      setLoading(false);  // Set loading to false after data is fetched

    } catch (error) {
      console.error("Failed to fetch user analytics:", error);
      setLoading(false);
    }
  }

  // Fetch user details from the cookie
  const getUserDetails = () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;  // Parse the user JSON string to an object
  };
  const totalAvailableQuizzes = 124;  // Example total quizzes
  const totalQuizzesAttempted = 1;     // Example quizzes attempted

  const userDetails = getUserDetails();

  // UseEffect to fetch analytics data when the component mounts
  useEffect(() => {
    fetchUserAnalytics();  // Call the function to fetch analytics data
  }, []);

  return (
    <div>
      <Navbar />
      {/* Ensure that userDetails is not null before trying to access its properties */}
      <h1>Welcome, {userDetails ? userDetails.Name : 'Guest'} </h1>

      {/* Check if data is still being loaded */}
      {/* {console.log(Cookies.get('jwtoken'))} */}
      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        <div>
          {analytics ? (
            <div>
              <h2>Your Analytics Data</h2>
              {/* You can structure this based on the shape of your analytics data */}
              <pre>{JSON.stringify(analytics, null, 2)}</pre>  {/* Pretty print JSON */}
            </div>
          ) : (
            <p>No analytics data available</p>
          )}
        </div>

      )}
      <QuizAnalyticsPieChart
        totalAvailableQuizzes={totalAvailableQuizzes}
        totalQuizzesAttempted={totalQuizzesAttempted}
      />
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
