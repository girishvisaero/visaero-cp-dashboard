// import createInstance from '../axiosAuth'
import { notifications } from "@mantine/notifications";
import axios from "../config/axios";
// import createInstance, { axiosNoSession } from "../config/axiosAuth";

const useNetworkHandler = () => {
  //   const navigate = useNavigate();

  axios.interceptors.response.use(
    (res) => {
      // console.log("config", res.config.message);
      if (res.data?.data == "error") {
        notifications.show({
          title: "Error",
          color: "red",
          autoClose: 1000,
          message: res?.data?.msg,
          onOpen: () => {
            notifications.cleanQueue();
            notifications.clean();
          },
          onClose: () => {
            notifications.cleanQueue();
            notifications.clean();
          },
        });
      }

      return res;
    },
    (error) => {
      const expectedError =
        error.response?.status >= 400 && error.response?.status < 500;

      // console.log("error >>", error);
      if (error && error?.message !== "canceled") {
        notifications.show({
          title: "Error",
          color: "red",
          message: "Something went wrong!",
        });
        notifications.cleanQueue();
      }
      return Promise.reject(error);
    }
  );

  return;
};

export default useNetworkHandler;
