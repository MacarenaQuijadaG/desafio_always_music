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
async function editar(params) { 
    const [nombre, rut, curso, nivel] = params; 
    try { 
      const res = await pool.query('UPDATE registro_actual SET nombre = $1, rut = $2, curso = $3, nivel = $4 ', [nombre, rut, curso, nivel]); 
      console.log(`Se actualizó el registro con ID ${rut} en la tabla 'registro_actual'`);
    } catch (error) {
      console.error('Error al editar el registro en la tabla:', error.message);
    } finally {
        await pool.end();
    }
}
// Función para eliminar

async function eliminar() {
    try {
        const res = await pool.query('DELETE FROM registro_actual RETURNING *');

        console.log(`Se eliminaron ${res.rowCount} registros de la tabla 'registro_actual'`);
    } catch (error) {
        console.error('Error al eliminar registros de la tabla:', error.message);
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
// node index.js nuevo 'Juan Pérez' '12345678-9' 'Piano' '90'
// node index.js consulta
// node index.js consultarPorRut '12345678-9'


// Estos faltan por hacer.
// node index.js editar 'Juan Pérez' '12345678-9' 'Guitarra' '85'
// node index.js eliminar '12345678-9'

// En win es con "" y en linux con ''