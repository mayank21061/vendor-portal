// ** React Imports
import { useEffect, useState } from 'react'
import styles from './login.module.css'
import { toast } from 'react-toastify'

// ** Next Imports
import CryptoJS from 'crypto-js'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme, alpha } from '@mui/material/styles'
import { Card, CardContent, CardHeader, InputBase } from '@mui/material'

// ** Custom Component Import

// ** Icon Imports
import vendorLogo from '../../assets/loginLogo.png'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginAction,
  loginData,
  loginError,
  loginIsError,
  loginIsLoading,
  loginIsSuccess,
  resetCheckTokenValidtyAction,
  resetLoginAction,
  resetRefreshction
} from 'src/redux/features/authSlice'
import Image from 'next/image'
import { getUserDetailsAction, resetgetUserDetailsAction } from 'src/redux/features/userSlice'
import bg1 from '../../assets/bg1.jpg'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '100%',
    padding: '6px 8px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))

// ** Styled Components

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@vuexy.com'
}

const HeaderTitle = styled(Typography)({
  fontWeight: 700,
  lineHeight: '40px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out',
  color: 'white'
})

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // ** Hooks
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const data = useSelector(loginData)
  const isLoading = useSelector(loginIsLoading)
  const isError = useSelector(loginIsError)
  const error = useSelector(loginError)
  const isSuccess = useSelector(loginIsSuccess)

  const userData = useSelector(state => state.user.userData)
  const userDataIsLoading = useSelector(state => state.user.userDataIsLoading)
  const userDataIsError = useSelector(state => state.user.userDataIsError)
  const userDataError = useSelector(state => state.user.userDataError)
  const userDataIsSuccess = useSelector(state => state.user.userDataIsSuccess)

  useEffect(() => {
    localStorage.clear()
    dispatch(resetRefreshction())
    dispatch(resetCheckTokenValidtyAction())
    dispatch(resetgetUserDetailsAction())
  }, [])

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('token', data?.access_token)
      localStorage.setItem('sessionId', data?.session_state)
      localStorage.setItem('username', username)
      localStorage.setItem('refresh_token', data.refresh_token)
      dispatch(resetLoginAction())
      dispatch(getUserDetailsAction())
    } else if (isError) {
      // console.log(error)
      toast(error, { autoClose: 2000, type: 'error' })
      dispatch(resetLoginAction())
    }
    if (userDataIsSuccess) {
      // console.log('userData', userData)
      localStorage.setItem('userData', JSON.stringify(userData))
      dispatch(resetgetUserDetailsAction())
      router.push('/dashboard')
    } else if (userDataIsError) {
      toast(userDataError, { autoClose: 2000, type: 'error' })
      dispatch(resetgetUserDetailsAction())
    }
  }, [dispatch, isSuccess, isError, userDataIsError, userDataIsSuccess])

  function encryptFun(password, username) {
    var keybefore = username + 'appolocomputers'
    var ivbefore = username + 'costacloud012014'
    var key = CryptoJS.enc.Latin1.parse(keybefore.substring(0, 16))
    var iv = CryptoJS.enc.Latin1.parse(ivbefore.substring(0, 16))

    var ciphertext = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString()

    return ciphertext
  }

  const onSubmit = e => {
    e.preventDefault()

    //  console.log('encrypted', encryptFun(password, username))

    dispatch(loginAction({ username, password: encryptFun(password, username) }))
  }

  return (
    <Box className='content-right' sx={{ backgroundImage: `url(${bg1.src})`, backgroundSize: 'cover' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            borderRadius: '20px',
            margin: theme => theme.spacing(8, 0, 8, 8),
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                padding: '1rem',
                margin: 'auto',
                overflowY: 'auto',
                backgroundColor: 'rgba(255,255,255,.3)',
                borderRadius: '1rem'
              }}
            >
              <Image src={vendorLogo} alt='claros-logo' width={500} height={400} />
            </div>
          </div>
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }} color='white'>
                {`Welcome to Vendor Portal 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'white' }}>Please sign-in to your account</Typography>
            </Box>
            <form autoComplete='off' onSubmit={onSubmit}>
              <Box sx={{ mb: 4 }}>
                <BootstrapInput
                  size='small'
                  fullWidth
                  autoFocus
                  required
                  label='Username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder='Enter Username'
                />
              </Box>
              <Box sx={{ mb: 4 }}>
                <BootstrapInput
                  size='small'
                  fullWidth
                  value={password}
                  label='Password'
                  placeholder='Enter Password'
                  onChange={e => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                />
              </Box>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                sx={{
                  mb: 4,
                  '&.Mui-disabled': {
                    backgroundColor: '#7367F0',
                    boxShadow: '0px 2px 6px 0px rgba(47, 43, 61, 0.14)',
                    color: '#fff'
                  }
                }}
                disabled={isLoading || userDataIsLoading}
              >
                {isLoading || userDataIsLoading ? 'Loading...' : 'Login'}
              </Button>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
