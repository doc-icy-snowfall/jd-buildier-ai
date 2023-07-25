import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import './Style.scss';
import { jsPDF } from "jspdf";
import annalect_logo from '../assets/annalect_logo.png'
import { StateContext } from '../Context';

const TemplateAnnalect = ({handlePageForm}) => {
    const [data, setData] = useState([]);
    const { nwExstngRole, setNwExstngRole, nwBonusPoint, setNwBonusPoint, nwQuaRequ, setNwQuaRequ, 
        nwCity, setNwCity, nwPositionData , setNwPositionData } = useContext(StateContext);
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
        <Grid item className='hrpsitnSec'>
            <Typography>We Are looking for</Typography>
            <Typography className='greentxt' 
                sx={{fontSize:'2em !important', marginTop: '-10px !important'}}>
                    {nwPositionData.position}</Typography>
            
        </Grid>
        <Grid container className='locSec'>
            <Grid item xs={6} md={6} className='jdsec'>
                <Typography>Location:
                {nwCity.location.map((index, i) => (
                    <React.Fragment key={index}>
                    <span>{index}</span>
                    {i !== nwCity.location.length - 1 && <span> \ </span>}
                    </React.Fragment>
                ))}
                </Typography>
                <Typography >www.annalect.com/in</Typography>
            </Grid>
            <Grid item xs={6} md={6} className='lctnSec'>
            <Typography className='paratxt'>
                {nwPositionData.position_role}
            </Typography>
            </Grid>
        </Grid>
        <Grid item className='abtCompny'>
            <Typography className='greentxt'>About Annalect India</Typography>
            <Typography  className='paratxt'>
                We are an integral part of Annalect Global and Omnicom Group, the second largest advertising agency holding
                company in the world in terms of revenue and is the leading global marketing communications company. Our
                portfolio includes: three global advertising agency networks: BBDO, DDB and TBWA; three of the world’s premium
                media services: OMD, PHD and Hearts & Science.
            </Typography>
            <Typography  className='paratxt'>
                Annalect India plays a key role for our group companies and global agencies by providing stellar products and
                services in areas of Creative Services, Technology, Marketing Science (data & analytics) and Media Services. We
                currently have 800+ awesome colleagues (in Annalect India) who are committed to solve our clients’ pressing
                business issues. We are growing rapidly and looking for talented professionals like you to be part of this journey.
                Let us build this, together!
            </Typography>
            {/* <Typography className='greentxt'>Let us build this, together!</Typography> */}
        </Grid>
        <hr style={{width:'20%'}}></hr>
        <Grid container className='rlsnrespo'>
            <Grid item xs={6} md={6}>
                {/* <Box className='workclslysec' >
                    <Typography className='greentxt'>You will be working closely with</Typography>
                    <Typography  className='paratxt'>
                        {nwPositionData.you_work_closely}
                    </Typography>
                </Box> */}
                <Box className='roledescr'>
                    <Typography className='greentxt'>This is an exciting role and would entail you to</Typography>
                    <ul  className='paratxt ultxt'>
                        {nwExstngRole.map((role_data, index) =>(
                            <li  key={index}>{role_data.roles}</li>
                        ))}
                    </ul>
                </Box>
                {/* <Box className='desirable' >
                    <Typography sx={{fontWeight: '700', 
                    fontSize: '0.7em', marginTop: '0.5em'}}>Desirable:</Typography>
                    <ul  className='paratxt ultxt'>
                        {nwBonusPoint.map((des_data, index) =>(
                            <li key={index}>{des_data.b_point}</li>
                        ))}
                    </ul>
                </Box> */}
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
            <hr style={{width: '25%'}} />
            <Typography className='paratxt' sx={{marginBottom:'-10px'}}>Are you ready? Send your resume at<br />
            <span className='greentxt'><b>careers.india@annalect.com</b></span><br />
                We are an equal opportunity employer and value diversity.<br/>All employment is decided on 
                the basis of qualifications, merit and business need.
                </Typography>
        </Grid>
    </div>
    
    </>
  )
}

export default TemplateAnnalect