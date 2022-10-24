import { filter } from 'lodash';
import { useState, useEffect, useRef, Fragment, forwardRef } from 'react';

import { Card, Table, Stack, Container, Typography, TableContainer, Box } from '@mui/material';

import { UserListHead, UserListToolbar, RecordNotFound, NoRecord, Loading } from '../../common/MainContent'

import MoMBody from "./MoMBody"
import AddIcon from '@mui/icons-material/Add';
import MoMAdd from './MoMAdd';
import TransitionsModal from '../../common/Modal';

import useMoM from '../../../utils/MoM';
import useTemplate from '../../../utils/Templates';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'venue', label: 'Venue', alignRight: false },
  { id: "", }
];


// Simple comparator function
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// To define comparators for ascending and descending
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// To sort the array values and filter. Done by searching for query string within each record
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    // console.log(array[0].name.toLowerCase().indexOf(query), query)
    let result = filter(array, (_user) => _user.venue.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return [result, result.length];
  }

  let result = (stabilizedThis.map((el) => el[0]));
  return [result, result.length];
}


export default function MoMMain({ memberList }) {

  const { getMoM, loading, putMoM, addMoM, addLoading, deleteMoM, deleteLoading } = useMoM();
  const { downloadFile, downloadLoading } = useTemplate()

  let USERLIST = useRef([]);
  let RecordExist = useRef(false);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('venue');
  const [filterName, setFilterName] = useState(0);
  const [isUserNotFound, setIsUserNotFound] = useState(false);

  const [alertAdd, setAlertAdd] = useState(false);

  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [message, setMessage] = useState("");

  const [newUID, setNewUID] = useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
    setInfo(false);
  };


  useEffect(() => {

    async function fetchData() {
      if (filterName === 0) {
        setFilterName('');
        let response = await getMoM();
        USERLIST.current = response["data"];
      }
      if (USERLIST.current.length === 0)
        RecordExist.current = false;
      else {
        RecordExist.current = true;
        let result = applySortFilter(USERLIST.current, getComparator(order, orderBy), filterName)
        setFilteredUsers(result[0]);
        setIsUserNotFound(result[1] === 0);
      }
    }
    fetchData();
  }, [filterName, order, orderBy])


  // Change sorting order
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Depracted as checkboxes removed
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Change filter criteria
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDelete = async (uuid) => {
    console.log("Deleting MoM " + uuid);
    const response = await deleteMoM(uuid);
    console.log(response);

    if (response["code"] === 200) {
      setInfo(true);
      setFilterName(0);
      setMessage("Record deleted successfully");
    }
    else {
      setError(true);
      setMessage(response["data"]);
    }
  }

  const handleEdit = async (data) => {
    console.log("Editing MoM ");
    const response = await putMoM(data['uuid'], data);
    console.log(response);

    if (response["code"] === 200) {
      setInfo(true);
      setFilterName(0);
      setMessage("Record edited successfully");
    }
    else {
      setError(true);
      setMessage(JSON.stringify(response["data"]))
    }
    console.log(data);
  }

  const handleAdd = async (data) => {
    console.log("Adding MoM ");
    const response = await addMoM(data);
    console.log(response);

    if (response["code"] === 201) {
      setInfo(true);
      setFilterName(0);
      setMessage("Record created successfully");
    }
    else {
      setError(true);
      setMessage(JSON.stringify(response["data"]))
    }
    console.log(data);
  }

  const handleDownload = async (uuid) => {
    console.log("Download MoM ");
    const response = await downloadFile(uuid, 'mom');

    if (response["code"] === 200) {
      setInfo(true);
      console.log("success")
      setFilterName(0);
      setMessage("Record downloaded successfully");
    }
    else {
      setError(true);
      setMessage("Error generating PDF")
    }

  }


  return (
    <Box sx={{ width: "100%", height: "100%" }}>

      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <> {message} </>
        </Alert>
      </Snackbar>

      <Snackbar open={info} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          <> {message} </>
        </Alert>
      </Snackbar>

      <Snackbar open={addLoading} autoHideDuration={3000}>
        <Alert severity="info" sx={{ width: '100%' }}>
          Performing change...
        </Alert>
      </Snackbar>

      <Snackbar open={downloadLoading} autoHideDuration={3000}>
        <Alert severity="info" sx={{ width: '100%' }}>
          Downloading PDF...
        </Alert>
      </Snackbar>

      <Snackbar open={deleteLoading} autoHideDuration={3000}>
        <Alert severity="info" sx={{ width: '100%' }}>
          Performing delete...
        </Alert>
      </Snackbar>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={3}>
          <Typography variant="h4" gutterBottom>
            Minutes of Meetings
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName === 0 ? '' : filterName}
            onFilterName={handleFilterByName} placeholder={'Search venue'}
            showButton={true} buttonText={"Create MoM"} buttonIcon={<AddIcon />}
            handleButton={() => { setAlertAdd(true); }} />

          <TransitionsModal open={alertAdd} setOpen={setAlertAdd}
            childElement={<MoMAdd handleSubmit={handleAdd} uid={newUID} mode={"add"} memberList={memberList}/>} />

          <TableContainer sx={{ minWidth: 800, width: "100%" }}>
            <Table sx={{ width: "100%" }}>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

              {/* Explicit comparisions to true and false seems to be required else it still goes in. */}
              {
                loading === true ? <Loading /> :

                  <Fragment>
                    {RecordExist.current === true ?
                      <MoMBody filteredUsers={filteredUsers} selected={selected}
                        handleDelete={handleDelete} handleEdit={handleEdit} 
                        handleDownload={handleDownload} memberList={memberList}/>
                      : <NoRecord />}
                    {isUserNotFound === true && RecordExist.current === true && <RecordNotFound filterName={filterName} />}
                  </Fragment>
              }

            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Box>
  );
}
