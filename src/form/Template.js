import { Grid } from '@mui/material';
import React, { useState } from 'react'
import TemplateAnnalect from './TemplateAnnalect';
import TemplateOmni from './TemplateOmni';
import { Button } from '@mui/base';

const Template = ({handlePageForm}) => {
    const [page, setPage] = useState('annalect');
    const handleAnnaClick = () =>{
        setPage('annalect')
    }
    const handleOmniClick = () =>{
        setPage('omni')
    }

  return (
    <>
    <Grid container className={page === 'annalect' ? 'baseTemplate_anna' : 'baseTemplate_omni'}>
        <Grid item className='btnsec'>
            <Button onClick={handleAnnaClick} className='annabutn'>Annalect</Button>
            <Button onClick={handleOmniClick} className='ombibutn'>Omnicom</Button>
            <Button onClick={handlePageForm} className='bckbutn'>Back</Button>
        </Grid>
        <Grid item>
            {page === 'annalect' && <TemplateAnnalect />}
            {page === 'omni' && <TemplateOmni />}
        </Grid>
    </Grid>
    </>
  )
}

export default Template