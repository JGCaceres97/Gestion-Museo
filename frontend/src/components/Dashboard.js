// @ts-check
import {
  faBook,
  faCalendarAlt,
  faChartLine,
  faChartPie,
  faClock,
  faFeatherAlt,
  faFlag,
  faGlobe,
  faGlobeAmericas,
  faHome,
  faNewspaper,
  faSave,
  faTags,
  faUsers,
  faUserTag
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { address, port } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';
import Autores from './Autores';
import Backups from './Backups';
import Biblioteca from './Biblioteca';
import Bitacora from './Bitacora';
import Calendario from './Calendario';
import Deptos from './Deptos';
import Estados from './Estados';
import Etiquetas from './Etiquetas';
import Horarios from './Horarios';
import Inicio from './Inicio';
import Municipios from './Municipios';
import ReporteVisitas from './ReporteVisitas';
import Roles from './Roles';
import Usuarios from './Usuarios';

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
    width: theme.spacing(
      8.5
    ) /* ,
    '&:hover': {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    } */
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
  },
  rightSpace: {
    marginRight: theme.spacing(2)
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
  const [loggedOut, setLoggedOut] = useState(false);
  const [Token] = useLocalStorage('Token', '');
  const [Usuario] = useLocalStorage('Usuario', '');

  useEffect(() => {
    document.title = 'Sistema de Gestión';
  });

  /**
   * Método para manejar el clic en un elemento de la lista.
   * @param {string} index Índice que identifica el elemento en la lista.
   */
  const handleListClick = index => {
    setSelectedIndex(index);
  };

  /**
   * Método para mostrar el contenido de la opción seleccionada en el menú.
   */
  const showSelected = () => {
    switch (selectedIndex) {
      case 'Calendario':
        return <Calendario />;
      case 'Biblioteca':
        return <Biblioteca />;
      case 'Autores':
        return <Autores />;
      case 'Estados':
        return <Estados />;
      case 'Etiquetas':
        return <Etiquetas />;
      case 'Deptos':
        return <Deptos />;
      case 'Horarios':
        return <Horarios />;
      case 'Municipios':
        return <Municipios />;
      case 'Roles':
        return <Roles />;
      case 'Usuarios':
        return <Usuarios />;
      case 'Visitas':
        return <ReporteVisitas />;
      case 'Prestamo':
        return 'Prestamo';
      case 'Bitacora':
        return <Bitacora />;
      case 'Backup':
        return <Backups />;
      default:
        return <Inicio />;
    }
  };

  /**
   * Método para cerrar la sesión del usuario.
   */
  const logout = async () => {
    try {
      await axios.get(`http://${address}:${port}/api/signOut`, {
        headers: {
          Authorization: Token
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.clear();
      setLoggedOut(true);
    }
  };

  if (loggedOut) return <Redirect push to='/login' />;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
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
            <Typography noWrap variant='h6' className={classes.title}>
              Centros Culturales
            </Typography>
            <Typography variant='body1' className={classes.rightSpace}>
              Bienvenido (a): {Usuario}
            </Typography>
            <Button color='inherit' onClick={logout}>
              Cerrar Sesión
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen
            })
          }}
          open={drawerOpen}
        >
          <div className={classes.toolbar} />
          <List className={classes.list} subheader={<li />}>
            <Tooltip
              title='Inicio'
              placement='right'
              disableHoverListener={drawerOpen}
              disableFocusListener={drawerOpen}
              disableTouchListener={drawerOpen}
            >
              <ListItem
                button
                selected={selectedIndex === 'Inicio'}
                onClick={() => handleListClick('Inicio')}
              >
                <ListItemIcon>
                  <FAI icon={faHome} className={classes.icon} style={{ marginLeft: '-3px' }} />
                </ListItemIcon>
                <ListItemText primary='Inicio' />
              </ListItem>
            </Tooltip>
            <Tooltip
              title='Calendario'
              placement='right'
              disableHoverListener={drawerOpen}
              disableFocusListener={drawerOpen}
              disableTouchListener={drawerOpen}
            >
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
            </Tooltip>
            <Tooltip
              title='Biblioteca'
              placement='right'
              disableHoverListener={drawerOpen}
              disableFocusListener={drawerOpen}
              disableTouchListener={drawerOpen}
            >
              <ListItem
                button
                selected={selectedIndex === 'Biblioteca'}
                onClick={() => handleListClick('Biblioteca')}
              >
                <ListItemIcon>
                  <FAI icon={faBook} className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary='Biblioteca' />
              </ListItem>
            </Tooltip>
            <Divider />
            <li className={classes.li}>
              <ul className={classes.ul}>
                <ListSubheader
                  className={clsx({
                    [classes.hide]: !drawerOpen
                  })}
                >
                  Mantenimiento
                </ListSubheader>
                <Tooltip
                  title='Mantenimiento de Autores'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    selected={selectedIndex === 'Autores'}
                    onClick={() => handleListClick('Autores')}
                  >
                    <ListItemIcon>
                      <FAI icon={faFeatherAlt} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Autores' />
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title='Mantenimiento de Estados'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
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
                </Tooltip>
                <Tooltip
                  title='Mantenimiento de Etiquetas'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    selected={selectedIndex === 'Etiquetas'}
                    onClick={() => handleListClick('Etiquetas')}
                  >
                    <ListItemIcon>
                      <FAI icon={faTags} className={classes.icon} style={{ marginLeft: '-1px' }} />
                    </ListItemIcon>
                    <ListItemText primary='Etiquetas' />
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title='Mantenimiento de Departamentos'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
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
                </Tooltip>
                <Tooltip
                  title='Mantenimiento de Horarios'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
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
                </Tooltip>
                <Tooltip
                  title='Mantenimiento de Municipios'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
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
                </Tooltip>
                <Tooltip
                  title='Mantenimiento de Roles'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
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
                </Tooltip>
                <Tooltip
                  title='Mantenimiento de Usuarios'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    selected={selectedIndex === 'Usuarios'}
                    onClick={() => handleListClick('Usuarios')}
                  >
                    <ListItemIcon>
                      <FAI icon={faUsers} className={classes.icon} style={{ marginLeft: '-2px' }} />
                    </ListItemIcon>
                    <ListItemText primary='Usuarios' />
                  </ListItem>
                </Tooltip>
              </ul>
            </li>
            <Divider />
            <li className={classes.li}>
              <ul className={classes.ul}>
                <ListSubheader
                  className={clsx({
                    [classes.hide]: !drawerOpen
                  })}
                >
                  Reportería
                </ListSubheader>
                <Tooltip
                  title='Reporte de Visitas'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
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
                </Tooltip>
                <Tooltip
                  title='Reporte de Préstamo de Libros'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    selected={selectedIndex === 'Prestamo'}
                    onClick={() => handleListClick('Prestamo')}
                  >
                    <ListItemIcon>
                      <FAI icon={faChartPie} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Préstamo de Libros' />
                  </ListItem>
                </Tooltip>
              </ul>
            </li>
            <Divider />
            <li className={classes.li}>
              <ul className={classes.ul}>
                <ListSubheader
                  className={clsx({
                    [classes.hide]: !drawerOpen
                  })}
                >
                  Administración
                </ListSubheader>
                <Tooltip
                  title='Administración de Copias de Seguridad'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    selected={selectedIndex === 'Backup'}
                    onClick={() => handleListClick('Backup')}
                  >
                    <ListItemIcon>
                      <FAI icon={faSave} className={classes.icon} style={{ marginLeft: '2px' }} />
                    </ListItemIcon>
                    <ListItemText primary='Copias de Seguridad' />
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title='Administración de Bitácora de Eventos'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    selected={selectedIndex === 'Bitacora'}
                    onClick={() => handleListClick('Bitacora')}
                  >
                    <ListItemIcon>
                      <FAI icon={faNewspaper} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Bitácora de Eventos' />
                  </ListItem>
                </Tooltip>
              </ul>
            </li>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.contentSpace}>{showSelected()}</div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
