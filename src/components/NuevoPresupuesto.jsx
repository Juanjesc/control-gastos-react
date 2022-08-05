
import React, { useState } from "react"
import Mensaje from './Mensaje'
const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    const [mensaje, setMensaje] = useState ('')
    const submitHandler = (e) => {
        e.preventDefault();
        if ((!presupuesto) || (presupuesto <= 0)){
            setMensaje('Presupuesto no válido')
        }
        else{
            console.log(presupuesto)
            setMensaje('')
            setIsValidPresupuesto(true)
        }
        
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form className="formulario" onSubmit={submitHandler}>
            <div className="campo">
                <label>Definir presupuesto</label>
                <input 
        
                    type="number" 
                    className="nuevo-presupuesto" 
                    placeholder="Añade tu presupuesto"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input 
                type="submit" 
                value="Añadir"  
            />
            {mensaje && 
                <Mensaje tipo={'error'}>{mensaje}</Mensaje>
            }
        </form>
    </div>
  )
}

export default NuevoPresupuesto