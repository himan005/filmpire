import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, Icon, collapseClasses } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7  } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';

import {Sidebar, Search} from '..';
import useStyles from './styles'
import { fetchAuthToken, moviesApi, createSessionId } from '../../utils';

const NavBar = () => {
    const {isAuthenticated, user} = useSelector(userSelector)
    const [mobileOpen, setMobileOpen] = useState(false)
    const classes = useStyles()
    const isMobile = useMediaQuery('(max-width:600px)')
    const theme = useTheme()
    const dispatch = useDispatch()
    const token = localStorage.getItem('request_token')
    const session_id = localStorage.getItem('session_id')

    useEffect(() =>{
        const logInUser = async () =>{
            if(token){
                console.log("useEffect token")
                if(session_id){
                    const {data: userData} = await moviesApi.get(`/account?session_id=${session_id}`)
                    dispatch(setUser(userData))
                } else {
                    const sessionId = await createSessionId()
                    const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`)
                    dispatch(setUser(userData))
                } 
            }
        }
        logInUser()
    }, [token])

  return (
    <>
    {/* NavBar */}
    <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}> 
            {
                isMobile && (
                <IconButton color="inherit" edge="start" style={{outline:'none'}} onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} className={classes.menuButton}><Menu /></IconButton>)
            }
            <IconButton color="inherit" sx={{ml:1}} onClick={() =>{}}>
                {theme.palette.mode ==='dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {!isMobile && <Search/>}
            <div>
                {!isAuthenticated ? 
                    (<Button color="inherit" onClick={fetchAuthToken} >Login &nbsp;<AccountCircle/></Button>) : 
                    (
                        <Button color="inherit" component={Link} to={`/profile/${user.id}`} className={classes.linkButton} onClick={() => {}}>
                            {!isMobile && <>My Movies &nbsp;</>}
                            <Avatar 
                                style={{width:30, height:30}} 
                                alt='profile'
                                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                            />
                        </Button>  
                    )
                }
            </div>
            {isMobile && <Search/>}
        </Toolbar>
    </AppBar>
    {/* SideBar */}
    <div>
        <nav className={classes.drawer}>
            {isMobile ? (
                <Drawer 
                    variant='temporary' 
                    anchor='right' 
                    open={mobileOpen}  
                    onClose= {() => setMobileOpen((prevMobileOpen) =>!prevMobileOpen)}
                    classes={{paper:classes.drawerPaper}} 
                    ModalProps={{keepMounted:true}}
                >
                    <Sidebar setMobileOpen={setMobileOpen}/>
                </Drawer>
            ):(
                <Drawer classes={{paper: classes.drawerPaper}} variant='permanent' open>
                       <Sidebar setMobileOpen={setMobileOpen}/>
                </Drawer>
            )}
        </nav>
    </div>
    </>
  )
}

export default NavBar