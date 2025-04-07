import { render, screen } from "@testing-library/react/pure";
import { FabDelete } from "../../../calendar/components/FabDelete";
import { Provider } from "react-redux";
import { store } from "../../store";

describe('Pruebas en <FabDelete />', () => { 
    
    test('debe de mostrar el componente correctamente', () => { 
        
        render( 
            <Provider store={ store }>
                <FabDelete />
            </Provider>
        );

        screen.debug();

     });


 });