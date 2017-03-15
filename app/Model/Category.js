'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
  profiles () {
    return this.belongsToMany('App/Model/Profile', 'profile_category')
  }
}

module.exports = Category
