import { useState, useEffect } from 'react'
import IconoClose from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({ modal, setModal, animarModal, setAnimarModal, guardarGasto, editarGastos, setEditarGastos }) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('')

  useEffect(()=> {
    if (Object.keys(editarGastos).length > 0){
        setNombre(editarGastos.nombre)
        setCantidad(editarGastos.cantidad)
        setCategoria(editarGastos.categoria)
        setId(editarGastos.id)
        setFecha(editarGastos.fecha)
       
    }
  },[])
  const handleCerrarModal = () =>{

    setAnimarModal(false)
    setEditarGastos({})
    setTimeout(() => {
        setModal(!modal)  
    }, 500);
    
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if ([ nombre, cantidad, categoria ].includes('')){
        setMensaje('Todos los campos son obligatorios')
        setTimeout(() => {
            setMensaje('')
        }, 3000);
    }
    else{
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }
  }
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={IconoClose} 
            alt="cerrar modal" 
            onClick={handleCerrarModal}
        />
        </div>
      

        <form 
            className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
            onSubmit={handleSubmit}>
            <legend>{Object.keys(editarGastos).length > 0 ? 'Editar Gastos' : 'Nuevo Gasto'}</legend>

            {mensaje && (
                <Mensaje tipo={"error"}>{mensaje}</Mensaje>
            )}
            <div className="campo">
                <label htmlFor="nombre">Nombre del gasto</label>
                <input 
                    type="text" 
                    placeholder='Agrega el nombre del gasto'
                    id='nombre'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}

                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad del gasto</label>
                <input 
                    type="number" 
                    placeholder='Agrega la cantidad del gasto'
                    id='cantidad'
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Catagoría</label>
                <select 
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Subscripciones</option>
                </select>
            </div>
          
            <input type="submit" value={Object.keys(editarGastos).length > 0 ? 'Guardar cambios' : 'Añadir Gasto'} /> 
        </form>

      
    </div>
  )
}

export default Modal