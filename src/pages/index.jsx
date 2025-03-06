import {ListaProductos} from '../components/product_list';

export function Index() {
    return (
        <div>
            <h1>Inicio</h1>
            <p>Bienvenido a la página de inicio.</p>
            <ListaProductos />
        </div>
    );
}