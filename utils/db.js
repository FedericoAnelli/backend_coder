var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'coderhouse',
      database: 'coderhouse'
    },
    pool: { min: 0, max: 7 }
  })

  class DB {
    constructor() {
      this.knex = knex
    }

    async createTable(table) {
        try {
            await this.knex.schema.createTable(table, (table) => {
                table.increments('id').primary()
                table.string('title')
                table.string('price')
                table.string('thumbnail')
            })
            console.log(`Tabla ${table} creada`)
        } catch (error) {
            console.log(error)
        }
    }

    async tableExists(table) {
        try {
            const exists = await this.knex.schema.hasTable(table)
            return exists
        } catch (error) {
            console.log(error)
        }
    }

    async get(table, id) {
        let result = await this.knex(table).where({ id: id }).select('*')
        return result[0]
        }

    async getAll(table) {
        let result = await this.knex(table).select('*')
        result = JSON.stringify(result, null, 2)
        console.log(result)
        return result

    }

    async insert(table, data) {
        try {
            await this.knex(table).insert(data)
            console.log(`Registro insertado en ${table}`)
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = DB