import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6)
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  marginTop: 0,
  borderRadius: theme.shape.borderRadius
}))

const LayoutAppBar = props => {
  // ** Props
  const { settings, appBarProps, appBarContent: userAppBarContent } = props

  // ** Vars
  const { appBar, appBarBlur } = settings

  const appBarBlurEffect = appBarBlur && {
    '&:after': {
      top: 0,
      left: 0,
      zIndex: -1,
      width: '100%',
      content: '""',
      position: 'absolute',
      backdropFilter: 'blur(10px)',
      height: theme => `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(4)})`,
      mask: theme =>
        `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default} 18%, transparent 100%)`,
      background: theme =>
        `linear-gradient(180deg,${hexToRGBA(theme.palette.background.default, 0.7)} 44%, ${hexToRGBA(
          theme.palette.background.default,
          0.43
        )} 73%, ${hexToRGBA(theme.palette.background.default, 0)})`
    }
  }
  if (appBar === 'hidden') {
    return null
  }
  let userAppBarStyle = {}
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx
  }
  const userAppBarProps = Object.assign({}, appBarProps)
  delete userAppBarProps.sx

  const background =
     `linear-gradient(90deg, rgb(20, 70, 107) 39%, rgb(30, 114, 141) 60%, rgb(31, 157, 183) 89%)`

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          background: background
        }}
      >
        <AppBar position='static'>
          <Toolbar variant='dense' sx={{ height: '20px' }}>
            <div>{(userAppBarContent && userAppBarContent(props)) || null}</div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default LayoutAppBar
