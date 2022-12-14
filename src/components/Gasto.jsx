import React from 'react'
import {LeadingActions, SwipeAction, SwipeableList, SwipeableListItem, TrailingActions} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatearFecha } from '../helpers'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoCasa from '../img/icono_casa.svg'

//Creando un diccionario que asocia el icono a su categoría

const diccionarioIconos = {

    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}


const Gasto = ({ gasto, setEditarGastos, eliminarGasto }) => {
    const leadingActions = () => ( //estos paréntesis tienen el return implícito
        <LeadingActions>
          <SwipeAction onClick={() => setEditarGastos(gasto)}>
            Editar
          </SwipeAction>
        </LeadingActions>
      );
      
      const trailingActions = () => (
        <TrailingActions>
          <SwipeAction
            onClick={() => eliminarGasto(gasto.id)}
            destructive={true}
          >
            Eliminar
          </SwipeAction>
        </TrailingActions>
      );
  return (
    <SwipeableList>
        <SwipeableListItem 
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className='gasto sombra'>
                <div className="contenido-gasto">
                    <img 
                        src={diccionarioIconos[gasto.categoria]} 
                        alt="img categoria" />
                    <div className="descripcion-gasto">
                        <p className="categoria">{gasto.categoria}</p>
                        <p className="nombre-gasto">{gasto.nombre}</p>
                        <p className='fecha-gasto'>Agregado el: <span>{formatearFecha(gasto.fecha)}</span></p>
                    </div>
                </div>
                <p className='cantidad-gasto'>{gasto.cantidad}€</p>
            </div>
        </SwipeableListItem> 

    </SwipeableList>
  )
}

export default Gasto