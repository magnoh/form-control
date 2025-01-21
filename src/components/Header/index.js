import './Header.css'
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom'
import 'primeicons/primeicons.css';

export default function Header() {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/'),
            className: "hover:bg-red"
        },
        {
            label: 'Tabela Relatorio',
            icon: 'pi pi-server',
            command: () => navigate('/relatorio'),
        }
    ]
    const start = <img alt="logo" src=".\images\logo-maisvalor.svg"  className="md:w-18 h-20 w-12 "></img>;

    return (
        <section className='section-header' >
            <div className='header w-full'>
                <Menubar 
                    className='menubar-custom w-full flex border-none bg-[#1a1a1e] h-[50px] text-lg z-10 m-2 sm:text-left hover:after:bg-red-900 '
                    model={items}
                    start={start}
                />
            </div>
        </section>
    );
};