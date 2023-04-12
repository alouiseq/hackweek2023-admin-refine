import { 
    Refine,
    GitHubBanner, 
    WelcomePage,
    Authenticated, 
} from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { AuthPage,ErrorComponent
,notificationProvider
,ThemedLayout} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";





function App() {
    

    
    
    return (
        <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
            <ColorModeContextProvider>
            <Refine notificationProvider={notificationProvider}
routerProvider={routerBindings}
dataProvider={dataProvider("https://api.fake-rest.refine.dev")} 
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >


                    <Routes>
                        <Route index element={<WelcomePage />} />
                    </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
            </Refine>
            </ColorModeContextProvider>
        </RefineKbarProvider>
        </BrowserRouter>
      );
};

export default App;
