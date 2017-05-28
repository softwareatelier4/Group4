'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Factory = use('Factory')
const Profile = use('App/Model/Profile')
const Review = use('App/Model/Review')
const Answer = use('App/Model/Answer')
const Category = use('App/Model/Category')
const ProfileCategory = use('App/Model/ProfileCategory')
const User = use('App/Model/UserAccount')

class DatabaseSeeder {

  * run () {
    yield User.create({
      id: 1,
      email: 'admin@jobadvisor.com',
      password: 'admin',
      name: 'admin',
      avatar: '1.jpg'
    })

    yield User.create({
      id: 2,
      email: 'worker@jobadvisor.com',
      password: 'worker',
      name: 'worker',
      avatar: '2.jpg'
    })

    yield User.create({
      id: 3,
      email: 'user@jobadvisor.com',
      password: 'user',
      name: 'user',
      avatar: '3.jpg'
    })

    yield Profile.create({
      id: 1,
      title: 'Agostino Campana & Co Sagl',
      description: 'La nostra azienda viene fondata da parte del sig. Agostino Campana nel 1958. Nella certezza di potervi offrire prodotti e manodopera di prima qualità, ad un prezzo di assoluta concorrenza, restiamo a vostra disposizione per offerte e consulenze tecniche. Visitate la nostra esposizione su appuntamento.',
      website: 'www.agostinocampana.ch',
      telephone: '091 941 76 81',
      price: 120,
      logo: '1.jpg',
      lat: '46.020569',
      lng: '8.970071',
      city: 'Lugano',
      email: "carlo@cracco.ch",
      user_id: 1,
      overall_rating: 1
    })

    yield Profile.create({
      id: 2,
      title: 'Garage C.L.A. SA',
      description: 'Garage C.L.A. di Vincenzo Calà Lesina riparazioni veicoli pesanti e veicoli in genere. Produzione di tubi oleodinamici.',
      website: 'www.agostinocampana.ch',
      telephone: '091 946 14 89',
      price: 87,
      logo: '2.jpg',
      lat: '46.091604',
      lng: '8.922933',
      city: 'Mezzovico-Vira',
      email: "carlo@cracco.ch",
      user_id: 2,
      overall_rating: 2
    })

    yield Profile.create({
      id: 3,
      title: 'Lochi Car SA',
      description: "Garage e carrozzeria con commercio di automobili nuove e usate. L'attività rappresenta la marca Hyundai.",
      website: 'www.lochicar.ch',
      telephone: '091 994 45 69',
      price: 20,
      logo: '3.jpg',
      lat: '45.967347',
      lng: '8.924697',
      city: 'Lugano',
      email: "lastra@gora.ch",
      user_id: 3,
      overall_rating: 4
    })

    yield Profile.create({
      id: 4,
      title: 'F. Duttweiler AG',
      description: 'Das heutige Familienunternehmen F. Duttweiler AG wurde 1932 egründet. Seit 2004 führt Gian- Andrea Duttweiler das Unternehmen. Zusammen mit unseren rund 45 Mitarbeitern sind wir in der Lage umfassende Dienstleistungen anzubieten.',
      website: 'www.duttweiler-ag.ch',
      telephone: '081 851 07 50',
      price: 10,
      logo: '4.jpg',
      lat: '46.537320',
      lng: '9.875321',
      city: 'Samaden',
      email: "url@em.ch",
      user_id: null,
      overall_rating: 2
    })

    yield Profile.create({
      id: 5,
      title: 'Tresoldi Lattonieri SA',
      description: "La Tresoldi lattonieri é un'azienda da anni conosciuta per i lavori eseguiti a regola d'arte.",
      website: '  www.tresoldisa.ch',
      telephone: '091 941 87 71',
      price: 157,
      logo: '5.jpg',
      lat: '46.031668',
      lng: '8.973651',
      city: 'Davesco-Soragno',
      email: "carlo@semper.ch",
      user_id: null,
      overall_rating: 4
    })

    yield Profile.create({
      id: 6,
      title: 'GB SCOSSA 2000 SAGL',
      description: "La progettazione e l'esecuzione di impianti sanitari, di riscaldamento, di ventilazione, di climatizzazione ,di isolazione e impermeabilizzazioni di ogni genere, di acquedotti, di bruciatori ad olio, di canne fumarie, di impianti ad energia alternativa, di irrigazione terreni, di aspirapolvere centralizzata, di piscine e opere da lattoniere ed edili.",
      website: 'www.agostinocampana.ch',
      telephone: '091 690 04 77',
      price: 34,
      logo: '6.jpg',
      lat: '45.837612',
      lng: '9.031572',
      city: 'Chiasso',
      email: "marzio@jes.ch",
      user_id: null,
      overall_rating: 1
    })

    yield Profile.create({
      id: 7,
      title: 'Aurelio Pagnamenta SA',
      description: '',
      website: '  www.pagnamenta.ch',
      telephone: '091 993 07 54',
      price: 82,
      logo: '7.png',
      lat: '45.966269',
      lng: '8.923949',
      city: 'Lugano',
      email: "carlo@cracco.ch",
      user_id: null,
      overall_rating: 5
    })

    yield Profile.create({
      id: 8,
      title: 'PuliEco Sagl',
      description: '',
      website: '',
      telephone: '',
      price: 74,
      logo: '8.png',
      lat: '46.157442',
      lng: '8.773200',
      city: 'Ascona',
      email: "marco@cracco.ch",
      user_id: null,
      overall_rating: 1
    })

    yield Profile.create({
      id: 9,
      title: 'PR Pulizia e Risanamenti SA',
      description: "La ditta PR Pulizia Risanamenti è stata fondata del 2001 ed è specializzata in diversi settori. La pulizia di canalizzazioni, l'ispezione anche con l'ausilio di rilievi televisivi ed il risanamento di canalizzazioni + sistema a spruzzo, lavori di epurazione di fosse biologiche e pozzetti raccoglitori.",
      website: 'www.pr-ricamarte.ch',
      telephone: '091 950 91 63',
      price: 78,
      logo: '9.jpg',
      lat: '46.014447',
      lng: '8.963594',
      city: 'Viganello',
      user_id: 2,
      email: "carlo@cracco.ch",
      overall_rating: 2
    })

    yield Profile.create({
      id: 10,
      title: 'El Mafrouhi Impresa di pulizia',
      description: "Lo scopo dell'azienda è quello di soddisfare appieno il cliente al fine di collaborare al meglio e con la massima serenità. I servizi sono molteplici: vanno dalla pulizia di banche, uffici, appartamenti, condomini",
      website: '',
      telephone: '',
      price: 99,
      logo: '10.jpg',
      lat: '47.376887',
      lng: '8.541694',
      city: 'Cremenaga',
      email: "carlo@cracco.ch",
      user_id: null,
      overall_rating: 3
    })

    yield Profile.create({
      id: 11,
      title: 'Gymtonic SA',
      description: "Palestra di alta qualità per migliorare il tuo fitness personale",
      website: 'gymtonic.ch',
      telephone: '091 924 96 66',
      price: 89,
      logo: '11.jpg',
      lat: '46.007315',
      lng: '8.949599',
      city: 'Lugano',
      email: "info@gymtonic.ch",
      user_id: null,
      overall_rating: 1
    })

    yield Profile.create({
      id: 12,
      title: '7th Street Sagl',
      description: "Impresa Sagl generale.",
      website: null,
      telephone: null,
      price: 89,
      logo: '12.jpeg',
      lat: '46.006653',
      lng: '8.957132',
      city: 'Lugano',
      email: null,
      user_id: null,
      overall_rating: 2
    })

    yield Profile.create({
      id: 13,
      title: 'Barchi Nicoli Trisconi e Associati SA',
      description: "Studio legale per risolvere i tuoi problemi con la legge.",
      website: 'bnta.ch',
      telephone: '091 912 20 00',
      price: 149,
      logo: '13.jpg',
      lat: '46.008363',
      lng: '8.956263',
      city: 'Lugano',
      email: null,
      user_id: null,
      overall_rating: 4
    })

    yield Profile.create({
      id: 14,
      title: 'SAM Società Atletica Massagno',
      description: "SAM Società Atletica Massagno: perché lo sport viene prima di tutto. Atleti professionisti e non.",
      website: 'sammassagno.ch',
      telephone: '091 968 15 72',
      price: 60,
      logo: '14.jpg',
      lat: '46.013310',
      lng: '8.944832',
      city: 'Massagno',
      email: 'info@sammassagno.ch',
      user_id: null,
      overall_rating: 3
    })

    yield Profile.create({
      id: 15,
      title: 'Club Move SA Palestra',
      description: "Palestra, personal trainer e allenatore personale per la tua salute fisica.",
      website: 'clubmove.ch',
      telephone: '091 924 01 07',
      price: 88,
      logo: '15.jpg',
      lat: '46.020796',
      lng: '8.957190',
      city: 'Trevano',
      email: null,
      user_id: null,
      overall_rating: 3
    })

    yield Profile.create({
      id: 16,
      title: 'Lido di Lugano',
      description: "Eventi, cene e luogo di svago presso il lido ufficiale di Lugano.",
      website: 'lugano.ch',
      telephone: '058 866 68 80',
      price: 40,
      logo: '16.jpg',
      lat: '46.005578',
      lng: '8.963550',
      city: 'Lugano',
      email: 'lido@lugano.ch',
      user_id: null,
      overall_rating: 5
    })

    yield Profile.create({
      id: 17,
      title: 'CineStar Arena Cinemas Ticino SA',
      description: "Sempre disponibili gli ultimi film premiato da oscar.",
      website: 'arena.ch',
      telephone: '0900 552 202',
      price: 12,
      logo: '17.jpg',
      lat: '46.025136',
      lng: '8.963385',
      city: 'Porza',
      email: 'info@arena.ch',
      user_id: null,
      overall_rating: 4
    })

    yield Profile.create({
      id: 18,
      title: 'TicinOnline SA',
      description: "Internet Marketing Service per i tuoi bisogni di azienda o di indipendente.",
      website: 'tio.ch',
      telephone: '091 985 90 10',
      price: 100,
      logo: '18.jpeg',
      lat: '46.012128',
      lng: '8.935234',
      city: 'Breganzona',
      email: 'info@tio.ch',
      user_id: null,
      overall_rating: 2
    })

    yield Profile.create({
      id: 19,
      title: 'Mattino della domenica',
      description: "Solo le migliori informazioni su votazioni in Ticino.",
      website: 'mattinonline.ch',
      telephone: '091 973 10 43',
      price: 150,
      logo: '19.jpeg',
      lat: '46.020237',
      lng: '8.959371',
      city: 'Lugano',
      email: null,
      user_id: null,
      overall_rating: 2
    })

    yield Profile.create({
      id: 20,
      title: 'Cattaneo & Postizzi Studio Legale SA',
      description: "Studio legale: da professionisti per professionisti.",
      website: 'cattaneopostizzi.ch',
      telephone: '091 912 20 70',
      price: 150,
      logo: '20.jpg',
      lat: '46.007361',
      lng: '8.953065',
      city: 'Lugano',
      email: null,
      user_id: null,
      overall_rating: 4
    })

    yield Profile.create({
      id: 21,
      title: 'Studio legale e notarile Verda',
      description: "Studio legale: da professionisti per professionisti.",
      website: 'verda-law.ch',
      telephone: '091 922 84 72',
      price: 120,
      logo: '21.jpg',
      lat: '46.007773',
      lng: '8.952235',
      city: 'Lugano',
      email: 'info@verda-law.ch',
      user_id: null,
      overall_rating: 3
    })

    yield Profile.create({
      id: 22,
      title: 'Mrs. Paola Bernasconi Avvocati',
      description: "Avvocati nel settore da 20 anni.",
      website: null,
      telephone: '091 922 04 61',
      price: 180,
      logo: '22.jpeg',
      lat: '46.008073',
      lng: '8.951952',
      city: 'Lugano',
      email: null,
      user_id: null,
      overall_rating: 1
    })

    yield Profile.create({
      id: 23,
      title: 'Avvocato Marcellini Luca',
      description: "Nessun meglio dell'avvocato Marcellini può fornirti assistenza legale.",
      website: 'legal-notary.ch',
      telephone: '091 910 05 50',
      price: 165,
      logo: '23.jpeg',
      lat: '46.006021',
      lng: '8.957509',
      city: 'Lugano',
      email: 'contatto@legal-notary.ch',
      user_id: null,
      overall_rating: 5
    })

    yield Review.create({ comment: 'Did a decent job', vote_price: 2, vote_quality: 2, vote_overall: 1, profile_id: 5, user_id: 1 })
    yield Review.create({ comment: 'Buon prezzo ma scarsa qualità', vote_price: 4, vote_quality: 2, vote_overall: 2, profile_id: 7, user_id: 2 })
    yield Review.create({ comment: 'Non lo consiglio', vote_price: 1, vote_quality: 1, vote_overall: 2, profile_id: 7, user_id: 2 })
    yield Review.create({ comment: 'Fatto bene ma costa troppo', vote_price: 1, vote_quality: 3, vote_overall: 2, profile_id: 9, user_id: 3 })
    yield Review.create({ comment: 'Ben fatto', vote_price: 4, vote_quality: 3, vote_overall: 1, profile_id: 9, user_id: 3 })
    yield Review.create({ comment: 'Ok', vote_price: 1, vote_quality: 2, vote_overall: 4, profile_id: 9, user_id: 2 })
    yield Review.create({ comment: '', vote_price: 1, vote_quality: 2, vote_overall: 1, profile_id: 6, user_id: 3 })
    yield Review.create({ comment: '', vote_price: 1, vote_quality: 1, vote_overall: 4, profile_id: 5, user_id: 1 })
    yield Review.create({ comment: '', vote_price: 1, vote_quality: 1, vote_overall: 2, profile_id: 1, user_id: 2 })
    yield Review.create({ comment: 'Lavoro perfetto ad un ottimo prezzo', vote_price: 5, vote_quality: 5, vote_overall: 5, profile_id: 8, user_id: 3})
    yield Review.create({ comment: '', vote_price: 2, vote_quality: 3, vote_overall: 1, profile_id: 2, user_id: 1 })
    yield Review.create({ comment: '', vote_price: 3, vote_quality: 4, vote_overall: 4, profile_id: 7, user_id: 2 })
    yield Review.create({ comment: '', vote_price: 4, vote_quality: 1, vote_overall: 1, profile_id: 3, user_id: 2 })
    yield Review.create({ comment: 'Not worth the money', vote_price: 1, vote_quality: 3, vote_overall: 2, profile_id: 1, user_id: 3 })
    yield Review.create({ comment: '', vote_price: 4, vote_quality: 1, vote_overall: 4, profile_id: 1, user_id: 2 })
    yield Review.create({ comment: '', vote_price: 3, vote_quality: 4, vote_overall: 3, profile_id: 4, user_id: 1 })
    yield Review.create({ comment: '', vote_price: 2, vote_quality: 2, vote_overall: 4, profile_id: 2, user_id: 3 })
    yield Review.create({ comment: '', vote_price: 2, vote_quality: 3, vote_overall: 3, profile_id: 4, user_id: 2 })
    yield Review.create({ comment: 'Lavoro decente', vote_price: 3, vote_quality: 4, vote_overall: 3, profile_id: 7, user_id: 3 })
    yield Review.create({ comment: '', vote_price: 2, vote_quality: 3, vote_overall: 3, profile_id: 5, user_id: 1 })
    yield Review.create({ comment: '', vote_price: 2, vote_quality: 4, vote_overall: 4, profile_id: 9, user_id: 1 })
    yield Review.create({ comment: '', vote_price: 2, vote_quality: 4, vote_overall: 2, profile_id: 5, user_id: 3 })
    yield Review.create({ comment: '', vote_price: 4, vote_quality: 4, vote_overall: 2, profile_id: 4, user_id: 2 })
    yield Review.create({ comment: '', vote_price: 3, vote_quality: 2, vote_overall: 3, profile_id: 7, user_id: 2 })
    yield Review.create({ comment: '', vote_price: 3, vote_quality: 2, vote_overall: 4, profile_id: 2, user_id: 1 })

    yield Answer.create({ comment: 'Grazie! Cerchiamo sempre di migliorare', review_id: 1 })
    yield Answer.create({ comment: 'Ci dispiace', review_id: 2 })
    yield Answer.create({ comment: 'Ci dispiace per la sua esperienza', review_id: 3 })
    yield Answer.create({ comment: 'Per garantire la qualità migliore i costi sono sempre alti', review_id: 4 })
    yield Answer.create({ comment: 'Ok', review_id: 5 })
    yield Answer.create({ comment: 'Grazie!', review_id: 10 })

    yield Category.create({ name: 'Idraulico'})
    yield Category.create({ name: 'Meccanico'})
    yield Category.create({ name: 'Lattoniere'})
    yield Category.create({ name: 'Dottore'})
    yield Category.create({ name: 'Dentista'})
    yield Category.create({ name: 'Informatico'})
    yield Category.create({ name: 'Giardiniere'})
    yield Category.create({ name: 'Giornale'})
    yield Category.create({ name: 'Eventi'})
    yield Category.create({ name: 'Fitness'})
    yield Category.create({ name: 'Legale'})

    yield ProfileCategory.create({ profile_id: 6, category_id: 2})
    yield ProfileCategory.create({ profile_id: 6, category_id: 4})
    yield ProfileCategory.create({ profile_id: 7, category_id: 2})
    yield ProfileCategory.create({ profile_id: 1, category_id: 2})
    yield ProfileCategory.create({ profile_id: 3, category_id: 3})
    yield ProfileCategory.create({ profile_id: 8, category_id: 3})
    yield ProfileCategory.create({ profile_id: 6, category_id: 1})
    yield ProfileCategory.create({ profile_id: 6, category_id: 5})
    yield ProfileCategory.create({ profile_id: 1, category_id: 5})
    yield ProfileCategory.create({ profile_id: 8, category_id: 4})
    yield ProfileCategory.create({ profile_id: 1, category_id: 3})
    yield ProfileCategory.create({ profile_id: 1, category_id: 6})
    yield ProfileCategory.create({ profile_id: 4, category_id: 6})
    yield ProfileCategory.create({ profile_id: 3, category_id: 1})
    yield ProfileCategory.create({ profile_id: 9, category_id: 6})
    yield ProfileCategory.create({ profile_id: 8, category_id: 5})
    yield ProfileCategory.create({ profile_id: 2, category_id: 1})
    yield ProfileCategory.create({ profile_id: 8, category_id: 1})
    yield ProfileCategory.create({ profile_id: 4, category_id: 1})
    yield ProfileCategory.create({ profile_id: 19, category_id: 8})
    yield ProfileCategory.create({ profile_id: 18, category_id: 8})
    yield ProfileCategory.create({ profile_id: 18, category_id: 6})
    yield ProfileCategory.create({ profile_id: 17, category_id: 9})
    yield ProfileCategory.create({ profile_id: 16, category_id: 9})
    yield ProfileCategory.create({ profile_id: 15, category_id: 10})
    yield ProfileCategory.create({ profile_id: 14, category_id: 10})
    yield ProfileCategory.create({ profile_id: 11, category_id: 10})
    yield ProfileCategory.create({ profile_id: 13, category_id: 11})
    yield ProfileCategory.create({ profile_id: 20, category_id: 11})
    yield ProfileCategory.create({ profile_id: 21, category_id: 11})
    yield ProfileCategory.create({ profile_id: 22, category_id: 11})
    yield ProfileCategory.create({ profile_id: 23, category_id: 11})
    yield ProfileCategory.create({ profile_id: 12, category_id: 6})
  }

}

module.exports = DatabaseSeeder
