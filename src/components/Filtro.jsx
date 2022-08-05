import React from 'react'

const Filtro = ({ filtro, setFiltro }) => {
  return (
    <div className='filtros sombra contenedor'>
			<form action="">
				<div className="campo">
					<label htmlFor="">Filtrar gastos</label>
					<select 
						value={filtro}
						onChange={(e) => setFiltro(e.target.value)}
					>
						<option value="">-- Todos los gastos --</option>
						<option value="ahorro">Ahorro</option>
						<option value="comida">Comida</option>
						<option value="casa">Casa</option>
						<option value="gastos">Gastos varios</option>
						<option value="ocio">Ocio</option>
						<option value="salud">Salud</option>
						<option value="suscripciones">Subscripciones</option>
					</select>
				</div>
			</form>
		</div>
  )
}

export default Filtro