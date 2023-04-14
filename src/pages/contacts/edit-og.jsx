import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useShow } from "@refinedev/core";
import { Button, Space, Tabs } from "antd";
import { ContactEdit } from "./edit";
import { ClimbApplicationList } from "../climbApplications";

const { TabPane } = Tabs;

const baseApiUrl = "http://localhost:3000/api/admin";

const useClimbApplications = (contactId) => {
  return useQuery(
    ["climbApplications", contactId],
    async () =>
      await axios.get(`${baseApiUrl}/contacts/${contactId}/climb_applications`),
    { enabled: !!contactId }
  );
};

const usePurchases = (contactId) => {
  return useQuery(
    ["purchases", contactId],
    async () =>
      await axios.get(`${baseApiUrl}/contacts/${contactId}/purchases`),
    {
      enabled: !!contactId,
    }
  );
};

export const ContactEditOg = () => {
  const { id } = useParams();

  const { queryResult: contactPayload } = useShow();
  const purchasesPayload = usePurchases(id);
  const climbApplicationsPayload = useClimbApplications(id);

  const contactPurchaseData = purchasesPayload?.data?.data;
  const contact = contactPayload?.data?.data;
  const climbApplicationsData = climbApplicationsPayload?.data?.data;

  return (
    <>
      <Space direction="vertical">
        <h2>
          Contact details for {`${contact?.firstName} ${contact?.lastName}`}
        </h2>
        <Button>
          <a
            href={`/api/admin/contacts/${contact?.id}/redirect_to_ac`}
            target="_blank"
            rel="noreferrer"
          >
            &nbsp;View in AC
          </a>
        </Button>
      </Space>

      <Tabs defaultActiveKey="details">
        <TabPane tab="Details" key="details">
          <ContactEdit />
        </TabPane>
        <TabPane tab="Climb Applications" key="loanDetails">
          <ClimbApplicationList />
        </TabPane>
        <TabPane tab="Purchases" key="purchaseDetails">
          {/* <PurchaseList /> */}
        </TabPane>
        <TabPane tab="Registrations" key="registrations">
          {/* <RegistrationsList /> */}
        </TabPane>
        <TabPane
          tab="Course Section Enrollments"
          key="courseSectionEnrollments"
        >
          {/* <CourseSectionEnrollmentList /> */}
        </TabPane>
      </Tabs>
    </>
  );
};
