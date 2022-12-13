const knex = require('knex');

class Container {
    constructor(config, tableName) {
        this.tableName = tableName;
        this.knex = knex(config);
    }
    save = obj => {
        this.knex(this.tableName).insert(obj)
            .then(() => console.log('Saved'))
            .catch(err => { console.log(err); throw err })
    }
    getById = async id => {
        try {
            let obj = await this.knex.from(this.tableName).select().table(this.tableName).where('id', id).first();
            if (obj) {
                return obj;
            } else {
                return { message: 'ERROR' };
            }
        } catch (err) {
            return { message: 'ERROR' };
        }
    }
    getAll = async () => {
        try {
            let objs = await this.knex.from(this.tableName).select('*');
            return objs;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    deleteById = async id => {
        try {
            this.knex.from(this.tableName).where('id', '=', id).del()
            return { message: 'DONE!' };
        } catch (err) {
            return { message: 'ERROR' };
        }
    }
    deleteAll = async () => {
        try {
            this.knex.from(this.tableName).del()
            return { message: 'DONE!' }
        } catch (err) {
            return { message: 'ERROR' };
        }
    }
    update = async obj => {
        try {
            this.knex.from(this.tableName).update(obj).update()
            return { message: 'DONE!' };
        } catch (err) {
            return { message: 'ERROR' };
        }
    }
}

module.exports = Container;