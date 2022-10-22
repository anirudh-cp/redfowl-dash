import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import PersonIcon from '@mui/icons-material/Person';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

import SideBar from '../components/common/SideBar';
import ContentWrap from '../components/common/ContentWrap'

import UserMain from '../components/dashboard/users/UserMain';
import MoMMain from '../components/dashboard/mom/MoMMain';

import useHeaderVisiblityStore from '../storages/HeaderVisibility';

import UnderDevelopment from '../components/common/UnderDevelopment';
import useUser from '../utils/User';


export default function Dashboard() {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const { setHideUserOptions } = useHeaderVisiblityStore();

    const { getUserSimple, loading } = useUser();
    const [updateKey, setUpdateKey] = useState(0);

    let MEMBERS = useRef([]);

    useEffect(() => {
        setHideUserOptions(false);
    }, [setHideUserOptions])


    useEffect(() => {

        async function fetchData() {
            let response = await getUserSimple();
            MEMBERS.current = response["data"];
        }
        fetchData();

    }, [updateKey])


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SideBar items={["Users", "MoM"]}
                icons={[<PersonIcon />, <SpeakerNotesIcon />]}
                selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {selectedIndex === 0 ? <ContentWrap
                    childElement={<UserMain setUpdateKey={setUpdateKey}/>} /> : <></>}
                {selectedIndex === 1 ? <ContentWrap
                    childElement={<MoMMain memberList={MEMBERS.current}/>} /> : <></>}
            </Box>
        </Box>
    );
}
