import React from "react"
import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"

function Header({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos }) {
  return (
    <div>

    <header>
        <h1>Planificador de Gastos</h1>
        {isValidPresupuesto ? (
            <>
                <ControlPresupuesto 
                    presupuesto={presupuesto}
                    gastos={gastos}
                    setGastos={setGastos}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            </>
        ) : (
            <NuevoPresupuesto 
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />   
            )
            
        }
        
    </header>
    </div>
  )
}

export default Header