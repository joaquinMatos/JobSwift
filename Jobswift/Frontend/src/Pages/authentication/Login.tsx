import { Box, Grid, Typography } from "@mui/material"

const login = () => {

    return(
        <Box sx={{ height: '100vh' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={8} 
            sx={{ 
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography variant="h4" color="white">
              Primer Grid Item
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ 
            background: '#21bbff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="h4" color="white">
              Segundo Grid Item
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
}

export default login