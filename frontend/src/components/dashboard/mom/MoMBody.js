import { TableRow, TableBody, TableCell } from '@mui/material';
import UserMoreMenu from '../../common/MainContent/UserMoreMenu';

import TransitionsModal from '../../common/Modal';
import MoMInfo from "./MoMInfo";
import MoMAdd from './MoMAdd';

import { useState, useEffect, Fragment } from 'react';
import AlertBox from '../../common/AlertBox';


const MoMBody = ({ memberList, filteredUsers, selected, handleDelete, handleEdit, handleDownload }) => {

  const [currentRecord, setCurrentRecord] = useState([]);
  const [open, setOpen] = useState(false);

  const [alertDelete, setAlertDelete] = useState(false);
  const [recordDelete, setRecordDelete] = useState(0);

  const [alertEdit, setAlertEdit] = useState(false);
  const [recordEdit, setRecordEdit] = useState(0);

  const [memberDict, setMemberDict] = useState({});

  const handleDeleteClick = (index) => {
    setAlertDelete(true);
    setRecordDelete(index);
  }

  const handleEditClick = (index) => {
    setAlertEdit(true);
    setRecordEdit(index);
  }

  useEffect(() => {
    console.log(memberList)
    setMemberDict(
      Object.assign(
        {}, ...memberList.map(
          (x) => ({[x.uuid]: `${x.name} (${x.email})`})
          )
      )
    );
  }, [])


  return (

    <TableBody sx={{ width: "100%" }}>
      {filteredUsers.map((row) => {
        const { uuid, date, venue } = row;
        
        return (
          <Fragment key={uuid}>
            <TableRow
              hover
              tabIndex={-1}
              sx={{ width: "100%" }}
              style={{cursor: 'pointer'}}
              onClick={() => { setOpen(true); setCurrentRecord(row); }}
            >
              <TableCell padding="checkbox">
                {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
              </TableCell>
              <TableCell component="th" scope="row">{date}</TableCell>
              <TableCell align="left">{venue}</TableCell>

              <TableCell align="right" onClick={(e) => { e.stopPropagation(); }}>
                <UserMoreMenu index={uuid}
                  onDelete={() => { handleDeleteClick(uuid); }}
                  onEdit={() => { handleEditClick(uuid); setCurrentRecord(row); console.log(row) }}
                  onDownload={() => { handleDownload(uuid); }} />
              </TableCell>
            </TableRow>

            <TransitionsModal open={open} setOpen={setOpen}
              childElement={<MoMInfo row={row} memberList={memberList} memberDict={memberDict}/>} />

            <AlertBox title={"Delete Admin"}
              description={"Do you want to delete admin? This action is irreversible."}
              open={alertDelete} setOpen={setAlertDelete} callBack={() => { handleDelete(recordDelete); }} />

            <TransitionsModal open={alertEdit} setOpen={setAlertEdit}
              childElement={<MoMAdd handleSubmit={handleEdit}
                uid={recordEdit} mode={"edit"} record={currentRecord} 
                memberList={memberList} memberDict={memberDict}/>} />

          </Fragment>
        );
      })}

    </TableBody>
  )
}

export default MoMBody