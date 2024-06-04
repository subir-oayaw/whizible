import { Fragment, useState } from "react";
import {
  Box,
  Badge,
  IconButton,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Select,
  MenuItem
} from "@mui/material";
import { Clear, Notifications } from "@mui/icons-material";
import useSettings from "app/hooks/useSettings";
import "./Notification.css";
const notifications = [
  {
    flagColor: "yellowColor",
    status: "Today",
    title: "Core Title",
    nature: "Budget",
    createdDate: "05 Jul 2022",
    dueDate: "10 Aug 2022",
    link: "Initiative_Information.aspx"
  },
  {
    flagColor: "redColor",
    status: "Delayed",
    title: "Re-Implementation of Whiz",
    nature: "Organizational Approval",
    createdDate: "02 Sep 2022",
    dueDate: "12 Sep 2022",
    link: "Initiative_Information.aspx"
  },
  {
    flagColor: "greenColor",
    status: "Future",
    title: "Metro Small",
    nature: "Budget",
    createdDate: "18 Apr 2022",
    dueDate: "10 May 2022",
    link: "Initiative_Information.aspx"
  }
  // ... Add other notifications here
];

export default function NotificationBar() {
  const { settings } = useSettings();
  const [panelOpen, setPanelOpen] = useState(false);
  const [duration, setDuration] = useState("");

  const handleDrawerToggle = () => setPanelOpen(!panelOpen);
  const handleDurationChange = (event) => setDuration(event.target.value);

  return (
    <Fragment>
      <IconButton onClick={handleDrawerToggle}>
        <Badge color="secondary" badgeContent={notifications?.length}>
          <Notifications sx={{ color: "text.primary" }} />
        </Badge>
      </IconButton>

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Dialog open={panelOpen} onClose={handleDrawerToggle} maxWidth="lg" fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Alert</Typography>
              <IconButton onClick={handleDrawerToggle}>
                <Clear />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box>
              <Box mb={3}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" component="h6">
                    Alerts
                  </Typography>
                  <Notifications color="action" sx={{ ml: 1, mt: 0.5 }} />
                </Box>
                <Box mt={2} display="flex" alignItems="center">
                  <Typography variant="body1">Duration</Typography>
                  <Select
                    value={duration}
                    onChange={handleDurationChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Select your Duration" }}
                    sx={{ ml: 2 }}
                  >
                    <MenuItem value="">Select your Duration</MenuItem>
                    <MenuItem value="future">Future</MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="thisWeek">This Week</MenuItem>
                    <MenuItem value="lastWeek">Last Week</MenuItem>
                    <MenuItem value="older">Older</MenuItem>
                  </Select>
                </Box>
              </Box>
              <hr />
              <Box>
                <Typography variant="subtitle1">
                  <strong>Note:</strong> The Symbols Represents Entities as Below
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center">
                    <i className="fa-solid fa-flag redColor"></i>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Delayed
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <i className="fa-solid fa-flag yellowColor"></i>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Today
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <i className="fa-solid fa-flag greenColor"></i>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Future
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <i className="fas fa-stopwatch redColor"></i>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Delayed Initiative
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <i className="fa-solid fa-warehouse"></i>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Warehouse Delayed Initiative
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <hr />
              <Box>
                <Box style={{ height: 235, overflowY: "auto" }} className="main-alert-div">
                  <table className="table-striped table-hover table-bordered init-stickytable alert_table mb-0">
                    <thead>
                      <tr className="table-title">
                        <th className="text-center">Flag</th>
                        <th className="active">Initiative Title</th>
                        <th>Nature of Initiative</th>
                        <th>Created Date</th>
                        <th>Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.map((notification, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            <i
                              className={`fa-solid fa-flag ${notification.flagColor}`}
                              data-bs-toggle="tooltip"
                              data-bs-original-title={notification.status}
                            ></i>
                          </td>
                          <td>
                            <a href={notification.link}>{notification.title}</a>
                          </td>
                          <td>{notification.nature}</td>
                          <td>{notification.createdDate}</td>
                          <td>{notification.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Box>
              <Box
                mt={3}
                textAlign="center"
                className="Init_pagination light-theme simple-pagination"
              >
                <ul>
                  <li className="active">
                    <span className="current prev">«</span>
                  </li>
                  <li className="active">
                    <span className="current">1</span>
                  </li>
                  <li>
                    <a href="#page-2" className="page-link">
                      2
                    </a>
                  </li>
                  <li>
                    <a href="#page-3" className="page-link">
                      3
                    </a>
                  </li>
                  <li>
                    <a href="#page-2" className="page-link next">
                      »
                    </a>
                  </li>
                </ul>
              </Box>
              <hr />
              <Box textAlign="right" className="modal-footer">
                <Button variant="outlined" color="primary" onClick={handleDrawerToggle}>
                  Close
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </Fragment>
  );
}
