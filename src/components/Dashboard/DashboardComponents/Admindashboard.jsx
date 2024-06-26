import React from "react";
import AddRole from "./AddRole";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Charts from "../../Charts";
import ManageTracker from "./ManageTracker";
import WardAlert from "./WardAlert";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Admindashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="Manage Workers" {...a11yProps(1)} />
            <Tab label="Manage Vehicles" {...a11yProps(2)} />
            <Tab label="Ward Alert" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Charts />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AddRole />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ManageTracker />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <WardAlert />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Admindashboard;
