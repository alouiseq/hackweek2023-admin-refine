import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import axios from "axios";

import { notificationProvider, ThemedLayout } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
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
import {
  StudentList,
  StudentCreate,
  StudentEdit,
  StudentShow,
} from "pages/studentsInferred";
import {
  GradeList,
  GradeCreate,
  GradeEdit,
  GradeShow,
} from "pages/gradesInferred";

function App() {
  // const apiUrl = "http://localhost:4001/admin";
  const apiUrl = "http://localhost:3000/api/admin";

  const simpleRestProvider = dataProvider(apiUrl);
  const myDataProvider = {
    ...simpleRestProvider,
    getList: async ({ resource }) => {
      const { data } = await axios.get(`${apiUrl}/${resource}`);

      return {
        data: data?.data,
      };
    },
    update: async ({ resource, id, variables }) => {
      const url = `${apiUrl}/${resource}/${id}`;

      const { data } = await axios.put(url, variables);

      return {
        data: data?.data,
      };
    },
    getOne: async ({ resource, id }) => {
      const { data } = await axios.get(`${apiUrl}/${resource}/${id}`);

      return {
        data: data?.data,
      };
    },
  };
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            // dataProvider={dataProvider(apiUrl)}
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
                name: "inventory",
                list: "/inventory",
                create: "/inventory/create",
                edit: "/inventory/edit/:id",
                show: "/inventory/show/:id",
                meta: {
                  canDelete: true,
                  label: "Inventory",
                },
              },
            ]}
          >
            <ThemedLayout Header={Header}>
              <Routes>
                <Route index element={<NavigateToResource resource="home" />} />
                <Route index path="/home" element={<Home />} />
                <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route path="create" element={<ContactCreate />} />
                  <Route path="edit/:id" element={<ContactEdit />} />
                  <Route path="show/:id" element={<ContactShow />} />
                </Route>
                <Route path="/students">
                  <Route index element={<StudentList />} />
                  <Route path="create" element={<StudentCreate />} />
                  <Route path="edit/:id" element={<StudentEdit />} />
                  <Route path="show/:id" element={<StudentShow />} />
                </Route>
                <Route path="/grades">
                  <Route index element={<GradeList />} />
                  <Route path="create" element={<GradeCreate />} />
                  <Route path="edit/:id" element={<GradeEdit />} />
                  <Route path="show/:id" element={<GradeShow />} />
                </Route>
                {/* <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route path="create" element={<ContactCreate />} />
                  <Route path="edit/:id" element={<ContactEdit />} />
                  <Route path="show/:id" element={<ContactShow />} />
                </Route> */}
                {/* </Route> */}
              </Routes>
            </ThemedLayout>
            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
