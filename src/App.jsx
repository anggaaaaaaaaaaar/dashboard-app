import { Button, Result } from "antd";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  useNavigate,
} from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { AuthenticatedLayout } from "./layouts/AuthenticateLayout";
import { protectedRoute, unprotectedRoute } from "./routes";

const getUserData = () =>
  new Promise((resolve) => {
    const user = { token: "" };
    if (!user?.token) {
      // to enable animation
      setTimeout(() => {
        resolve(null);
      }, 3000);
    } else {
      resolve(user);
    }
  });

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onClickBackHome = () => {
    navigate("/");
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <div className="flex justify-center">
          <Button type="primary" onClick={onClickBackHome}>
            Back Home
          </Button>
        </div>
      }
    />
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={async () => defer({ userPromise: getUserData() })}
      errorElement={<NotFoundPage />}
    >
      <Route element={<HomeLayout />}>
        {unprotectedRoute.map((res, i) => (
          <Route key={i} path={res.path} element={<res.element />} />
        ))}
      </Route>

      <Route element={<AuthenticatedLayout />}>
        {protectedRoute.map((res, i) => (
          <Route key={i} path={res.path} element={<res.element />} />
        ))}
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
