import { useState } from "react";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import axios from "axios";
import {
  notificationProvider,
  ThemedLayout,
  ThemedSider,
  RefineThemes,
} from "@refinedev/antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { stringify } from "query-string";
import { ConfigProvider, theme } from "antd";
import "@refinedev/antd/dist/reset.css";

import ThemeSettings from "components/theme-settings";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { Home } from "pages/home/Home";
import {
  ContactList,
  ContactCreate,
  ContactEdit,
  ContactShow,
} from "pages/contactsInferred";
// } from "pages/contacts";

function App() {
  const [customTheme, setCustomTheme] = useState({
    token: RefineThemes.Magenta.token,
    algorithm: theme.darkAlgorithm,
  });

  const baseApiUrl = "http://localhost:3000/api/admin";
  const inventoryApiUrl = `${baseApiUrl}/inventory`;
  const paymentsApiUrl = `${baseApiUrl}/payments`;

  const simpleRestProvider = dataProvider(baseApiUrl);
  const myDataProvider = {
    ...simpleRestProvider,
    getList: async ({ resource, sorters, pagination, filters }) => {
      let apiUrl = baseApiUrl;
      switch (resource) {
        case "programs":
        case "program_cohorts":
        case "cohorts":
        case "courses":
        case "academic_partners":
        case "recurly_skus":
        case "instructors":
          apiUrl = inventoryApiUrl;
          break;
        case "vendors":
        case "types":
        case "price_sheets":
        case "purchases":
          apiUrl = paymentsApiUrl;
          break;
        default:
          apiUrl = baseApiUrl;
      }

      let finalApiUrl = `${apiUrl}/${resource}`;
      const searchValue = filters && filters.length && filters[0].value;
      if (searchValue) {
        const queryFilters = { [filters[0].field]: searchValue };
        finalApiUrl = `${finalApiUrl}?${stringify(queryFilters)}`;
      }
      const { data } = await axios.get(finalApiUrl);

      return {
        data: data?.data,
      };
    },
    getOne: async ({ resource, id }) => {
      let apiUrl = baseApiUrl;
      switch (resource) {
        case "programs":
        case "program_cohorts":
        case "cohorts":
        case "courses":
        case "academic_partners":
        case "recurly_skus":
        case "instructors":
          apiUrl = inventoryApiUrl;
          break;
        default:
          apiUrl = baseApiUrl;
      }
      const { data } = await axios.get(`${apiUrl}/${resource}/${id}`);

      return {
        data: data?.data,
      };
    },
    create: async ({ resource, variables }) => {
      let apiUrl = baseApiUrl;
      switch (resource) {
        case "programs":
        case "program_cohorts":
        case "cohorts":
        case "courses":
        case "academic_partners":
        case "recurly_skus":
        case "instructors":
          apiUrl = inventoryApiUrl;
          break;
        default:
          apiUrl = baseApiUrl;
      }
      const { data } = await axios.post(`${apiUrl}/${resource}`, variables);

      return {
        data: data?.data,
      };
    },
    update: async ({ resource, id, variables }) => {
      let apiUrl = baseApiUrl;
      switch (resource) {
        case "programs":
        case "program_cohorts":
        case "cohorts":
        case "courses":
        case "academic_partners":
        case "recurly_skus":
        case "instructors":
          apiUrl = inventoryApiUrl;
          break;
        default:
          apiUrl = baseApiUrl;
      }
      const { data } = await axios.put(
        `${apiUrl}/${resource}/${id}`,
        variables
      );

      return {
        data: data?.data,
      };
    },
  };
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <ConfigProvider theme={customTheme}>
            <ThemeSettings
              currentTheme={customTheme}
              onThemeClick={(theme) => setCustomTheme(theme)}
            />
            <Refine
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              dataProvider={myDataProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              resources={[
                {
                  name: "home",
                  list: "/home",
                  meta: {
                    label: "Home",
                  },
                },
                {
                  name: "contacts",
                  list: "/contacts",
                  create: "/contacts/create",
                  edit: "/contacts/edit/:id",
                  show: "/contacts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "students",
                  list: "/students",
                  create: "/students/create",
                  edit: "/students/edit/:id",
                  show: "/students/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "grades",
                  list: "/grades",
                  create: "/grades/create",
                  edit: "/grades/edit/:id",
                  show: "/grades/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "Inventory",
                },
                {
                  name: "programs",
                  list: "/programs",
                  create: "/programs/create",
                  edit: "/programs/edit/:id",
                  show: "/programs/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Inventory",
                  },
                },
                {
                  name: "program_cohorts",
                  list: "/program_cohorts",
                  create: "/program_cohorts/create",
                  edit: "/program_cohorts/edit/:id",
                  show: "/program_cohorts/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Inventory",
                    label: "Program Cohorts",
                  },
                },
                {
                  name: "cohorts",
                  list: "/cohorts",
                  create: "/cohorts/create",
                  edit: "/cohorts/edit/:id",
                  show: "/cohorts/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Inventory",
                  },
                },
                {
                  name: "courses",
                  list: "/courses",
                  create: "/courses/create",
                  edit: "/courses/edit/:id",
                  show: "/courses/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Inventory",
                  },
                },
                {
                  name: "academic_partners",
                  list: "/academic_partners",
                  create: "/academic_partners/create",
                  edit: "/academic_partners/edit/:id",
                  show: "/academic_partners/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Inventory",
                    label: "Academic Partners",
                  },
                },
                {
                  name: "recurly_skus",
                  list: "/recurly_skus",
                  create: "/recurly_skus/create",
                  edit: "/recurly_skus/edit/:id",
                  show: "/recurly_skus/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Inventory",
                    label: "Recurly Skus",
                  },
                },
                {
                  name: "instructors",
                  list: "/instructors",
                  create: "/instructors/create",
                  edit: "/instructors/edit/:id",
                  show: "/instructors/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Inventory",
                  },
                },
                {
                  name: "Payments",
                },
                {
                  name: "vendors",
                  list: "/vendors",
                  create: "/vendors/create",
                  edit: "/vendors/edit/:id",
                  show: "/vendors/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Payments",
                  },
                },
                {
                  name: "types",
                  list: "/types",
                  create: "/types/create",
                  edit: "/types/edit/:id",
                  show: "/types/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Payments",
                  },
                },
                {
                  name: "price_sheets",
                  list: "/price_sheets",
                  create: "/price_sheets/create",
                  edit: "/price_sheets/edit/:id",
                  show: "/price_sheets/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Payments",
                  },
                },
                {
                  name: "purchases",
                  list: "/purchases",
                  create: "/purchases/create",
                  edit: "/purchases/edit/:id",
                  show: "/purchases/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "Payments",
                  },
                },
                {
                  name: "Bulk Uploads",
                },
                {
                  name: "guild_purchases",
                  list: "/guild_purchases",
                  meta: {
                    canDelete: true,
                    parent: "Bulk Uploads",
                    label: "Guild Purchases",
                  },
                },
                {
                  name: "amazon_purchases",
                  list: "/amazon_purchases",
                  meta: {
                    parent: "Bulk Uploads",
                    label: "Amazon Purchases",
                  },
                },
                {
                  name: "chrysalis_users",
                  list: "/chrysalis_users",
                  meta: {
                    parent: "Bulk Uploads",
                    label: "Chrysalis Users",
                  },
                },
                {
                  name: "employers",
                  list: "/employers",
                  create: "/employers/create",
                  edit: "/employers/edit/:id",
                  show: "/employers/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
            >
              <ThemedLayout
                Header={Header}
                Sider={() => (
                  <ThemedSider
                    Title={() => (
                      <div
                        style={{
                          color: "#FFF",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        <img src="/logo.png" alt="logo" width="44" />
                        <span style={{ marginLeft: "10px" }}>Glinda 2.0</span>
                      </div>
                    )}
                  />
                )}
              >
                <Routes>
                  <Route
                    index
                    element={<NavigateToResource resource="home" />}
                  />
                  <Route index path="/home" element={<Home />} />
                  <Route path="/contacts">
                    <Route index element={<ContactList />} />
                    <Route path="create" element={<ContactCreate />} />
                    <Route path="edit/:id" element={<ContactEdit />} />
                    <Route path="show/:id" element={<ContactShow />} />
                  </Route>
                  <Route path="/students">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/grades">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/programs">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/program_cohorts">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/cohorts">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/courses">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/academic_partners">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/recurly_skus">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/instructors">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/vendors">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/types">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/price_sheets">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/purchases">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="/guild_purchases">
                    <Route index element={<AntdInferencer />} />
                  </Route>
                  <Route path="/amazon_purchases">
                    <Route index element={<AntdInferencer />} />
                  </Route>
                  <Route path="/chrysalis_users">
                    <Route index element={<AntdInferencer />} />
                  </Route>
                  <Route path="/employers">
                    <Route index element={<AntdInferencer />} />
                    <Route path="create" element={<AntdInferencer />} />
                    <Route path="edit/:id" element={<AntdInferencer />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                </Routes>
              </ThemedLayout>
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </ConfigProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
