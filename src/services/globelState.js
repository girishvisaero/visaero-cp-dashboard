import { useQuery } from "@tanstack/react-query";
import { getEnterPriseAccount, ipApi, verifySession } from ".";

export const useEnterpriseAccount = () => {
  return useQuery({
    queryKey: ["enterprise-account"],
    queryFn: getEnterPriseAccount,
  });
};

export const useGloblePermission = (data) => {
  return useQuery({
    enabled: !!data?.data && data?.data === "success",
    queryKey: ["permissions"],
    refetchOnWindowFocus: 'always',
    queryFn: verifySession,
  });
};

export const useLocalDetails = (data) => {
  // console.log("data", data);
  return useQuery({
    // enabled: !!data?.data && data?.data === "success",
    queryKey: ["local-details"],
    // staleTime: 1000,
    queryFn: ipApi,
  });
};
