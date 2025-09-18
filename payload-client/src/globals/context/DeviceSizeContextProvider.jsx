import { createContext, useContext } from "react";
import useMediaQuery from "../../hooks/useMediaQUery";

const DeviceContext = createContext();

export function DeviceSizeContextProvider({ children }) {
  const isSmall = useMediaQuery("(max-width: 575px)");
  const isMedium = useMediaQuery("(min-width: 575px) and (max-width: 991px)");
  const isLarge = useMediaQuery("(min-width: 992px)");

  return (
    <DeviceContext.Provider
      value={{
        isSmall,
        isMedium,
        isLarge,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export const useDeviceSizeContext = () => {
  return useContext(DeviceContext);
};
