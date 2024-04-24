const pool = require('./config');

const args = process.argv.slice(2);

const comando = args[0];
const params = args.slice(1)

// Función para agregar un nuevo estudiante
async function nuevo(params) {
    
    const [nombre, rut, curso, nivel] = params;
    try {
        const res = await pool.query('INSERT INTO registro_actual (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)', [nombre, rut, curso, nivel]);
        console.log(`Estudiante ${nombre} agregado`);
    } catch (err) {
        console.error('Error al intentar agregar un nuevo estudiante:', err.message);
        
    }finally {
        await pool.end();
    }
}

// Función para consultar todos los estudiantes
async function consulta() {
    try {
        const res = await pool.query('SELECT * FROM registro_actual');
        console.log(res.rows);
    } catch (err) {
        console.error(err.message);
    }finally {
        await pool.end();
    }
}

// Función para consultar por RUT
async function consultarPorRut(params) {
    try {
        const res = await pool.query('SELECT * FROM registro_actual WHERE rut = $1', [params[1]]);
        console.log(res.rows);
    } catch (err) {
        console.error(err.message);
    }finally {
        await pool.end();
    }
}

// Función para editar los datos

async function editar() { // falta parametros que se editaran
    try { 
      const res = await pool.query('UPDATE estudiantes SET columna = $1 WHERE id = $2', []); //falta parametros que se editaran
      console.log(`Se actualizaron ${res.rowCount} registros en la tabla 'estudiantes'`);
    } catch (error) {
      console.error('Error al editar el registro en la tabla estudiantes:', error.message);
    } finally {
      await pool.end();
    }
  }

// Función para eliminar

async function eliminar() {
    try {
      const res = await pool.query('DELETE FROM estudiantes RETURNING *');
  
      // 
      console.log(`Se elimino ${res.rowCount} de la tabla 'estudiantes'`);
    } catch (error) {
      console.error('Error al eliminar estudiante:', error.message);
    } finally {
      
      await pool.end();
    }
  }

// Manejo de comandos
switch(comando) {
    case 'nuevo':
        nuevo(params);
        break;
    case 'consulta':
        consulta();
        break;
    case 'rut':
        consultarPorRut(params);
        break;
    case 'editar':
        editar(params);
        break;
    case 'eliminar':
        eliminar(params);
        break;
    default:
        console.log('Comando no reconocido');
}

// Te dejo los comandos que yo utilice para probar los eventos que hice.
// node index.js nuevo 'Juan Pérez' '12345678-9' 'Piano' 'Avanzado'
// node index.js consulta
// node index.js consultarPorRut '12345678-9'


// Estos faltan por hacer.
// node index.js editar 'Juan Pérez' '12345678-9' 'Guitarra' 'Intermedio'
// node index.js eliminar '12345678-9'

// En win es con "" y en linux con ''