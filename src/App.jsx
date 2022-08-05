import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filtro from './components/Filtro'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])
  const [editarGastos, setEditarGastos] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //LOCALSTORAGE 
  //Presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  },[])
  // Gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  const handleNuevoGasto = () => { //cuando hagamos click en el botón de agregar nuevo gasto que despliega el modal
    console.log(presupuesto);
    setEditarGastos({})
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }
  const guardarGasto = (gasto) => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      //gasto es el objeto actualizado, gastoState serían los otros gastos que evidentemente, no queremos perderlos.
      setGastos(gastosActualizados)
      setEditarGastos({})
    }
    else{
      gasto.id = nanoid()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)  
    setTimeout(() => {
      setModal(!modal)  
    }, 500);
   
  }
  const eliminarGasto = (id) => {
    const gastoActualizado = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastoActualizado)
  }

  useEffect(() => {
    if (Object.keys(editarGastos).length > 0){
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  },[editarGastos])

  //useEffect para el filtro de categorías
  useEffect(() => {
    if(filtro){
      //Filtrar gastos
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro) ;
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />
      {
        isValidPresupuesto && (
          <>
            <main>
              <Filtro 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                gastos={gastos}
                setEditarGastos={setEditarGastos}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto} 
                alt="icono nuevo gasto" 
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )
      }
      {modal && (
        <Modal 
          modal={modal}
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGastos={editarGastos}
          setEditarGastos={setEditarGastos}
        />
      )}
      
      
    </div>
  
  )
}

export default App
