import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './admin/Companies'
import CompanyCreate from './admin/CompanyCreate'
import CompanySetup from './admin/CompanySetup'
import AdminJobs from './admin/Jobs'
import Postjob from './admin/Postjob'
import Applicant from './admin/Applicant'
import ProtectedRoute from './admin/ProtectedRoute'

function App() {

  const appRouter = createBrowserRouter([

    //user route
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:<Login/>
    },{
      path:'/signup',
      element:<Signup/>
    },{
      path:'/jobs',
      element:<Jobs/>
    },
    {
      path:"/description/:id",
      element:<JobDescription/>
    },
    {
      path:'/browse',
      element:<Browse/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },

    //admin route
    {
      path:"/admin/companies",
      element:<ProtectedRoute> <Companies/></ProtectedRoute>
    },
    {
      path:"/admin/companies/create",
      element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
    },
    {
      path:"/admin/company/:id",
      element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
    },
    //job route
    {
      path:"/admin/jobs",
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
    },
    {
      path:"/admin/job/create",
      element:<ProtectedRoute><Postjob/></ProtectedRoute>
    },
    {
      path:"/admin/jobs/:id/applicant",
      element:<ProtectedRoute><Applicant/></ProtectedRoute>
    }
  ])

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
