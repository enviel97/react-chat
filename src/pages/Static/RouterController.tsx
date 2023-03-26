import client from "@core/api";
import { safeLog, showToast, Status } from "@core/api/utils/logger";
import {
  isLoginRequired,
  isRequestError,
  isServerError,
} from "@core/api/utils/statusValid";
import { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const ERR_CANCELED = "ERR_CANCELED";

const RouterController = () => {
  const navigate = useNavigate();

  const handleServerError = useCallback((error: any) => {
    const _message = error.response?.data?.message ?? Status.get(500)!;
    showToast(_message);
    return {
      code: error.response?.data?.code ?? error.code ?? error.status,
      message: _message,
      data: undefined,
    };
  }, []);

  const handlerBadError = useCallback((error: any) => {
    const _message = error.response?.data?.message ?? Status.get(500)!;
    showToast(_message);
    return {
      code: error.response?.data?.code ?? error.code ?? error.status,
      message: _message,
      data: undefined,
    };
  }, []);

  const handleIgnoreCancel = useCallback((error: any) => {
    if (error.code !== ERR_CANCELED) safeLog(error);
    else {
      showToast(error.request?.message ?? "Interval Client Error");
      return {
        code: error.request?.code ?? error.code,
        message: error.request?.message ?? error.message,
        data: undefined,
      };
    }
  }, []);

  const handlerLoginRequired = useCallback(
    (error: any) => {
      const { status } = error.response;
      showToast(Status.get(status)!);
      navigate("auth", {
        replace: true,
        state: { from: window.location.pathname },
      });
      return error.response?.data ?? error.response;
    },
    [navigate]
  );

  useEffect(() => {
    client.interceptors.request.use((config) => config);
    client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const { response } = error;
        if (!response) {
          return {
            code: error.status ?? error.code,
            message: error.message,
            data: undefined,
          };
        }
        const { status = 500 } = response;
        if (isLoginRequired(status)) {
          return handlerLoginRequired(error);
        }
        if (isRequestError(status)) {
          return handlerBadError(error);
        }
        if (isServerError(status)) {
          return handleServerError(error);
        }
      }
    );
  }, [
    navigate,
    handleServerError,
    handlerBadError,
    handleIgnoreCancel,
    handlerLoginRequired,
  ]);

  return <Outlet />;
};

export default RouterController;
