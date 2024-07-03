import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { DarkMode } from "./utils";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthProvider";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider>
          <DarkMode />
          <AppRoutes />
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
