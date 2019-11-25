// @ts-check
import { faCalendarAlt, faChartLine, faClock, faFlag, faGlobe, faGlobeAmericas, faHome, faTags, faUserCircle, faUsers, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Calendario from './Calendario';
import Inicio from './Inicio';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: 24
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(6.75),
    '&:hover': {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'inherit'
  },
  icon: {
    fontSize: 20
  },
  userIcon: {
    fontSize: 25
  },
  li: {
    backgroundColor: 'inherit'
  },
  ul: {
    padding: 0,
    backgroundColor: 'inherit'
  },
  content: {
    flexGrow: 1,
    height: '100vh'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  hide: {
    display: 'none'
  },
  appToolbar: {
    [theme.breakpoints.only('lg')]: {
      paddingLeft: '16px',
      paddingRight: '16px'
    }
  },
  title: {
    flexGrow: 1
  },
  contentSpace: {
    height: '87%'
  }
}));

/**
 * Dashboard que concentra todas las opciones del sistema.
 */
function Dashboard() {
  // @ts-ignore
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState('Inicio');
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    document.title = 'Sistema de Gestión'
  });

  /**
   * Método para manejar el clic en un elemento de la lista.
   * @param {string} index Índice que identifica el elemento en la lista.
   */
  const handleListClick = index => {
    setSelectedIndex(index);
  }

  /**
   * Método para mostrar el contenido de la opción seleccionada en el menú.
   */
  const showSelected = () => {
    switch (selectedIndex) {
      case 'Calendario':
        return <Calendario />
      case 'Estados':
        return 'Estados'
      case 'Etiquetas':
        return 'Etiquetas'
      case 'Deptos':
        return 'Deptos'
      case 'Horarios':
        return 'Horarios'
      case 'Municipios':
        return 'Municipios'
      case 'Roles':
        return 'Roles'
      case 'Usuarios':
        return 'Usuarios'
      case 'Visitas':
        return 'Visitas'
      default:
        return <Inicio />
    }
  }

  /**
   * Método para cerrar la sesión del usuario.
   */
  const logout = () => {
    localStorage.clear();
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={classes.appBar}
        >
          <Toolbar className={classes.appToolbar}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              className={classes.menuButton}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              noWrap
              variant='h6'
              className={classes.title}
            >
              Sistema de Gestión
            </Typography>
            <div>
              <IconButton
                color='inherit'
                aria-haspopup='true'
                aria-controls='menu-appbar'
                aria-label='cuenta de usuario'
                onClick={e => setAnchorEl(e.currentTarget)}
              >
                <FAI icon={faUserCircle} className={classes.userIcon} />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                open={menuOpen}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => console.log('Perfil')}>Perfil</MenuItem>
                <Divider />
                <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
          open={drawerOpen}
        >
          <div className={classes.toolbar} />
          <List className={classes.list} subheader={<li />}>
            <ListItem
              button
              selected={selectedIndex === 'Inicio'}
              onClick={() => handleListClick('Inicio')}
            >
              <ListItemIcon>
                <FAI icon={faHome} className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary='Inicio' />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 'Calendario'}
              onClick={() => handleListClick('Calendario')}
            >
              <ListItemIcon>
                <FAI icon={faCalendarAlt} className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary='Calendario' />
            </ListItem>
            <Divider />
            <li className={classes.li}>
              <ul className={classes.ul}>
                <ListSubheader className={clsx({
                  [classes.hide]: !drawerOpen
                })}>
                  Mantenimiento
                </ListSubheader>
                <ListItem
                  button
                  selected={selectedIndex === 'Estados'}
                  onClick={() => handleListClick('Estados')}
                >
                  <ListItemIcon>
                    <FAI icon={faFlag} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary='Estados' />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 'Etiquetas'}
                  onClick={() => handleListClick('Etiquetas')}
                >
                  <ListItemIcon>
                    <FAI icon={faTags} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary='Etiquetas' />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 'Deptos'}
                  onClick={() => handleListClick('Deptos')}
                >
                  <ListItemIcon>
                    <FAI icon={faGlobeAmericas} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary='Departamentos' />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 'Horarios'}
                  onClick={() => handleListClick('Horarios')}
                >
                  <ListItemIcon>
                    <FAI icon={faClock} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary='Horarios' />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 'Municipios'}
                  onClick={() => handleListClick('Municipios')}
                >
                  <ListItemIcon>
                    <FAI icon={faGlobe} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary='Municipios' />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 'Roles'}
                  onClick={() => handleListClick('Roles')}
                >
                  <ListItemIcon>
                    <FAI icon={faUserTag} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary='Roles' />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 'Usuarios'}
                  onClick={() => handleListClick('Usuarios')}
                >
                  <ListItemIcon>
                    <FAI icon={faUsers} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary='Usuarios' />
                </ListItem>
              </ul>
            </li>
            <Divider />
            <li className={classes.li}>
              <ul className={classes.ul}>
                <ListSubheader className={clsx({
                  [classes.hide]: !drawerOpen
                })}>
                  Reportería
                </ListSubheader>
                <ListItem
                  button
                  selected={selectedIndex === 'Visitas'}
                  onClick={() => handleListClick('Visitas')}
                >
                  <ListItemIcon>
                    <FAI icon={faChartLine} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary='Visitas' />
                </ListItem>
              </ul>
            </li>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.contentSpace}>
            {showSelected()}
          </div>
        </main>
      </div>
    </React.Fragment >
  );
}

export default Dashboard;
