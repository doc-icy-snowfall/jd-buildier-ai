import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import './Style.scss';
import { jsPDF } from "jspdf";
import annalect_logo from '../assets/annalect_logo.png'
import { StateContext } from '../Context';

const TemplateAnnalect = ({handlePageForm}) => {
    const [data, setData] = useState([]);
    const { nwExstngRole, nwQuaRequ, nwCity, nwPositionData } = useContext(StateContext);
  useEffect(()=>{
    const local_data = localStorage.getItem('all_data');
    const jsonData = JSON.parse(local_data);
    setData(jsonData)
  },[]);

    const generatePDF = () => {

        const report = new jsPDF('portrait','pt','a4');
        report.html(document.querySelector('#annalect_temp'), {
            callback: () => {
                // Set footer content
                const footerComponent = document.querySelector('#annalect_footer');
                const pageCount = report.internal.getNumberOfPages();
                
                // Set the footer for each page
                for (let i = 1; i <= pageCount; i++) {
                    report.setPage(i);
                    report.setFontSize(10);
                    report.setTextColor(128);
                    const footerText = footerComponent.innerText;
                        report.text(footerText, report.internal.pageSize.getWidth() / 2, 
                        report.internal.pageSize.getHeight() - 40, { align: 'center', marginBottom:'-5px' });
                }
            }
        }).then(() => {
            report.save('Annalect India Job Description - ' + nwPositionData.position);
        });
    };

  return (
    <>
    <div>
        <div className='btnsec'><Button onClick={generatePDF}>Print</Button></div>
    </div>
    
    <div id='annalect_temp' className='template'>
        <Grid container className='logoImg'>
            <Grid item xs={12} md={12} sx={{textAlign:'right'}}>
                <img className='imgSize' src={annalect_logo} />
            </Grid>
        </Grid>
        <Grid container className='locSec'>
            <Grid item xs={6} md={6} className='jdsec'>
                <Typography className='greentxt jdtitle'>
                        {nwPositionData.position}</Typography>
                <Typography className='jddesc'> Location :
                {nwCity.location.map((index, i) => (
                    <React.Fragment key={index}>
                    <span> {index} </span>
                    {i !== nwCity.location.length - 1 && <span> \ </span>}
                    </React.Fragment>
                ))}
                </Typography>
                <Typography  className='jddesc'>www.annalect.com/in</Typography>
            </Grid>
            <Grid item xs={6} md={6} className='lctnSec'>
            <Typography className='paratxt'>
                {nwPositionData.position_role}
            </Typography>
            </Grid>
        </Grid>
        <Grid item className='abtCompny'>
            <Typography className='greentxt'>About Us</Typography>
            <Typography  className='paratxt'>
                We are an integral part of Annalect Global and Omnicom Group, one of the largest media 
                and advertising agency holding companies in the world. Omnicom’s branded networks and 
                numerous specialty firms provide advertising, strategic media planning and buying, digital 
                and interactive marketing, direct and promotional marketing, public relations, and other 
                specialty communications services. Our agency brands are consistently recognized as being 
                among the world’s creative best.
            </Typography>
            <Typography  className='paratxt'>
                Annalect India plays a key role for our group companies and global agencies by providing 
                stellar products and services in areas of Creative Services, Technology, Marketing Science 
                (data & analytics), Market Research, Business Support Services, Media Services, Consulting 
                & Advisory Services. We currently have 2500+ awesome colleagues (in Annalect India) who are 
                committed to solve our clients’ pressing business issues. We are growing rapidly and 
                looking for talented professionals like you to be part of this journey. Let us build this, 
                together
            </Typography>
        </Grid>
        <Grid container className='rlsnrespo'>
            <Grid item xs={6} md={6} sx={{borderRight: '1px solid'}}>
                <Box className='roledescr'>
                    <Typography className='greentxt'>This is an exciting role and would entail you to</Typography>
                    <ul  className='paratxt ultxt'>
                        {nwExstngRole.map((role_data, index) =>(
                            <li  key={index}>{role_data.roles}</li>
                        ))}
                    </ul>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box className='reqdescsec'>
                    <Typography className='greentxt'>This may be the right role for you if you have</Typography>
                    <ul className='paratxt ultxt'>
                        {nwQuaRequ.map((qne_data, index) =>(
                            <li key={index}>{qne_data.q_n_R}</li>
                        ))}
                    </ul>
                </Box>
            </Grid>
        </Grid>
    </div>
    <div id='annalect_footer' className='template'>
        <Grid item className='footer'>
            <Typography className='paratxt' sx={{marginBottom:'-10px'}}>Sounds interesting?<br />
            <span className='greentxt'>Let’s connect: <b>Careers.India@annalect.com</b></span><br />
            We are an equal opportunity employer and value diversity.<br />
            All employment is decided on the basis of qualifications, merit and business need.
                </Typography>
        </Grid>
    </div>
    
    </>
  )
}

export default TemplateAnnalect