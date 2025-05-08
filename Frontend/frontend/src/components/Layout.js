import React from 'react';
import NavigationBar from './NavigationBar';
import './Layout.css';

function Layout({children}){
  return(
    <div className='app-layout'>
        <header className='layout-header'>
            <h1>Minimercado la 43</h1>
        </header>
        <NavigationBar/>
        <main className='layout-main'>
            <div className='container'>
                {children}
            </div>
        </main>
        <footer className='layout-footer'>
            <p>&copy; 2025 Minimercado la 43. todos los derechos reservados.</p>
        </footer>
    </div>
  );  
}

export default Layout;