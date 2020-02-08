// @ts-check
import {
  faBook,
  faCalendarAlt,
  faChartArea,
  faChartBar,
  faChartLine,
  faChartPie,
  faClock,
  faFeatherAlt,
  faFlag,
  faGlobe,
  faGlobeAmericas,
  faHome,
  faNewspaper,
  faQuestionCircle,
  faSave,
  // faTags,
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
// import Etiquetas from './Etiquetas';
import Horarios from './Horarios';
import Inicio from './Inicio';
import Manual from './Manual';
import Municipios from './Municipios';
import ReporteVisitas from './ReporteVisitas';
import Roles from './Roles';
import Usuarios from './Usuarios';
import { ReporteCharlas, ReporteHorarios, ReporteTemas } from './Charts';

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
  },
  listIcon: {
    minWidth: theme.spacing(5.5)
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
  const [Permisos] = useLocalStorage('Permisos', '');

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
      /* case 'Etiquetas':
        return <Etiquetas />; */
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
      case 'RepCharlas':
        return <ReporteCharlas />;
      case 'RepHorarios':
        return <ReporteHorarios />;
      case 'RepTemas':
        return <ReporteTemas />;
      case 'Bitacora':
        return <Bitacora />;
      case 'Backup':
        return <Backups />;
      case 'Ayuda':
        return <Manual />;
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
              edge='start'
              color='inherit'
              aria-label='open drawer'
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
                <ListItemIcon classes={{ root: classes.listIcon }}>
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
                <ListItemIcon classes={{ root: classes.listIcon }}>
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
                <ListItemIcon classes={{ root: classes.listIcon }}>
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
                    <ListItemIcon classes={{ root: classes.listIcon }}>
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
                    <ListItemIcon classes={{ root: classes.listIcon }}>
                      <FAI icon={faFlag} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Estados' />
                  </ListItem>
                </Tooltip>
                {/* <Tooltip
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
                    <ListItemIcon classes={{ root: classes.listIcon }}>
                      <FAI icon={faTags} className={classes.icon} style={{ marginLeft: '-1px' }} />
                    </ListItemIcon>
                    <ListItemText primary='Etiquetas' />
                  </ListItem>
                </Tooltip> */}
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
                    <ListItemIcon classes={{ root: classes.listIcon }}>
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
                    <ListItemIcon classes={{ root: classes.listIcon }}>
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
                    <ListItemIcon classes={{ root: classes.listIcon }}>
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
                    disabled={!Permisos.Usuarios}
                    selected={selectedIndex === 'Roles'}
                    onClick={() => handleListClick('Roles')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
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
                    disabled={!Permisos.Usuarios}
                    selected={selectedIndex === 'Usuarios'}
                    onClick={() => handleListClick('Usuarios')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
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
                    disabled={!Permisos.Reporteria}
                    selected={selectedIndex === 'Visitas'}
                    onClick={() => handleListClick('Visitas')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
                      <FAI icon={faChartLine} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Visitas' />
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title='Reporte de Charlas Académicas'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    disabled={!Permisos.Reporteria}
                    selected={selectedIndex === 'RepCharlas'}
                    onClick={() => handleListClick('RepCharlas')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
                      <FAI icon={faChartPie} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Charla Académica' />
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title='Reporte de Horarios Frecuentes'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    disabled={!Permisos.Reporteria}
                    selected={selectedIndex === 'RepHorarios'}
                    onClick={() => handleListClick('RepHorarios')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
                      <FAI icon={faChartBar} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Horarios Frecuentes' />
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title='Reporte de Temás Más Solicitados'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    disabled={!Permisos.Reporteria}
                    selected={selectedIndex === 'RepTemas'}
                    onClick={() => handleListClick('RepTemas')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
                      <FAI icon={faChartArea} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Temas Solicitados' />
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
                    disabled={!Permisos.Backup}
                    selected={selectedIndex === 'Backup'}
                    onClick={() => handleListClick('Backup')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
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
                    disabled={!Permisos.Bitacora}
                    selected={selectedIndex === 'Bitacora'}
                    onClick={() => handleListClick('Bitacora')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
                      <FAI icon={faNewspaper} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary='Bitácora de Eventos' />
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
                  Ayuda
                </ListSubheader>
                <Tooltip
                  title='Manual de Usuario'
                  placement='right'
                  disableHoverListener={drawerOpen}
                  disableFocusListener={drawerOpen}
                  disableTouchListener={drawerOpen}
                >
                  <ListItem
                    button
                    selected={selectedIndex === 'Ayuda'}
                    onClick={() => handleListClick('Ayuda')}
                  >
                    <ListItemIcon classes={{ root: classes.listIcon }}>
                      <FAI
                        icon={faQuestionCircle}
                        className={classes.icon}
                        style={{ marginLeft: '2px' }}
                      />
                    </ListItemIcon>
                    <ListItemText primary='Manual de Usuario' />
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
