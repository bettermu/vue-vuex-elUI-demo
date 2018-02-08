const MongoClient = require('mongodb').MongoClient

// let url = 'mongodb://localhost:27017/test'

// MongoClient.connect(url, (err, db) => {
//   console.log(db)
// })

class DB {
  /**
   * Creates an instance of DB.
   * 构造函数
   * @param {any:数据库地址} url
   * @param {any:数据集也就是表的名字} collectionsName
   * @memberof DB
   */
  constructor (url, collectionsName) {
    this.url = url
    this.collectionsName = collectionsName
  }
  /**
   * 连接数据库
   *
   * @memberof DB
   */
  _connect () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, db) => {
        if (err) {
          return reject(err)
        } else {
          resolve(db)
        }
      })
    })
  }
  /**
   * 插入数据库
   * @param {arr||obj} docs
   * @param {boolean} insertMany
   * @memberof DB
   */
  insert (docs, insertMany) {
    return new Promise((resolve, reject) => {
      // 先连接数据库
      this._connect().then(db => {
        // 如果是插入多条arr
        if (insertMany) {
          // 将数据插入到集
          db.collection(this.collectionsName).insertMany(docs).then(res => {
            resolve(res)
            db.close()
          })
        } else {
          // 插入一条数据obj
          db.collection(this.collectionsName).insertOne(docs).then(res => {
            resolve(res)
            db.close()
          })
        }
      })
    })
  }
  /**
   * 数据库查询
   *
   * @param {any} doc
   * @param {obj} pageConfig
   * @returns
   * @memberof DB
   */
  query (doc, pageConfig) {
    // 让doc等于doc或者空对象
    doc = doc || {}
    // pageConfig一般用于控制分页
    pageConfig = pageConfig || {limit: 0, skip: 0}
    // 将查询结果放入这个数组中
    let resData = []
    return new Promise((resolve, reject) => {
      // 连接数据库
      this._connect().then(db => {
        // 将查询结果放入游标cursor
        let cursor = db.collection(this.collectionsName).find(doc).limit(pageConfig.limit).skip(pageConfig.skip * pageConfig.limit)
        // 遍历游标cursor
        cursor.each((err, data) => {
          // 如果错误就直接返回错误
          if (err) {
            return reject(err)
            // 如果数据不为空，则把查询到的数据注入resData
          } else if (data != null) {
            resData.push(data)
            // 查询完吼返回resData,关闭数据库
          } else {
            resolve(resData)
            db.close()
          }
        })
      })
    })
  }
  /**
   * 数据库删除数据
   *
   * @param {object} query
   * @param {boolean} deleteMany
   * @memberof DB
   */
  delete (query, deleteMany) {
    return new Promise((resolve, reject) => {
      this._connect().then(db => {
        if (deleteMany) {
          db.collection(this.collectionsName).deleteMany(query).then(res => {
            resolve(res)
            db.close()
          })
        } else {
          db.collection(this.collectionsName).deleteOne(query).then(res => {
            resolve(res)
            db.close()
          })
        }
      })
    })
  }
  /**
   * 数据库修改数据
   *
   * @param {obj} filter
   * @param {obj} updater
   * @memberof DB
   */
  update (filter, updater) {
    return new Promise((resolve, reject) => {
      let updaterLy = {$set: updater}
      this._connect().then(db => {
        db.collection(this.collectionsName).updateMany(filter, updaterLy).then(res => {
          resolve(res)
          db.close()
        })
      })
    })
  }
}
module.exports = DB
let mondb = new DB('mongodb://localhost:27017/test', 'user')

// 测试连接数据库
// mondb._connect().then(db => {
//   console.log(db)
// })

// 测试插入数据
// 插入多条
// const arr = []
// for (let i = 0; i < 10; i++) {
//   arr.push({
//     username: 'ly_' + i,
//     age: i + 20,
//     hign: 170 + i
//   })
// }
// mondb.insert(arr, true).then(res => {
//   console.log(res)
// })
// 插入一条
// mondb.insert({username: 'lytton', age: 30, hign: 172}).then(res => {
//   console.log(res)
// })
// 测试查询数据库
// 查询所有数据
// mondb.query().then(res => {
//   console.log(JSON.stringify(res))
// })
// 条件查询
// mondb.query({username: 'lytton'}).then(res => {
//   console.log(JSON.stringify(res))
// })
// 分页查询,查出5条数据，跳过前2*5=10条
// mondb.query({}, {limit: 5, skip: 2}).then(res => {
//   console.log(JSON.stringify(res))
// })

// 测试删除数据
// mondb.delete({age: 23}, true).then(res => {
//   console.log(JSON.stringify(res))
// })
// 删除一条
// mondb.delete({age: 24}).then(res => {
//   console.log(res)
// })

// 测试修改数据
mondb.update({username: 'lytton'}, {unlike: 17}).then(res => {
  console.log(JSON.parse(res))
})
