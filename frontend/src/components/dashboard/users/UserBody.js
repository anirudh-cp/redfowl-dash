import { TableRow, TableBody, TableCell } from '@mui/material';
import UserMoreMenu from '../../common/MainContent/UserMoreMenu';

import TransitionsModal from '../../common/Modal';
import UserAdd from './UserAdd';

import { useState, Fragment } from 'react';
import AlertBox from '../../common/AlertBox';


const AdminBody = ({ filteredUsers, selected, handleDelete, handleEdit }) => {

  const [currentRecord, setCurrentRecord] = useState([]);

  const [alertDelete, setAlertDelete] = useState(false);
  const [recordDelete, setRecordDelete] = useState(0);

  const [alertEdit, setAlertEdit] = useState(false);
  const [recordEdit, setRecordEdit] = useState(0);


  const handleDeleteClick = (index) => {
    setAlertDelete(true);
    setRecordDelete(index);
  }

  const handleEditClick = (index) => {
    setAlertEdit(true);
    setRecordEdit(index);
  }


  return (

    <TableBody sx={{ width: "100%" }}>
      {filteredUsers.map((row) => {
        const { uuid, name, email } = row;
        const isItemSelected = selected.indexOf(name) !== -1;

        return (
          <Fragment key={uuid}>
          <TableRow
            hover
            tabIndex={-1}
            selected={isItemSelected}
            aria-checked={isItemSelected}
            sx={{ width: "100%" }}
            onClick={() => {setCurrentRecord(row);}}
          >
            <TableCell padding="checkbox">
              {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
            </TableCell>
            <TableCell align="left">{name}</TableCell>
            <TableCell align="left">{email}</TableCell>
            
            <TableCell align="right" onClick={(e) => { e.stopPropagation(); }}>
              <UserMoreMenu index={uuid} 
                  onDelete={() => { handleDeleteClick(uuid); }}
                  onEdit={() => { handleEditClick(uuid); setCurrentRecord(row); console.log(row)}} />
            </TableCell>
          </TableRow>

            <AlertBox title={"Delete Admin"}
              description={"Do you want to delete user? This action is irreversible."}
              open={alertDelete} setOpen={setAlertDelete} callBack={() => {handleDelete(recordDelete);}}/>

            <TransitionsModal open={alertEdit} setOpen={setAlertEdit} 
              childElement={<UserAdd handleSubmit={handleEdit} record={currentRecord}/>}  />

          </Fragment>
        );
      })}

    </TableBody>
  )
}

export default AdminBody