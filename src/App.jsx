import { Button, ConfigProvider, Result, theme } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { setDark } from "./store/settings";

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
  const dispatch = useDispatch();

  const [dark] = useLocalStorage("darkMode", false);
  const darkmode = useSelector((state) => state.setting.dark);

  useEffect(() => {
    dispatch(setDark(dark));
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm: darkmode ? theme.darkAlgorithm : theme.compactAlgorithm,
        components: {
          Typography: {
            colorText: "#9ca3af",
            fontFamily: "Poppins",
            algorithm: true, // Enable algorithm
          },
          Input: {
            colorPrimary: "#9ca3af",
            algorithm: true, // Enable algorithm
          },
          Select: {
            colorPrimary: "#9ca3af",
            algorithm: true, // Enable algorithm
          },
          DatePicker: {
            colorPrimary: "#9ca3af",
            algorithm: true, // Enable algorithm
          },
          Table: {
            // headerBg: "#ffffff",
            algorithm: true, // Enable algorithm
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
