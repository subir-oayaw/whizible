import * as React from "react";
import {
  Stack,
  Text,
  PrimaryButton,
  IconButton,
  Image,
  Persona,
  PersonaSize
} from "@fluentui/react";
import { mergeStyles } from "@fluentui/react/lib/Styling";

const profileContainerStyles = mergeStyles({
  maxWidth: 600,
  padding: 20,
  margin: "auto",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  borderRadius: 8,
  backgroundColor: "#fff"
});

const ProfilePage = () => {
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const { employeeName, roleName, emailId, location, department, employeeType } = userdata;

  return (
    <div className={profileContainerStyles}>
      <Stack tokens={{ childrenGap: 20 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Stack horizontal tokens={{ childrenGap: 20 }} verticalAlign="center">
            <Persona size={PersonaSize.size72} text={employeeName} secondaryText={roleName} />
          </Stack>
          {/* <IconButton
            iconProps={{ iconName: "Edit" }}
            title="Edit Profile"
            ariaLabel="Edit Profile"
          /> */}
        </Stack>
        <Stack tokens={{ childrenGap: 12 }}>
          <Text variant="xLarge">{employeeName}</Text>
          <Text>
            <strong>Email:</strong> {emailId}
          </Text>
          <Text>
            <strong>Location:</strong> {location}
          </Text>
          <Text>
            <strong>Department:</strong> {department}
          </Text>
          <Text>
            <strong>Employee Type:</strong> {employeeType}
          </Text>
          {/* Add more fields as needed */}
        </Stack>
        {/* <PrimaryButton text="Save Changes" /> */}
      </Stack>
    </div>
  );
};

export default ProfilePage;
