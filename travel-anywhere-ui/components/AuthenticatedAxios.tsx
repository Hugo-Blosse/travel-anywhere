import axios, { AxiosError, AxiosInstance } from "axios";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import {useCookies} from "react-cookie";

const AxiosContext = createContext<AxiosInstance | undefined>(axios);

export const useAuthenticatedAxios = (): AxiosInstance => useContext(AxiosContext) as AxiosInstance;

export type Props = {
  children?: React.ReactNode;
};

export const AuthenticatedAxiosProvider = ({ children }: Props): React.JSX.Element => {
    const [cookies] = useCookies(["atkCookie"]);

  const instance = useMemo(
    () =>
      axios.create({
        timeout: 70_000,
        headers: {
          common: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.atkCookie}`,
          },
        },
      }),
    [cookies],
  );

  useEffect(() => {
    const errorInterceptor = instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.response.eject(errorInterceptor);
    };
  }, [instance]);

  return <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>;
};
