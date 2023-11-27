import { useState, useEffect } from 'react'
import './App.css'

/* 
const datosIniciales = [
  {id: 1, nombre: 'Aprender React', completada: false},
  {id: 2, nombre: 'Rendir examen React', completada: false},
  {id: 3, nombre: 'Aprobar examen React', completada: false}
]
*/
const datosIniciales = [
]

function App() {
  const [nextId, setNextId] = useState(1)
  const [tareas, setTareas] = useState(datosIniciales)

  function agregar(nombre) {
    const nueva = {id: nextId, nombre: nombre, completada: false}
    const copia = [ ... tareas, nueva]
    
    setTareas(copia)
    setNextId(nextId+1)
  }

  function completar(id) {
    const actual = tareas.find(tarea => tarea.id == id)
    const nuevo = {... actual, completada: true }
    const copia = tareas.map(tarea => tarea.id == id ? nuevo: tarea)
    setTareas(copia)
  }

  function borrar(id) {
    const copia = tareas.filter(tarea => tarea.id != id)
    setTareas(copia)
  }

  function clearAll(){
    setTareas([])
  }

  useEffect(() => {
    const prox = Number(localStorage.getItem('nextid'))
    const datos = localStorage.getItem('tareas')
    if (datos) {
      setTareas(JSON.parse(datos))
      setNextId(prox)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('nextid',nextId)
    localStorage.setItem('tareas', JSON.stringify(tareas))
    console.log('Tareas actualizadas', tareas)
  })

  useEffect(()=>{
    localStorage.setItem('nextid',nextId)
    console.log('Proximo ID actualizado',nextId)
  }, [nextId])

  return (
    <>
      <main>
        <h1>Lista de Tareas</h1>
        <TaskForm alAgregar={agregar} />
        <button onClick={()=>clearAll()}>Borrar todo</button>
        <TaskList tareas={tareas} alCompletar={completar} alBorrar={borrar} />
      </main>
    </>
  )
}

function TaskForm({alAgregar}) {
  const [nombre, setNombre] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()

    if (nombre == '') return
    alAgregar(nombre)
    setNombre('')
  }

  return (
    <form onSubmit={manejarEnvio}>
      <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button type='submit'>Agregar</button>
    </form>
  )
}

function TaskList({tareas, alCompletar, alBorrar}) {
  return (
    <ul>
      {tareas.map(tarea => <TaskItem key={tarea.id} tarea={tarea} alCompletar={alCompletar} alBorrar={alBorrar} />)}
    </ul>
  )
}

function TaskItem({tarea, alCompletar, alBorrar}) {
  const {id,nombre,completada} = tarea

  function completar() {
    console.log('completar' + id)
    alCompletar(id)
  }

  function borrar() {
    console.log('borrar ' + id)
    alBorrar(id)
  }

  return (
    <li>
      <span style={{textDecoration:completada ? "line-through": ""}}>{nombre}</span>
      <div className='botones'>
        <button onClick={completar}>Completar</button>
        <button onClick={borrar}>Borrar</button>
      </div>
    </li>
  )
}

export default App
