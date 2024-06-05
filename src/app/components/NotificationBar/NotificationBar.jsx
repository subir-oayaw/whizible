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
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination
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
  },
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
  },
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
  // Add more notifications as needed
];

export default function NotificationBar() {
  const { settings } = useSettings();
  const [panelOpen, setPanelOpen] = useState(false);
  const [duration, setDuration] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  const handleDrawerToggle = () => setPanelOpen(!panelOpen);
  const handleDurationChange = (event) => setDuration(event.target.value);
  const handlePageChange = (event, value) => setPage(value);

  // Calculate the range of notifications to display based on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotifications = notifications.slice(startIndex, endIndex);

  return (
    <Fragment>
      <IconButton onClick={handleDrawerToggle}>
        <Badge color="secondary" badgeContent={notifications?.length}>
          <Notifications sx={{ color: "text.primary" }} />
        </Badge>
      </IconButton>

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Dialog open={panelOpen} onClose={handleDrawerToggle} maxWidth="md" fullWidth>
          <DialogTitle
            sx={{
              backgroundColor: "#4263c1",
              color: "#fff",
              textAlign: "center",

              paddingBottom: 2
            }}
          >
            <Typography variant="h6">Alert</Typography>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ position: "absolute", top: 0, right: 0, color: "#fff" }}
            >
              <Clear />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box>
              <Box mb={3} display="flex" alignItems="center">
                <Notifications color="action" sx={{ color: "#fd7e14", mr: 1 }} />
                <Typography variant="h6" component="h6">
                  Alerts
                </Typography>
              </Box>
              <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1">Duration</Typography>
                <Select
                  value={duration}
                  onChange={handleDurationChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Select your Duration" }}
                  sx={{ ml: 2, width: 200, height: 25 }}
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
                <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="alert table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-center">Flag</TableCell>
                        <TableCell>Initiative Title</TableCell>
                        <TableCell>Nature of Initiative</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Due Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedNotifications.map((notification, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor: index % 2 === 0 ? "#f0f0f0" : "transparent",
                            "&:hover": {
                              backgroundColor: "#e0e0e0"
                            }
                          }}
                        >
                          <TableCell className="text-center">
                            <i
                              className={`fa-solid fa-flag ${notification.flagColor}`}
                              data-bs-toggle="tooltip"
                              data-bs-original-title={notification.status}
                            ></i>
                          </TableCell>
                          <TableCell>
                            <a href={notification.link}>{notification.title}</a>
                          </TableCell>
                          <TableCell>{notification.nature}</TableCell>
                          <TableCell>{notification.createdDate}</TableCell>
                          <TableCell>{notification.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={Math.ceil(notifications.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
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
