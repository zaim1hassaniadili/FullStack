import * as React from 'react';
import JobApplicationAdmin from "./JobApplicationAdmin";
import AdminUser from "./AdminUser";
import Navbar from "../Navbar"
import Company from "./AdminCompany"
import AdvertisementTable from "./AdminAdvertisement";


export default function DashBoardAdmin() {
    return (
        <div>
            <Navbar/>
            <AdminUser/>
            <div style={{marginTop: "20%"}}>
                <JobApplicationAdmin/>
            </div>
            <div style={{marginTop: "20%"}}>
                <Company/>
            </div>
            <div style={{marginTop: "20%"}}>
                <AdvertisementTable/>
            </div>

        </div>
    );
}