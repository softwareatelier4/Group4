'use strict'

const Lucid = use('Lucid')
const Profile = use('App/Model/Profile')
class Review extends Lucid {

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('afterCreate', function * (next) {
      const sum_overall_reviews = yield Review.query()
            .where('profile_id', this.profile_id)
            .sum('vote_overall as sum')

      const count_overall_reviews = yield Review.query()
            .where('profile_id', this.profile_id)
            .count('id as count')

      const overall_rating = sum_overall_reviews[0].sum / count_overall_reviews[0].count

      let profile = yield Profile.findBy('id', this.profile_id)
      profile.overall_rating = Math.round(overall_rating)

      yield profile.save()

      yield next
    })
  }
  profile () {
    return this.belongsTo('App/Model/Profile')
  }

  answer () {
    return this.hasOne('App/Model/Answer')
  }

  user () {
    return this.belongsTo('App/Model/UserAccount')
  }
}

module.exports = Review
