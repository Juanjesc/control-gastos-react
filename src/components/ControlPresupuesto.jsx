import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

	const [disponible, setDisponible] = useState(0)
	const [gastado, setGastado] = useState(0)
	const [porcentaje, setPorcentaje] = useState(0)



  useEffect(() => {
		const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
		const totalDisponible = presupuesto - totalGastado
		// calcular el porcentaje mostrado en la gráfica
		const nuevoPorcentaje = (((presupuesto - totalDisponible)/ presupuesto) * 100).toFixed(2)
		setGastado(totalGastado)
		setDisponible(totalDisponible)
		setTimeout(() => {
		setPorcentaje(nuevoPorcentaje)
		}, 1000);
		
	},[gastos])
  
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
  }
  const handleReset = () => {
    const resultado = confirm('¿Seguro que quieres reiniciar el presupuesto y gastos?')
    if (resultado){
      setGastos([])
      setPresupuesto('')
      setIsValidPresupuesto(false)
    }
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
							value={porcentaje}
							text={`${porcentaje}% Gastado`}
							styles={buildStyles({
								pathColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
								trailColor: "f5f5f5",
								textColor: porcentaje > 100 ? "#dc2626" : "#3b82f6"

							})}
						/>
        </div>
        <div className='contenido-presupuesto'>
            <button
              onClick={handleReset}
              className="reset-app"
              type='button'
            >
              Resetear App
            </button>
            <p> 
                <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearPresupuesto(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto